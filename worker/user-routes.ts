import { Hono } from "hono";
import type { Env } from './core-utils';
import { TaskEntity, ScoreEntity, UserEntity } from "./entities";
import { ok, bad } from './core-utils';
import type { TYTTask, DenemeScore, UserStats, LoginRequest, SignupRequest, Recommendation, LeaderboardEntry, TYTSubject, User } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // AI RECOMMENDATIONS
  app.get('/api/ai-tasks/:userId', async (c) => {
    const userId = c.req.param('userId');
    const scoresRes = await ScoreEntity.list(c.env);
    const userScores = scoresRes.items.filter(s => s.userId === userId);
    if (userScores.length === 0) {
      return ok(c, [
        { subject: 'Matematik', topic: 'Temel Kavramlar', reason: 'TYT başlangıcı için en kritik konu!' },
        { subject: 'Türkçe', topic: 'Paragrafta Anlam', reason: 'Her gün en az 20 soru çözmelisin.' }
      ] as Recommendation[]);
    }
    const averages = {
      Matematik: userScores.reduce((acc, s) => acc + s.matematik, 0) / userScores.length,
      Türkçe: userScores.reduce((acc, s) => acc + s.turkce, 0) / userScores.length,
      Fen: userScores.reduce((acc, s) => acc + s.fen, 0) / userScores.length,
      Sosyal: userScores.reduce((acc, s) => acc + s.sosyal, 0) / userScores.length,
    };
    const weakest = Object.entries(averages).sort((a, b) => a[1] - b[1])[0][0] as TYTSubject;
    const library: Record<TYTSubject, string[]> = {
      Matematik: ['Üslü Sayılar', 'Mutlak Değer', 'Problemler', 'Fonksiyonlar'],
      Türkçe: ['Yazım Kuralları', 'Cümlenin Öğeleri', 'Sözcükte Yapı'],
      Fen: ['Optik', 'Kalıtım', 'Madde ve Özellikleri'],
      Sosyal: ['Osmanlı Kültür ve Medeniyet', 'İklim Bilgisi', 'Felsefenin Temel Konuları']
    };
    const recs: Recommendation[] = library[weakest].slice(0, 3).map(topic => ({
      subject: weakest,
      topic,
      reason: `${weakest} netlerin düşük seyrediyor, bu konuya odaklanmak fark yaratabilir!`
    }));
    return ok(c, recs);
  });
  // LEADERBOARD
  app.get('/api/leaderboard', async (c) => {
    const usersRes = await UserEntity.list(c.env);
    const scoresRes = await ScoreEntity.list(c.env);
    const students = usersRes.items.filter(u => u.role === 'öğrenci');
    const leaderboard: LeaderboardEntry[] = students.map(u => {
      const uScores = scoresRes.items.filter(s => s.userId === u.id);
      const avg = uScores.length > 0
        ? uScores.reduce((acc, s) => acc + s.totalNet, 0) / uScores.length
        : 0;
      return {
        displayName: u.email.split('@')[0].slice(0, 3) + '***',
        avgNet: Number(avg.toFixed(2)),
        level: Math.floor((u.pomodoroSessions || 0) / 5) + 1
      };
    }).sort((a, b) => b.avgNet - a.avgNet).slice(0, 100);
    return ok(c, leaderboard);
  });
  // POMODORO COMPLETION
  app.post('/api/pomodoro/complete', async (c) => {
    const { userId } = await c.req.json();
    if (!userId) return bad(c, 'userId required');
    const entity = new UserEntity(c.env, userId);
    const updated = await entity.mutate(s => ({ ...s, pomodoroSessions: (s.pomodoroSessions || 0) + 1 }));
    return ok(c, updated);
  });
  // AUTH API
  app.post('/api/auth/login', async (c) => {
    const { email } = await c.req.json() as LoginRequest;
    if (!email) return bad(c, 'Email is required');
    await UserEntity.ensureSeed(c.env);
    const users = await UserEntity.list(c.env);
    const user = users.items.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return bad(c, 'Kullanıcı bulunamadı');
    return ok(c, { user, token: 'mock-jwt-token-' + user.id });
  });
  app.post('/api/auth/signup', async (c) => {
    const { email, role } = await c.req.json() as SignupRequest;
    const newUser: User = { id: crypto.randomUUID(), email, role, coachAssignments: [], pomodoroSessions: 0 };
    return ok(c, { user: await UserEntity.create(c.env, newUser), token: 'mock-token' });
  });
  app.get('/api/admin/users', async (c) => ok(c, (await UserEntity.list(c.env)).items));
  app.get('/api/coach/students', async (c) => ok(c, (await UserEntity.list(c.env)).items.filter(u => u.role === 'öğrenci')));
  app.get('/api/tasks', async (c) => {
    const userId = c.req.query('userId');
    const page = await TaskEntity.list(c.env);
    return ok(c, page.items.filter(t => t.userId === userId).sort((a, b) => b.createdAt - a.createdAt));
  });
  app.post('/api/tasks', async (c) => {
    const body = await c.req.json();
    const task: TYTTask = { id: crypto.randomUUID(), userId: body.userId, subject: body.subject, topic: body.topic, done: false, createdAt: Date.now() };
    return ok(c, await TaskEntity.create(c.env, task));
  });
  app.put('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    return ok(c, await new TaskEntity(c.env, id).mutate(s => ({ ...s, ...body })));
  });
  app.delete('/api/tasks/:id', async (c) => ok(c, await TaskEntity.delete(c.env, c.req.param('id'))));
  app.get('/api/scores', async (c) => {
    const userId = c.req.query('userId');
    const page = await ScoreEntity.list(c.env);
    return ok(c, page.items.filter(s => s.userId === userId).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  });
  app.post('/api/scores', async (c) => {
    const body = await c.req.json();
    const score: DenemeScore = { ...body, id: crypto.randomUUID() };
    return ok(c, await ScoreEntity.create(c.env, score));
  });
  app.get('/api/stats', async (c) => {
    const userId = c.req.query('userId');
    if (!userId) return bad(c, 'userId required');
    const user = await new UserEntity(c.env, userId).getState();
    const tasksRes = await TaskEntity.list(c.env);
    const scoresRes = await ScoreEntity.list(c.env);
    const tasks = tasksRes.items.filter(t => t.userId === userId);
    const scores = scoresRes.items.filter(s => s.userId === userId);
    const completed = tasks.filter(t => t.done).length;
    const pomoCount = user.pomodoroSessions ?? 0;
    const currentPoints = (completed * 50) + (scores.length * 100) + (pomoCount * 100);
    const pointsPerLevel = 250;
    const level = Math.floor(currentPoints / pointsPerLevel) + 1;
    const stats: UserStats = {
      level,
      points: currentPoints,
      completedTasks: completed,
      totalTasks: tasks.length,
      nextLevelPoints: pointsPerLevel,
      progressToNextLevel: Math.floor(((currentPoints % pointsPerLevel) / pointsPerLevel) * 100),
      streakDays: 1,
      pomodoroSessions: pomoCount
    };
    return ok(c, stats);
  });
}