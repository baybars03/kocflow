import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useStats, useTasks } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { Flame, CheckCircle2, ArrowRight, Star, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { motion } from 'framer-motion';
export function StudentLandingTeaser() {
  const userId = useAuth(s => s.user?.id);
  const { data: stats, isLoading: statsLoading } = useStats(userId);
  const { data: tasks, isLoading: tasksLoading } = useTasks(userId);
  const pendingTasks = tasks?.filter(t => !t.done).slice(0, 2) || [];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PlayfulCard className="bg-white border-playful-dark shadow-playful p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-playful-teal/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-playful-yellow rounded-2xl border-4 border-playful-dark flex items-center justify-center text-playful-dark shadow-playful-active">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Günlük Akışın</h2>
                <p className="font-bold text-muted-foreground">Hedeflerine ulaşmak için {pendingTasks.length} görev seni bekliyor.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlayfulCard className="bg-playful-red/5 border-2 border-playful-red p-4 flex items-center gap-4 shadow-none hover:translate-y-0">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Flame className="w-10 h-10 text-playful-red fill-current" />
                </motion.div>
                <div>
                  <div className="text-2xl font-black text-playful-red">{stats?.streakDays || 0} Gün</div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground">Mevcut Streak</div>
                </div>
              </PlayfulCard>
              <PlayfulCard className="bg-playful-teal/5 border-2 border-playful-teal p-4 flex items-center gap-4 shadow-none hover:translate-y-0">
                <div className="p-2 bg-playful-teal rounded-lg text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-playful-teal">{stats?.completedTasks || 0}</div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground">Biten Görev</div>
                </div>
              </PlayfulCard>
            </div>
            <div className="space-y-4">
              <LevelProgress value={stats?.progressToNextLevel || 0} label={`Lvl ${stats?.level || 1} İlerlemesi`} />
            </div>
            <Link to="/tasks" className="playful-button bg-playful-teal text-white w-full md:w-auto py-4 px-8 group">
              Görevlerine Git <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            <PlayfulCard className="bg-slate-50 border-dashed border-4 border-slate-300 p-6 space-y-4">
              <h4 className="font-black text-sm uppercase flex items-center gap-2">
                <Star className="w-4 h-4 text-playful-yellow fill-current" /> Sıradaki Görevlerin
              </h4>
              <div className="space-y-3">
                {tasksLoading ? <Loader2 className="animate-spin" /> : pendingTasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border-2 border-playful-dark rounded-xl shadow-playful-active">
                    <div className="w-3 h-3 rounded-full bg-playful-red border border-playful-dark" />
                    <div className="font-bold text-sm truncate">{t.topic}</div>
                  </div>
                ))}
                {pendingTasks.length === 0 && !tasksLoading && (
                  <div className="text-center py-6 text-muted-foreground font-bold">Tüm görevler bitti! 🎉</div>
                )}
              </div>
            </PlayfulCard>
          </div>
        </div>
      </PlayfulCard>
    </div>
  );
}