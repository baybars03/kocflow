import React, { useEffect, useState } from 'react';
import { Calendar, Star, Zap, ChevronRight, Loader2, Flame, TrendingUp, Info, X } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_QUOTE, SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Link, useNavigate } from 'react-router-dom';
import { useTasks, useStats, useScores } from '@/hooks/use-tyt-api';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { differenceInDays } from 'date-fns';
export function HomePage() {
  const navigate = useNavigate();
  const userId = useAuth((s) => s.user?.id);
  const userRole = useAuth((s) => s.user?.role);
  const [showGuide, setShowGuide] = useState(true);
  const targetDate = new Date('2025-06-14');
  const remainingDays = differenceInDays(targetDate, new Date());
  const { data: tasks, isLoading: tasksLoading } = useTasks(userId);
  const { data: stats } = useStats(userId);
  const { data: scores } = useScores(userId);
  useEffect(() => {
    if (userRole === 'koç') {
      navigate('/coach');
    } else if (userRole === 'admin') {
      navigate('/admin');
    }
  }, [userRole, navigate]);
  const dailyTasks = tasks?.slice(0, 3) || [];
  const avgNet = scores && scores.length > 0
    ? (scores.reduce((acc, s) => acc + s.totalNet, 0) / scores.length).toFixed(1)
    : '0';
  if (userRole !== 'öğrenci') {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
      </div>
    );
  }
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {showGuide && (
        <PlayfulCard className="bg-playful-dark text-white p-4 md:p-6 relative">
          <button 
            onClick={() => setShowGuide(false)}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-playful-yellow p-2 rounded-xl border-2 border-white rotate-6">
              <Info className="text-playful-dark w-6 h-6" strokeWidth={3} />
            </div>
            <h2 className="text-xl font-black">Kampüs Rehberi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <p className="font-black text-playful-teal mb-1 text-sm uppercase">Kampüs</p>
              <p className="text-sm font-medium opacity-80">Günün özeti, seviyen ve sınav geri sayımını takip et.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <p className="font-black text-playful-red mb-1 text-sm uppercase">Görevler</p>
              <p className="text-sm font-medium opacity-80">Çalışacağın konuları listele ve bitirdikçe puan topla.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <p className="font-black text-playful-yellow mb-1 text-sm uppercase">Netlerim</p>
              <p className="text-sm font-medium opacity-80">Deneme sonuçlarını gir ve gelişim grafiğini izle.</p>
            </div>
          </div>
        </PlayfulCard>
      )}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-playful-dark">
            Selam Şampiyon! 👋
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            TYT hazırlıkların harika gidiyor. Hadi bugünü fethedelim!
          </p>
        </div>
        <PlayfulCard className="bg-playful-red text-white flex flex-col items-center py-4 px-10 shrink-0 border-playful-dark shadow-playful">
          <span className="text-sm font-bold uppercase tracking-widest">TYT'ye Kalan</span>
          <span className="text-5xl font-black">{remainingDays > 0 ? remainingDays : 0}</span>
          <span className="text-sm font-bold uppercase tracking-widest">Gün</span>
        </PlayfulCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PlayfulCard className="bg-playful-yellow relative overflow-hidden flex flex-col justify-center min-h-[180px]">
            <Star className="absolute top-4 right-4 text-playful-dark w-12 h-12 opacity-20" strokeWidth={3} />
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 fill-current" /> Günün Motivasyonu
            </h3>
            <p className="text-xl font-bold italic leading-relaxed text-playful-dark">
              "{MOCK_QUOTE}"
            </p>
          </PlayfulCard>
          <PlayfulCard className="bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-playful-dark text-white rounded-xl">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Seviye Gelişimi</h3>
                  <p className="text-sm font-bold text-muted-foreground">Sıradaki seviyeye az kaldı!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-playful-dark">{stats?.level || 1}. Seviye</div>
                <div className="flex items-center justify-end gap-1 text-playful-red font-bold">
                  <Flame className="w-4 h-4 fill-current" /> {stats?.streakDays || 0} Günlük Seri
                </div>
              </div>
            </div>
            <LevelProgress
              value={stats?.progressToNextLevel || 0}
              label={`${stats?.points || 0} Toplam Puan`}
            />
          </PlayfulCard>
        </div>
        <div className="space-y-6">
          <PlayfulCard className="bg-playful-teal text-playful-dark flex flex-col items-center justify-center p-8">
            <TrendingUp className="w-12 h-12 mb-4" strokeWidth={3} />
            <span className="text-sm font-bold uppercase tracking-tighter">Genel Net Ortalaması</span>
            <span className="text-5xl font-black my-2">{avgNet}</span>
            <span className="text-xs font-bold opacity-70">Son {scores?.length || 0} deneme baz alındı</span>
          </PlayfulCard>
          <PlayfulCard className="bg-white border-dashed border-4 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 bg-playful-yellow border-2 border-playful-dark rounded-full mb-4 flex items-center justify-center font-black">
              ?
            </div>
            <p className="font-bold text-sm">Bir sonraki hedefin:</p>
            <p className="text-lg font-black text-playful-dark">100 Net Barajı!</p>
          </PlayfulCard>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black flex items-center gap-2">
            <Calendar className="w-6 h-6" strokeWidth={3} />
            Bugünkü Görevlerin
          </h2>
          <Link to="/tasks" className="text-playful-dark font-bold hover:underline flex items-center gap-1">
            Tümünü Gör <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {tasksLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-10 h-10 animate-spin text-playful-teal" />
          </div>
        ) : dailyTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyTasks.map((task) => (
              <PlayfulCard key={task.id} className="flex flex-col gap-2 p-4 md:p-6 group hover:border-playful-red">
                <span className={cn(
                  "w-fit px-3 py-1 rounded-full text-xs font-black uppercase border-2 border-playful-dark",
                  SUBJECT_COLORS[task.subject]
                )}>
                  {task.subject}
                </span>
                <h4 className="text-lg font-bold group-hover:underline">{task.topic}</h4>
                <div className="flex items-center gap-2 mt-auto">
                  <div className={cn(
                    "w-4 h-4 rounded border-2 border-playful-dark transition-colors",
                    task.done ? "bg-playful-teal" : "bg-white"
                  )} />
                  <span className="text-sm font-bold">{task.done ? 'Tamamlandı' : 'Bekliyor'}</span>
                </div>
              </PlayfulCard>
            ))}
          </div>
        ) : (
          <PlayfulCard className="bg-white text-center py-10 border-dashed border-4 border-slate-200 shadow-none hover:shadow-none">
            <p className="font-bold text-muted-foreground italic">Henüz bir görevin yok. Yeni bir tane eklemeye ne dersin? ✨</p>
          </PlayfulCard>
        )}
      </div>
    </div>
  );
}