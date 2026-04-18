import { IndexedEntity } from "./core-utils";
import type { TYTTask, DenemeScore } from "@shared/types";
import { MOCK_TYT_TASKS, MOCK_DENEME_SCORES } from "@shared/mock-tyt-data";
export class TaskEntity extends IndexedEntity<TYTTask> {
  static readonly entityName = "tyt_task";
  static readonly indexName = "tyt_tasks";
  static readonly initialState: TYTTask = { 
    id: "", 
    subject: "Matematik", 
    topic: "", 
    done: false, 
    createdAt: 0 
  };
  static seedData = MOCK_TYT_TASKS.map(t => ({ ...t, createdAt: Date.now() }));
}
export class ScoreEntity extends IndexedEntity<DenemeScore> {
  static readonly entityName = "deneme_score";
  static readonly indexName = "deneme_scores";
  static readonly initialState: DenemeScore = { 
    id: "", 
    date: new Date().toISOString(), 
    turkce: 0, 
    matematik: 0, 
    sosyal: 0, 
    fen: 0, 
    totalNet: 0 
  };
  static seedData = MOCK_DENEME_SCORES.map(s => ({ ...s, id: crypto.randomUUID() }));
}