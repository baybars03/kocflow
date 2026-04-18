import React from 'react';
import { Calendar, Star, Zap, ChevronRight } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_QUOTE, MOCK_TYT_TASKS, SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Link } from 'react-router-dom';
export function HomePage() {
  const remainingDays = 94; // Example hardcoded value
  const dailyTasks = MOCK_TYT_TASKS.slice(0, 3);
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
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
          <span className="text-5xl font-black">{remainingDays}</span>
          <span className="text-sm font-bold uppercase tracking-widest">Gün</span>
        </PlayfulCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quote of the Day */}
        <PlayfulCard className="bg-playful-yellow lg:col-span-2 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
          <Star className="absolute top-4 right-4 text-playful-dark w-12 h-12 opacity-20" strokeWidth={3} />
          <h3 className="text-2xl font-black mb-4">Günün Motivasyonu</h3>
          <p className="text-2xl font-bold italic leading-relaxed text-playful-dark">
            "{MOCK_QUOTE}"
          </p>
        </PlayfulCard>
        {/* Quick Stats */}
        <PlayfulCard className="bg-playful-teal text-playful-dark flex flex-col items-center justify-center space-y-2">
          <div className="w-16 h-16 bg-white border-4 border-playful-dark rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-playful-yellow" fill="currentColor" strokeWidth={3} />
          </div>
          <span className="text-3xl font-black">12. Lv</span>
          <span className="font-bold">Çalışma Puanı: 850</span>
        </PlayfulCard>
      </div>
      {/* Daily Tasks Summary */}
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
      </div>
    </div>
  );
}