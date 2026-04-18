import { Hono } from "hono";
import type { Env } from './core-utils';
import { TaskEntity, ScoreEntity, UserEntity, ChatMessageEntity, NotificationEntity, CoachProfileEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { TYTTask, DenemeScore, UserStats, LoginRequest, SignupRequest, Recommendation, LeaderboardEntry, TYTSubject, User, AdminAnalytics, BulkTaskRequest, CoachStudentStats, ChatMessage, Notification, CoachProfile } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // LANDING STATS
  app.get('/api/landing/stats', async (c) => {
    return ok(c, {
      activeStudents: 1240,
      totalTasksDone: 45200,
      avgNetIncrease: 18.5,
      successRate: 92
    });
  });
  // QUIZ ENDPOINTS
  app.post('/api/quizzes/complete', async (c) => {
    const { userId, xpEarned } = await c.req.json();
    if (!userId) return bad(c, 'userId required');
    const userEntity = new UserEntity(c.env, userId);
    await userEntity.mutate(s => ({
      ...s,
      pomodoroSessions: (s.pomodoroSessions || 0) + Math.floor(xpEarned / 100) // Dummy conversion
    }));
    await NotificationEntity.create(c.env, {
      id: crypto.randomUUID(), userId, title: "Deneme Bitirildi! 🏆", 
      message: `Harika bir deneme çıkardın. +${xpEarned} XP ve sürpriz bir rozet kazandın!`, 
      type: 'streak', read: false, createdAt: Date.now()
    });
    return ok(c, { xpEarned });
  });
  // COACH MARKETPLACE
  app.get('/api/coaches', async (c) => {
    await CoachProfileEntity.ensureSeed(c.env);
    const res = await CoachProfileEntity.list(c.env);
    return ok(c, res.items);
  });
  app.get('/api/coaches/:id', async (c) => {
    const id = c.req.param('id');
    const coach = await new CoachProfileEntity(c.env, id).getState();
    if (!coach.id) return notFound(c, 'Coach not found');
    return ok(c, coach);
  });
  app.post('/api/coaches/assign', async (c) => {
    const { userId, coachId } = await c.req.json();
    if (!userId || !coachId) return bad(c, 'Missing IDs');
    const userEntity = new UserEntity(c.env, userId);
    const updatedUser = await userEntity.mutate(s => ({ ...s, assignedCoachId: coachId }));
    const coach = await new CoachProfileEntity(c.env, coachId).getState();
    await NotificationEntity.create(c.env, {
      id: crypto.randomUUID(),
      userId,
      title: "Yeni Koçun Hazır! 🤝",
      message: `${coach.displayName} ile TYT maratonuna başladın. İlk mesajını atabilirsin!`,
      type: 'system',
      read: false,
      createdAt: Date.now()
    });
    return ok(c, updatedUser);
  });
  // LEADERBOARD
  app.get('/api/leaderboard', async (c) => {
    const usersRes = await UserEntity.list(c.env);
    const scoresRes = await ScoreEntity.list(c.env);
    const leaderboard: LeaderboardEntry[] = usersRes.items
      .filter(u => u.role === 'öğrenci')
      .map(u => {
        const uScores = scoresRes.items.filter(s => s.userId === u.id);
        const avgNet = uScores.length > 0 
          ? Number((uScores.reduce((acc, s) => acc + s.totalNet, 0) / uScores.length).toFixed(1))
          : 0;
        return {
          displayName: u.email.split('@')[0],
          avgNet,
          level: Math.floor((u.pomodoroSessions || 0) / 5) + 1,
        };
      })
      .sort((a, b) => b.avgNet - a.avgNet)
      .slice(0, 10);
    return ok(c, leaderboard);
  });
  // POMODORO
  app.post('/api/pomodoro/complete', async (c) => {
    const { userId } = await c.req.json();
    if (!userId) return bad(c, 'userId required');
    const userEntity = new UserEntity(c.env, userId);
    const updated = await userEntity.mutate(s => ({ 
      ...s, 
      pomodoroSessions: (s.pomodoroSessions || 0) + 1 
    }));
    await NotificationEntity.create(c.env, {
      id: crypto.randomUUID(),
      userId,
      title: "Pomodoro Tamamlandı! ⏱️",
      message: "Harika bir odaklanma seansı bitirdin. +100 Puan kazandın!",
      type: 'streak',
      read: false,
      createdAt: Date.now()
    });
    return ok(c, updated);
  });
  // COACH BULK ASSIGN
  app.post('/api/coach/assign-bulk', async (c) => {
    const { studentIds, subject, topic } = await c.req.json() as BulkTaskRequest;
    if (!studentIds || !studentIds.length) return bad(c, 'No students selected');
    const results = await Promise.all(studentIds.map(async (sid) => {
      const task: TYTTask = {
        id: crypto.randomUUID(),
        userId: sid,
        subject,
        topic,
        done: false,
        createdAt: Date.now()
      };
      return TaskEntity.create(c.env, task);
    }));
    return ok(c, { count: results.length });
  });
  // NOTIFICATIONS
  app.get('/api/notifications/:userId', async (c) => {
    const userId = c.req.param('userId');
    const res = await NotificationEntity.list(c.env);
    const userNotifs = res.items
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
    return ok(c, userNotifs);
  });
  app.patch('/api/notifications/:id/read', async (c) => {
    const id = c.req.param('id');
    const entity = new NotificationEntity(c.env, id);
    const updated = await entity.mutate(s => ({ ...s, read: true }));
    return ok(c, updated);
  });
  // CHAT
  app.get('/api/chat/:userId', async (c) => {
    const currentUserId = c.req.query('viewerId');
    const otherUserId = c.req.param('userId');
    const res = await ChatMessageEntity.list(c.env);
    const messages = res.items
      .filter(m =>
        (m.senderId === currentUserId && m.receiverId === otherUserId) ||
        (m.senderId === otherUserId && m.receiverId === currentUserId)
      )
      .sort((a, b) => a.timestamp - b.timestamp);
    return ok(c, messages);
  });
  app.post('/api/chat', async (c) => {
    const body = await c.req.json() as Omit<ChatMessage, 'id' | 'timestamp'>;
    const msg: ChatMessage = {
      ...body,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    return ok(c, await ChatMessageEntity.create(c.env, msg));
  });
  // AI TUTOR
  app.post('/api/ai/ask', async (c) => {
    const responses = [
      "Harika bir soru! TYT'de bu konu genellikle pratikle çözülür. 🚀",
      "Küçük adımlar büyük yollar açar şampiyon! Bugün 20 paragraf çözmeye ne dersin?",
      "Pes etmek yok! TYT bir maratondur, depar değil. Biraz dinlen ve devam et. ⚡",
      "Matematik aslında bir bulmaca gibidir. Temel kavramları oturttuğunda gerisi çorap söküğü gibi gelecek!",
      "Odaklanma sorunu yaşıyorsan Pomodoro tekniğini denemelisin. Ben yanındayım!"
    ];
    const randomRes = responses[Math.floor(Math.random() * responses.length)];
    return ok(c, { content: randomRes, timestamp: Date.now() });
  });
  // ADMIN ENDPOINTS
  app.get('/api/admin/analytics', async (c) => {
    const users = await UserEntity.list(c.env);
    const tasks = await TaskEntity.list(c.env);
    const growth = [
      { date: 'Pzt', count: Math.max(0, users.items.length - 10) },
      { date: 'Sal', count: Math.max(0, users.items.length - 5) },
      { date: 'Çar', count: Math.max(0, users.items.length - 2) },
      { date: 'Per', count: users.items.length }
    ];
    const subCount: Record<string, number> = {};
    tasks.items.forEach(t => { subCount[t.subject] = (subCount[t.subject] || 0) + 1; });
    const popularTasks = Object.entries(subCount).map(([subject, count]) => ({ subject, count }));
    const analytics: AdminAnalytics = {
      totalGrowth: growth,
      retentionRate: 85,
      popularTasks: popularTasks.length ? popularTasks : [{ subject: 'Matematik', count: 10 }],
      activeSessions: Math.floor(Math.random() * 50) + 10
    };
    return ok(c, analytics);
  });
  app.get('/api/admin/users', async (c) => ok(c, (await UserEntity.list(c.env)).items));
  app.put('/api/admin/users/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const entity = new UserEntity(c.env, id);
    const updated = await entity.mutate(s => ({ ...s, ...body }));
    return ok(c, updated);
  });
  app.delete('/api/admin/users/:id', async (c) => {
    const id = c.req.param('id');
    await UserEntity.delete(c.env, id);
    return ok(c, { id });
  });
  app.get('/api/coach/students/:coachId', async (c) => {
    const coachId = c.req.param('coachId');
    const usersRes = await UserEntity.list(c.env);
    const scoresRes = await ScoreEntity.list(c.env);
    const assigned = usersRes.items.filter(u => u.assignedCoachId === coachId || (u.role === 'öğrenci' && coachId === 'demo-koc'));
    const stats: CoachStudentStats[] = assigned.map(u => {
      const uScores = scoresRes.items.filter(s => s.userId === u.id);
      const latest = uScores.length > 0 ? uScores[uScores.length - 1].totalNet : 0;
      return {
        studentId: u.id,
        email: u.email,
        level: Math.floor((u.pomodoroSessions || 0) / 5) + 1,
        streak: 1,
        latestNet: latest,
        lowProgressAlert: latest < 50 && uScores.length > 0
      };
    });
    return ok(c, stats);
  });
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
  app.post('/api/auth/login', async (c) => {
    const { email } = await c.req.json() as LoginRequest;
    if (!email) return bad(c, 'Email is required');
    await UserEntity.ensureSeed(c.env);
    await NotificationEntity.ensureSeed(c.env);
    const users = await UserEntity.list(c.env);
    const user = users.items.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return bad(c, 'Kullanıcı bulunamadı');
    return ok(c, { user, token: 'mock-jwt-token-' + user.id });
  });
  app.post('/api/auth/signup', async (c) => {
    const { email, role } = await c.req.json() as SignupRequest;
    const newUser: User = { id: crypto.randomUUID(), email, role, coachAssignments: [], pomodoroSessions: 0, createdAt: Date.now() };
    return ok(c, { user: await UserEntity.create(c.env, newUser), token: 'mock-token' });
  });
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
    const currentPoints = (completed * 50) + (scores.length * 100) + ((user.pomodoroSessions || 0) * 100);
    const stats: UserStats = {
      level: Math.floor(currentPoints / 250) + 1,
      points: currentPoints,
      completedTasks: completed,
      totalTasks: tasks.length,
      nextLevelPoints: 250,
      progressToNextLevel: Math.floor(((currentPoints % 250) / 250) * 100),
      streakDays: 1,
      pomodoroSessions: user.pomodoroSessions ?? 0
    };
    return ok(c, stats);
  });
}