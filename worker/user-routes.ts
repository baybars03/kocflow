import { Hono } from "hono";
import type { Env } from './core-utils';
import { TaskEntity, ScoreEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { TYTTask, DenemeScore } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // TASKS API
  app.get('/api/tasks', async (c) => {
    await TaskEntity.ensureSeed(c.env);
    const page = await TaskEntity.list(c.env);
    return ok(c, page.items.sort((a, b) => b.createdAt - a.createdAt));
  });
  app.post('/api/tasks', async (c) => {
    const body = await c.req.json() as Partial<TYTTask>;
    if (!body.topic || !body.subject) return bad(c, 'Topic and subject required');
    const task: TYTTask = {
      id: crypto.randomUUID(),
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
    await ScoreEntity.ensureSeed(c.env);
    const page = await ScoreEntity.list(c.env);
    return ok(c, page.items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  });
  app.post('/api/scores', async (c) => {
    const body = await c.req.json() as Omit<DenemeScore, 'id'>;
    const score: DenemeScore = {
      ...body,
      id: crypto.randomUUID(),
    };
    return ok(c, await ScoreEntity.create(c.env, score));
  });
  // STATS API
  app.get('/api/stats', async (c) => {
    const tasks = await TaskEntity.list(c.env);
    const completed = tasks.items.filter(t => t.done).length;
    const total = tasks.items.length;
    const level = Math.floor(completed / 5) + 1;
    const points = (completed * 50) + (total * 10);
    return ok(c, { level, points, completedTasks: completed, totalTasks: total });
  });
}