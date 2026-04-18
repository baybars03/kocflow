import { Hono } from "hono";
import type { Env } from './core-utils';
import { TaskEntity, ScoreEntity, UserEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { TYTTask, DenemeScore, UserStats, User, LoginRequest, SignupRequest } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // AUTH API
  app.post('/api/auth/login', async (c) => {
    const { email } = await c.req.json() as LoginRequest;
    if (!email) return bad(c, 'Email is required');
    await UserEntity.ensureSeed(c.env);
    const users = await UserEntity.list(c.env);
    const user = users.items.find(u => u.email === email);
    if (!user) return bad(c, 'Invalid credentials');
    return ok(c, { user, token: 'mock-jwt-token-' + user.id });
  });
  app.post('/api/auth/signup', async (c) => {
    const { email, role } = await c.req.json() as SignupRequest;
    if (!email || !role) return bad(c, 'Email and role are required');
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      role,
      coachAssignments: []
    };
    const created = await UserEntity.create(c.env, newUser);
    return ok(c, { user: created, token: 'mock-jwt-token-' + created.id });
  });
  // ADMIN API
  app.get('/api/admin/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const page = await UserEntity.list(c.env);
    return ok(c, page.items);
  });
  // COACH API
  app.get('/api/coach/students', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const page = await UserEntity.list(c.env);
    const students = page.items.filter(u => u.role === 'öğrenci');
    return ok(c, students);
  });
  // TASKS API
  app.get('/api/tasks', async (c) => {
    const userId = c.req.query('userId');
    if (!userId) return bad(c, 'userId required');
    await TaskEntity.ensureSeed(c.env);
    const page = await TaskEntity.list(c.env);
    const filtered = page.items.filter(t => t.userId === userId);
    return ok(c, filtered.sort((a, b) => b.createdAt - a.createdAt));
  });
  app.post('/api/tasks', async (c) => {
    const body = await c.req.json() as Partial<TYTTask>;
    if (!body.topic || !body.subject || !body.userId) return bad(c, 'Topic, subject, and userId required');
    const task: TYTTask = {
      id: crypto.randomUUID(),
      userId: body.userId,
      subject: body.subject as any,
      topic: body.topic,
      done: false,
      createdAt: Date.now()
    };
    return ok(c, await TaskEntity.create(c.env, task));
  });
  app.put('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json() as Partial<TYTTask>;
    const entity = new TaskEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Task not found');
    const updated = await entity.mutate(s => ({ ...s, ...body }));
    return ok(c, updated);
  });
  app.delete('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await TaskEntity.delete(c.env, id);
    return ok(c, { id, deleted });
  });
  // SCORES API
  app.get('/api/scores', async (c) => {
    const userId = c.req.query('userId');
    if (!userId) return bad(c, 'userId required');
    await ScoreEntity.ensureSeed(c.env);
    const page = await ScoreEntity.list(c.env);
    const filtered = page.items.filter(s => s.userId === userId);
    return ok(c, filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  });
  app.post('/api/scores', async (c) => {
    const body = await c.req.json() as Omit<DenemeScore, 'id'>;
    if (!body.userId) return bad(c, 'userId required');
    const score: DenemeScore = {
      ...body,
      id: crypto.randomUUID(),
    };
    return ok(c, await ScoreEntity.create(c.env, score));
  });
  // STATS API - Refined Logic
  app.get('/api/stats', async (c) => {
    const userId = c.req.query('userId');
    if (!userId) return bad(c, 'userId required');
    const tasksRes = await TaskEntity.list(c.env);
    const scoresRes = await ScoreEntity.list(c.env);
    const tasks = tasksRes.items.filter(t => t.userId === userId);
    const scores = scoresRes.items.filter(s => s.userId === userId);
    const completed = tasks.filter(t => t.done).length;
    const total = tasks.length;
    const pointsPerTask = 50;
    const pointsPerScore = 100;
    const currentPoints = (completed * pointsPerTask) + (scores.length * pointsPerScore);
    const pointsPerLevel = 250;
    const level = Math.floor(currentPoints / pointsPerLevel) + 1;
    const pointsInCurrentLevel = currentPoints % pointsPerLevel;
    const progress = Math.floor((pointsInCurrentLevel / pointsPerLevel) * 100);
    // Improved streak calculation
    let streak = 0;
    if (completed > 0 || scores.length > 0) {
      const taskTimes = tasks.map(t => t.createdAt);
      const scoreTimes = scores.map(s => new Date(s.date).getTime());
      const allTimes = [...taskTimes, ...scoreTimes];
      const lastActivityTs = allTimes.length > 0 ? Math.max(...allTimes) : 0;
      const daysSinceLastActivity = lastActivityTs > 0 
        ? Math.floor((Date.now() - lastActivityTs) / (1000 * 60 * 60 * 24))
        : 99;
      // If active in last 2 days, calculate a mock streak based on engagement
      if (daysSinceLastActivity < 2) {
        streak = Math.max(1, Math.min(Math.floor(completed / 2) + scores.length, 7));
      }
    }
    const stats: UserStats = {
      level,
      points: currentPoints,
      completedTasks: completed,
      totalTasks: total,
      nextLevelPoints: pointsPerLevel,
      progressToNextLevel: progress,
      streakDays: streak
    };
    return ok(c, stats);
  });
}