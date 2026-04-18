import { IndexedEntity } from "./core-utils";
import type { TYTTask, DenemeScore, User, ChatMessage, Notification } from "@shared/types";
import { MOCK_TYT_TASKS, MOCK_DENEME_SCORES } from "@shared/mock-tyt-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = {
    id: "",
    email: "",
    role: "öğrenci",
    coachAssignments: [],
    pomodoroSessions: 0
  };
  static seedData: User[] = [
    { id: "demo-admin", email: "admin@kampus.com", role: "admin", coachAssignments: [], pomodoroSessions: 5 },
    { id: "demo-koc", email: "koc@kampus.com", role: "koç", coachAssignments: ["demo-ogrenci-1"], pomodoroSessions: 12 },
    { id: "demo-ogrenci-1", email: "ogrenci1@kampus.com", role: "öğrenci", pomodoroSessions: 24 },
    { id: "demo-ogrenci-2", email: "ogrenci2@kampus.com", role: "öğrenci", pomodoroSessions: 8 },
    { id: "demo-ogrenci-3", email: "ogrenci3@kampus.com", role: "öğrenci", pomodoroSessions: 0 },
  ];
}
export class TaskEntity extends IndexedEntity<TYTTask> {
  static readonly entityName = "tyt_task";
  static readonly indexName = "tyt_tasks";
  static readonly initialState: TYTTask = {
    id: "",
    userId: "",
    subject: "Matematik",
    topic: "",
    done: false,
    createdAt: 0
  };
  static seedData = MOCK_TYT_TASKS.map(t => ({
    ...t,
    userId: "demo-ogrenci-1",
    createdAt: Date.now()
  }));
}
export class ScoreEntity extends IndexedEntity<DenemeScore> {
  static readonly entityName = "deneme_score";
  static readonly indexName = "deneme_scores";
  static readonly initialState: DenemeScore = {
    id: "",
    userId: "",
    date: new Date().toISOString(),
    turkce: 0,
    matematik: 0,
    sosyal: 0,
    fen: 0,
    totalNet: 0
  };
  static seedData = MOCK_DENEME_SCORES.map(s => ({
    ...s,
    id: crypto.randomUUID(),
    userId: "demo-ogrenci-1"
  }));
}
export class ChatMessageEntity extends IndexedEntity<ChatMessage> {
  static readonly entityName = "chat_message";
  static readonly indexName = "chat_messages";
  static readonly initialState: ChatMessage = {
    id: "",
    senderId: "",
    receiverId: "",
    text: "",
    timestamp: 0
  };
}
export class NotificationEntity extends IndexedEntity<Notification> {
  static readonly entityName = "notification";
  static readonly indexName = "notifications";
  static readonly initialState: Notification = {
    id: "",
    userId: "",
    title: "",
    message: "",
    type: "system",
    read: false,
    createdAt: 0
  };
  static seedData: Notification[] = [
    { 
      id: "seed-notif-1", 
      userId: "demo-ogrenci-1", 
      title: "Hoş Geldin! ✨", 
      message: "Kampüs yolculuğun başlıyor, başarılar şampiyon!", 
      type: "system", 
      read: false, 
      createdAt: Date.now() 
    }
  ];
}