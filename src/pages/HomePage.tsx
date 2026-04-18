import React from 'react';
import { Calendar, Star, Zap, ChevronRight, Loader2 } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_QUOTE, SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Link } from 'react-router-dom';
import { useTasks, useStats } from '@/hooks/use-tyt-api';
import { cn } from '@/lib/utils';
import { differenceInDays, startOfTomorrow } from 'date-fns';
export function HomePage() {
  // Static TYT Target (adjust year as needed)
  const targetDate = new Date('2025-06-14'); 
  const remainingDays = differenceInDays(targetDate, new Date());
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: stats, isLoading: statsLoading } = useStats();
  const dailyTasks = tasks?.slice(0, 3) || [];
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-playful-dark">
            Selam Şampiyon! 👋
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            TYT hazırlıkların harika gidiyor. Hadi bugünü fethedelim!
          </p>
        </div>
        <PlayfulCard className="bg-playful-red text-white flex flex-col items-center py-4 px-10">
          <span className="text-sm font-bold uppercase tracking-widest">TYT'ye Kalan</span>
          <span className="text-5xl font-black">{remainingDays > 0 ? remainingDays : 0}</span>
          <span className="text-sm font-bold uppercase tracking-widest">Gün</span>
        </PlayfulCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PlayfulCard className="bg-playful-yellow lg:col-span-2 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
          <Star className="absolute top-4 right-4 text-playful-dark w-12 h-12 opacity-20" strokeWidth={3} />
          <h3 className="text-2xl font-black mb-4">Günün Motivasyonu</h3>
          <p className="text-2xl font-bold italic leading-relaxed text-playful-dark">
            "{MOCK_QUOTE}"
          </p>
        </PlayfulCard>
        <PlayfulCard className="bg-playful-teal text-playful-dark flex flex-col items-center justify-center space-y-2">
          <div className="w-16 h-16 bg-white border-4 border-playful-dark rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-playful-yellow" fill="currentColor" strokeWidth={3} />
          </div>
          {statsLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <span className="text-3xl font-black">{stats?.level || 1}. Lv</span>
              <span className="font-bold">Çalışma Puanı: {stats?.points || 0}</span>
            </>
          )}
        </PlayfulCard>
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
              <PlayfulCard key={task.id} className="flex flex-col gap-2 p-4 md:p-6 group">
                <span className={cn(
                  "w-fit px-3 py-1 rounded-full text-xs font-black uppercase border-2 border-playful-dark",
                  SUBJECT_COLORS[task.subject]
                )}>
                  {task.subject}
                </span>
                <h4 className="text-lg font-bold group-hover:underline">{task.topic}</h4>
                <div className="flex items-center gap-2 mt-auto">
                  <div className={cn(
                    "w-4 h-4 rounded border-2 border-playful-dark",
                    task.done ? "bg-playful-teal" : "bg-white"
                  )} />
                  <span className="text-sm font-bold">{task.done ? 'Tamamlandı' : 'Bekliyor'}</span>
                </div>
              </PlayfulCard>
            ))}
          </div>
        ) : (
          <PlayfulCard className="bg-white text-center py-10">
            <p className="font-bold text-muted-foreground italic">Henüz bir görevin yok. Yeni bir tane eklemeye ne dersin? ✨</p>
          </PlayfulCard>
        )}
      </div>
    </div>
  );
}