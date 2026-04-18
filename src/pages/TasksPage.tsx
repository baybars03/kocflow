import React, { useState } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_TYT_TASKS, SUBJECT_COLORS, TYTTask } from '@shared/mock-tyt-data';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
export function TasksPage() {
  const [tasks, setTasks] = useState<TYTTask[]>(MOCK_TYT_TASKS);
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextDone = !t.done;
        if (nextDone) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
          });
        }
        return { ...t, done: nextDone };
      }
      return t;
    }));
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-playful-dark">Görevlerim</h1>
        <button className="playful-button bg-playful-yellow">
          <Plus className="w-6 h-6" strokeWidth={3} />
          Yeni Görev
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <PlayfulCard 
                className={cn(
                  "flex items-center gap-4 cursor-pointer",
                  task.done && "bg-slate-50 opacity-80"
                )}
                onClick={() => toggleTask(task.id)}
              >
                <div className={cn(
                  "w-10 h-10 border-4 border-playful-dark rounded-xl flex items-center justify-center transition-all shrink-0",
                  task.done ? "bg-playful-teal translate-y-0.5" : "bg-white shadow-playful"
                )}>
                  {task.done && <Check className="w-6 h-6 text-white" strokeWidth={4} />}
                </div>
                <div className="flex-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark inline-block mb-1",
                    SUBJECT_COLORS[task.subject]
                  )}>
                    {task.subject}
                  </span>
                  <h3 className={cn(
                    "text-xl font-bold transition-all",
                    task.done && "line-through text-muted-foreground"
                  )}>
                    {task.topic}
                  </h3>
                </div>
              </PlayfulCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}