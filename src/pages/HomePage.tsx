import React, { useEffect, useState } from 'react';
import { Calendar, Star, Zap, ChevronRight, Loader2, Flame, TrendingUp, Info, X, Rocket, Sparkles, Plus } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_QUOTE, SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Link, useNavigate } from 'react-router-dom';
import { useTasks, useStats, useScores, useRecommendations } from '@/hooks/use-tyt-api';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { differenceInDays, isAfter } from 'date-fns';
import { toast } from 'sonner';
export function HomePage() {
  const navigate = useNavigate();
  const userId = useAuth((s) => s.user?.id);
  const userRole = useAuth((s) => s.user?.role);
  const [showGuide, setShowGuide] = useState(true);
  const targetDate = new Date('2025-06-14');
  const now = new Date();
  const examPassed = isAfter(now, targetDate);
  const remainingDays = differenceInDays(targetDate, now);
  const { data: tasks, isLoading: tasksLoading, createTask } = useTasks(userId);
  const { data: stats } = useStats(userId);
  const { data: scores } = useScores(userId);
  const { data: recommendations, isLoading: recsLoading } = useRecommendations(userId);
  useEffect(() => {
    if (userRole === 'koç') navigate('/coach');
    else if (userRole === 'admin') navigate('/admin');
  }, [userRole, navigate]);
  const dailyTasks = tasks?.slice(0, 3) || [];
  const avgNet = scores && scores.length > 0
    ? (scores.reduce((acc, s) => acc + s.totalNet, 0) / scores.length).toFixed(1)
    : '0';
  const handleAddRec = (subject: any, topic: string) => {
    if (!userId) return;
    createTask.mutate({ userId, subject, topic, done: false }, {
      onSuccess: () => toast.success(`${topic} görevin eklendi! ✨`)
    });
  };
  if (userRole !== 'öğrenci') return <div className="flex items-center justify-center p-20"><Loader2 className="w-12 h-12 animate-spin text-playful-teal" /></div>;
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-playful-dark tracking-tight">Selam Şampiyon! 👋</h1>
          <p className="text-lg font-bold text-muted-foreground">Bugün harika bir gün olacak.</p>
        </div>
        <PlayfulCard className={cn("flex flex-col items-center py-5 px-10 border-playful-dark shadow-playful", examPassed ? "bg-playful-teal text-white" : "bg-playful-red text-white")}>
          <span className="text-sm font-bold uppercase tracking-widest">TYT'ye Kalan</span>
          <span className="text-5xl font-black leading-none my-1">{remainingDays > 0 ? remainingDays : 0}</span>
          <span className="text-sm font-bold uppercase tracking-widest">Gün</span>
        </PlayfulCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
             <h2 className="text-2xl font-black flex items-center gap-2 px-2">
               <Sparkles className="w-6 h-6 text-playful-yellow fill-current" /> Sana Özel Öneriler
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {recsLoading ? <div className="col-span-2 flex justify-center py-10"><Loader2 className="animate-spin text-playful-teal" /></div> :
                recommendations?.map((rec, i) => (
                  <PlayfulCard key={i} className="bg-white border-4 border-playful-dark border-b-8 relative group overflow-hidden">
                    <div className={cn("absolute top-0 right-0 w-16 h-16 opacity-5 rotate-12 transition-transform group-hover:scale-125", SUBJECT_COLORS[rec.subject])} />
                    <span className={cn("text-[10px] font-black uppercase px-2 py-0.5 rounded border-2 border-playful-dark", SUBJECT_COLORS[rec.subject])}>{rec.subject}</span>
                    <h3 className="text-xl font-black my-2">{rec.topic}</h3>
                    <p className="text-xs font-bold text-muted-foreground mb-4 leading-tight">{rec.reason}</p>
                    <button 
                      onClick={() => handleAddRec(rec.subject, rec.topic)}
                      className="w-full flex items-center justify-center gap-2 bg-playful-teal text-white font-black py-2 rounded-xl border-2 border-playful-dark shadow-playful-active hover:translate-y-[-2px] transition-all"
                    >
                      <Plus className="w-4 h-4" /> Hedefe Ekle
                    </button>
                  </PlayfulCard>
                ))
               }
             </div>
          </div>
          <PlayfulCard className="bg-white border-playful-dark shadow-playful">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-playful-dark text-white rounded-2xl">
                  <Zap className="w-7 h-7 fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Seviye Gelişimi</h3>
                  <p className="text-sm font-bold text-muted-foreground">{stats?.pomodoroSessions || 0} Odaklanma Seansı</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-playful-dark">{stats?.level || 1}. Seviye</div>
                <div className="flex items-center justify-end gap-1.5 text-playful-red font-black text-lg">
                  <Flame className="w-5 h-5 fill-current" /> {stats?.streakDays || 0} Günlük Seri
                </div>
              </div>
            </div>
            <LevelProgress value={stats?.progressToNextLevel || 0} label={`${stats?.points || 0} Toplam Puan`} />
          </PlayfulCard>
        </div>
        <div className="space-y-6">
          <PlayfulCard className="bg-playful-yellow text-playful-dark flex flex-col items-center justify-center p-8 border-playful-dark shadow-playful">
            <TrendingUp className="w-14 h-14 mb-4" strokeWidth={3} />
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Genel Net Ortalaması</span>
            <span className="text-6xl font-black my-2 tracking-tighter">{avgNet}</span>
          </PlayfulCard>
          <PlayfulCard className="bg-playful-teal text-white border-playful-dark shadow-playful flex flex-col items-center justify-center p-6 text-center">
             <Star className="w-10 h-10 mb-3 fill-white" />
             <p className="font-black">Günün Sözü</p>
             <p className="italic font-bold">"{MOCK_QUOTE}"</p>
          </PlayfulCard>
        </div>
      </div>
    </div>
  );
}