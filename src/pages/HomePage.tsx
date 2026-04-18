import React, { useEffect, useState } from 'react';
import { Calendar, Star, Zap, ChevronRight, Loader2, Flame, TrendingUp, Info, X, Rocket } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_QUOTE, SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Link, useNavigate } from 'react-router-dom';
import { useTasks, useStats, useScores } from '@/hooks/use-tyt-api';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { differenceInDays, isAfter } from 'date-fns';
export function HomePage() {
  const navigate = useNavigate();
  const userId = useAuth((s) => s.user?.id);
  const userRole = useAuth((s) => s.user?.role);
  const [showGuide, setShowGuide] = useState(true);
  const targetDate = new Date('2025-06-14');
  const now = new Date();
  const examPassed = isAfter(now, targetDate);
  const remainingDays = differenceInDays(targetDate, now);
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
        <PlayfulCard className="bg-playful-dark text-white p-4 md:p-6 relative border-playful-dark shadow-playful">
          <button
            onClick={() => setShowGuide(false)}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-xl transition-all hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-playful-yellow p-3 rounded-2xl border-2 border-white rotate-6 shadow-sm">
              <Info className="text-playful-dark w-6 h-6" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-black">Kampüs Rehberi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Kampüs', color: 'text-playful-teal', desc: 'Günün özeti, seviyen ve sınav geri sayımını takip et.' },
              { label: 'Görevler', color: 'text-playful-red', desc: 'Çalışacağın konuları listele ve bitirdikçe puan topla.' },
              { label: 'Netlerim', color: 'text-playful-yellow', desc: 'Deneme sonuçlarını gir ve gelişim grafiğini izle.' }
            ].map((guide) => (
              <div key={guide.label} className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
                <p className={cn("font-black mb-2 text-sm uppercase tracking-widest transition-transform group-hover:scale-105 inline-block", guide.color)}>{guide.label}</p>
                <p className="text-sm font-medium opacity-80 leading-relaxed">{guide.desc}</p>
              </div>
            ))}
          </div>
        </PlayfulCard>
      )}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-playful-dark tracking-tight">
            Selam Şampiyon! 👋
          </h1>
          <p className="text-lg font-bold text-muted-foreground">
            TYT hazırlıkların harika gidiyor. Hadi bugünü fethedelim!
          </p>
        </div>
        <PlayfulCard className={cn(
          "flex flex-col items-center py-5 px-10 shrink-0 border-playful-dark shadow-playful transition-transform hover:-rotate-2",
          examPassed ? "bg-playful-teal text-white" : "bg-playful-red text-white"
        )}>
          {examPassed ? (
            <>
              <span className="text-sm font-bold uppercase tracking-widest">Sınav Günü</span>
              <span className="text-4xl font-black py-1">GELDİ! 🚀</span>
              <span className="text-sm font-bold uppercase tracking-widest">Başarılar</span>
            </>
          ) : (
            <>
              <span className="text-sm font-bold uppercase tracking-widest">TYT'ye Kalan</span>
              <span className="text-5xl font-black leading-none my-1">{remainingDays > 0 ? remainingDays : 0}</span>
              <span className="text-sm font-bold uppercase tracking-widest">Gün</span>
            </>
          )}
        </PlayfulCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PlayfulCard className="bg-playful-yellow relative overflow-hidden flex flex-col justify-center min-h-[180px] border-playful-dark shadow-playful">
            <Star className="absolute -top-4 -right-4 text-playful-dark w-24 h-24 opacity-10 rotate-12" strokeWidth={3} />
            <h3 className="text-xl font-black mb-3 flex items-center gap-2">
              <Star className="w-6 h-6 fill-current" /> Günün Motivasyonu
            </h3>
            <p className="text-2xl font-bold italic leading-snug text-playful-dark">
              "{MOCK_QUOTE}"
            </p>
          </PlayfulCard>
          <PlayfulCard className="bg-white border-playful-dark shadow-playful">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-playful-dark text-white rounded-2xl shadow-playful-active">
                  <Zap className="w-7 h-7 fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Seviye Gelişimi</h3>
                  <p className="text-sm font-bold text-muted-foreground">Sıradaki seviyeye az kaldı!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-playful-dark">{stats?.level || 1}. Seviye</div>
                <div className="flex items-center justify-end gap-1.5 text-playful-red font-black text-lg">
                  <Flame className="w-5 h-5 fill-current" /> {stats?.streakDays || 0} Günlük Seri
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
          <PlayfulCard className="bg-playful-teal text-playful-dark flex flex-col items-center justify-center p-8 border-playful-dark shadow-playful hover:scale-[1.02] transition-transform">
            <TrendingUp className="w-14 h-14 mb-4" strokeWidth={3} />
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Genel Net Ortalaması</span>
            <span className="text-6xl font-black my-2 tracking-tighter">{avgNet}</span>
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full border border-playful-dark/10">Son {scores?.length || 0} deneme baz alındı</span>
          </PlayfulCard>
          <PlayfulCard className="bg-white border-dashed border-4 border-slate-300 flex flex-col items-center justify-center p-8 text-center shadow-none hover:shadow-none hover:border-playful-yellow transition-colors">
            <div className="w-14 h-14 bg-playful-yellow border-2 border-playful-dark rounded-2xl mb-4 flex items-center justify-center font-black text-2xl shadow-playful-active rotate-3">
              ?
            </div>
            <p className="font-bold text-sm text-muted-foreground">Bir sonraki hedefin:</p>
            <p className="text-xl font-black text-playful-dark">100 Net Barajı!</p>
          </PlayfulCard>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-3xl font-black flex items-center gap-3 tracking-tight">
            <Calendar className="w-8 h-8 text-playful-red" strokeWidth={3} />
            Bugünkü Görevlerin
          </h2>
          <Link to="/tasks" className="playful-button py-2 px-4 bg-white text-sm hover:bg-playful-dark hover:text-white">
            Tümünü Gör <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {tasksLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
          </div>
        ) : dailyTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dailyTasks.map((task) => (
              <PlayfulCard key={task.id} className="flex flex-col gap-3 p-6 group hover:border-playful-red border-playful-dark shadow-playful">
                <span className={cn(
                  "w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark",
                  SUBJECT_COLORS[task.subject]
                )}>
                  {task.subject}
                </span>
                <h4 className="text-xl font-bold group-hover:underline line-clamp-2 leading-tight">{task.topic}</h4>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t-2 border-slate-50">
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 border-playful-dark transition-all",
                    task.done ? "bg-playful-teal shadow-none" : "bg-white shadow-playful-active"
                  )} />
                  <span className="text-sm font-black opacity-80">{task.done ? 'Tamamlandı' : 'Bekliyor'}</span>
                </div>
              </PlayfulCard>
            ))}
          </div>
        ) : (
          <PlayfulCard className="bg-white text-center py-16 border-dashed border-4 border-slate-200 shadow-none flex flex-col items-center gap-4">
            <div className="p-5 bg-slate-50 rounded-full border-2 border-dashed border-slate-200">
               <Rocket className="w-12 h-12 text-slate-300" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-400">Henüz bir görevin yok!</p>
              <p className="font-bold text-slate-300">Yeni bir hedef ekleyerek serüvene hemen başla.</p>
            </div>
            <Link to="/tasks" className="playful-button bg-playful-teal text-white mt-2">
              Görev Ekle
            </Link>
          </PlayfulCard>
        )}
      </div>
    </div>
  );
}