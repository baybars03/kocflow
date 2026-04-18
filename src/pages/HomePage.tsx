import React, { useEffect } from 'react';
import { Loader2, Flame, TrendingUp, Sparkles, Plus, Star, Zap, FileDown } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_QUOTE, SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { useNavigate } from 'react-router-dom';
import { useTasks, useStats, useScores, useRecommendations } from '@/hooks/use-tyt-api';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { differenceInDays, isAfter } from 'date-fns';
import { toast } from 'sonner';
import { useSwipeable } from 'react-swipeable';
import { AITutor } from '@/components/ai/AITutor';
import type { TYTSubject } from '@shared/types';
const TARGET_DATE = new Date('2025-06-14');
export function HomePage() {
  const navigate = useNavigate();
  const userId = useAuth((s) => s.user?.id);
  const userRole = useAuth((s) => s.user?.role);
  const userEmail = useAuth((s) => s.user?.email);
  const now = new Date();
  const examPassed = isAfter(now, TARGET_DATE);
  const rawDays = differenceInDays(TARGET_DATE, now);
  const remainingDays = Math.max(0, rawDays);
  const { data: tasks, createTask } = useTasks(userId);
  const { data: stats } = useStats(userId);
  const { data: scores } = useScores(userId);
  const { data: recommendations, isLoading: recsLoading } = useRecommendations(userId);
  useEffect(() => {
    if (userRole === 'koç') navigate('/coach');
    else if (userRole === 'admin') navigate('/admin');
  }, [userRole, navigate]);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => userRole === 'öğrenci' && navigate('/tasks'),
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  const avgNet = scores && scores.length > 0
    ? (scores.reduce((acc, s) => acc + (s.totalNet || 0), 0) / scores.length).toFixed(1)
    : '0';
  const handleAddRec = (subject: TYTSubject, topic: string) => {
    if (!userId) return;
    createTask.mutate({ userId, subject, topic, done: false }, {
      onSuccess: () => toast.success(`${topic} akışına eklendi! ✨`)
    });
  };
  const getGreeting = () => {
    if (userRole === 'admin') return 'KocFlow Admin 🛠️';
    if (userRole === 'koç') return `Hoş Geldin Koç, ${userEmail?.split('@')[0]}!`;
    return 'Selam Şampiyon! 👋';
  };
  if (!userRole || (userRole !== 'öğrenci' && (userRole === 'koç' || userRole === 'admin'))) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4 font-sans">
        <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
        <p className="font-black text-xl">KocFlow akışı yükleniyor...</p>
      </div>
    );
  }
  return (
    <div {...swipeHandlers} className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-12 font-sans">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between no-print">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-playful-dark tracking-tighter uppercase">
            {getGreeting()}
          </h1>
          <p className="text-lg md:text-xl font-bold text-muted-foreground italic">
            KocFlow ile bugün sınırlarını zorlamaya hazır mısın?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.print()} className="p-4 border-4 border-playful-dark rounded-xl bg-white shadow-playful hover:-translate-y-1 active:translate-y-0 active:shadow-playful-active transition-all">
            <FileDown className="w-6 h-6" />
          </button>
          <PlayfulCard className={cn(
            "flex flex-col items-center py-4 px-8 border-playful-dark shadow-playful min-w-[140px]",
            examPassed ? "bg-playful-teal text-white" : "bg-playful-red text-white"
          )}>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Başarı Maratonu</span>
            <span className="text-4xl lg:text-5xl font-black leading-none my-1">{remainingDays}</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">GÜN KALDI</span>
          </PlayfulCard>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4 no-print">
             <h2 className="text-2xl font-black flex items-center gap-2 px-2 uppercase">
               <Sparkles className="w-6 h-6 text-playful-yellow fill-current" /> AI Akış Önerileri
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {recsLoading ? (
                 <div className="col-span-full flex justify-center py-12"><Loader2 className="animate-spin text-playful-teal w-8 h-8" /></div>
               ) : recommendations?.length ? (
                 recommendations.slice(0, 4).map((rec, i) => (
                    <PlayfulCard key={i} className="bg-white border-4 border-playful-dark group overflow-hidden flex flex-col justify-between">
                      <div>
                        <span className={cn(
                          "text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 border-playful-dark",
                          SUBJECT_COLORS[rec.subject as keyof typeof SUBJECT_COLORS] || "bg-slate-200"
                        )}>
                          {rec.subject}
                        </span>
                        <h3 className="text-xl font-black my-2 group-hover:text-playful-red transition-colors">{rec.topic}</h3>
                        <p className="text-xs font-bold text-muted-foreground mb-4 leading-tight">{rec.reason}</p>
                      </div>
                      <button
                        onClick={() => handleAddRec(rec.subject, rec.topic)}
                        className="w-full flex items-center justify-center gap-2 bg-playful-teal text-white font-black py-2.5 rounded-xl border-2 border-playful-dark shadow-playful-active hover:translate-y-[-2px] active:translate-y-0 active:shadow-none transition-all"
                      >
                        <Plus className="w-4 h-4" strokeWidth={4} /> Akışa Ekle
                      </button>
                    </PlayfulCard>
                  ))
               ) : (
                 <div className="col-span-full p-8 border-4 border-dashed border-slate-200 rounded-3xl text-center font-bold text-slate-400">
                   Akış önerileri hazırlanıyor... Deneme netlerini girerek AI Mentörünü eğit!
                 </div>
               )}
             </div>
          </div>
          <PlayfulCard className="bg-white border-playful-dark shadow-playful print-section">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-playful-dark text-white rounded-2xl shadow-playful-active">
                  <Zap className="w-7 h-7 fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight leading-none mb-1 uppercase">Akış Gelişimi</h3>
                  <p className="text-sm font-bold text-muted-foreground">{stats?.pomodoroSessions || 0} Odaklanma Seansı</p>
                </div>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <div className="text-3xl font-black text-playful-dark">{stats?.level || 1}. Seviye</div>
                <div className="flex items-center sm:justify-end gap-1.5 text-playful-red font-black text-lg">
                  <Flame className="w-5 h-5 fill-current" /> {stats?.streakDays || 0} GÜN STREAK
                </div>
              </div>
            </div>
            <LevelProgress
              value={stats?.progressToNextLevel || 0}
              label={`${stats?.points || 0} TOPLAM PUAN`}
            />
          </PlayfulCard>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <PlayfulCard className="bg-playful-yellow text-playful-dark flex flex-col items-center justify-center py-10 md:py-14 border-playful-dark shadow-playful print-section">
            <TrendingUp className="w-14 h-14 mb-4" strokeWidth={3} />
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Genel Net Ortalaması</span>
            <span className="text-6xl font-black my-2 tracking-tighter">{avgNet}</span>
            <div className="text-[10px] font-black uppercase px-3 py-1 bg-white/30 border border-playful-dark/10 rounded-full">
              {scores?.length || 0} Deneme Analiz Edildi
            </div>
          </PlayfulCard>
          <PlayfulCard className="bg-white border-playful-dark shadow-playful p-6 no-print">
             <div className="flex items-center gap-3 mb-3">
               <Star className="w-6 h-6 text-playful-red fill-current" />
               <p className="font-black text-sm uppercase tracking-widest">KocFlow Motivasyonu</p>
             </div>
             <p className="font-bold text-lg leading-relaxed italic">"{MOCK_QUOTE}"</p>
          </PlayfulCard>
        </div>
      </div>
      <div className="no-print">
        <AITutor />
      </div>
    </div>
  );
}