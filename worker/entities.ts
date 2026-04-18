import { IndexedEntity } from "./core-utils";
import type { TYTTask, DenemeScore, User, ChatMessage, Notification, CoachProfile } from "@shared/types";
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
export class CoachProfileEntity extends IndexedEntity<CoachProfile> {
  static readonly entityName = "coach_profile";
  static readonly indexName = "coach_profiles";
  static readonly initialState: CoachProfile = {
    id: "",
    displayName: "",
    bio: "",
    avatarUrl: "",
    rating: 0,
    reviewCount: 0,
    studentCount: 0,
    price: 0,
    successRate: 0,
    specialties: [],
    isVerified: false
  };
  static seedData: CoachProfile[] = [
    {
      id: "demo-koc",
      displayName: "Ahmet Hoca",
      bio: "Matematik Olimpiyatları derecesi olan, 10 yıllık TYT/AYT tecrübesine sahip profesyonel koç.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 124,
      studentCount: 45,
      price: 450,
      successRate: 94,
      specialties: ["Matematik", "Geometri", "Sayısal Planlama"],
      isVerified: true
    },
    {
      id: "coach-2",
      displayName: "Zeynep Danışman",
      bio: "Boğaziçi mezunu, özellikle derece isteyen öğrenciler için özel çalışma programları hazırlayan rehber.",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 89,
      studentCount: 32,
      price: 600,
      successRate: 91,
      specialties: ["Türkçe", "Edebiyat", "Motivasyon"],
      isVerified: true
    },
    {
      id: "coach-3",
      displayName: "Caner Fen",
      bio: "Fen Bilimleri alanında netlerini artırmak isteyenler için nokta atışı taktikler ve konu anlatımları.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 62,
      studentCount: 20,
      price: 350,
      successRate: 88,
      specialties: ["Fizik", "Kimya", "Biyoloji"],
      isVerified: false
    }
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