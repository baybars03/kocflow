import React, { useState, useEffect } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Plus, Check, Loader2, Trash2, ClipboardList, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTasks, useStats, useCompletePomodoro } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { TYTSubject } from '@shared/types';
import { PomodoroTimer } from '@/components/ui/PomodoroTimer';
export function TasksPage() {
  const userId = useAuth((s) => s.user?.id);
  const { data: tasks, isLoading, updateTask, createTask, deleteTask } = useTasks(userId);
  const { data: stats } = useStats(userId);
  const completePomo = useCompletePomodoro(userId);
  const [newTopic, setNewTopic] = useState('');
  const [newSubject, setNewSubject] = useState<TYTSubject>('Matematik');
  const [isOpen, setIsOpen] = useState(false);
  const [showPomo, setShowPomo] = useState(false);
  const handleToggle = (id: string, currentDone: boolean) => {
    updateTask.mutate({ id, done: !currentDone }, {
      onSuccess: (data) => {
        if (data.done) {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
          toast.success("Görev Tamamlandı! +50 Puan 🌟");
        }
      }
    });
  };
  const handleCreate = () => {
    if (!newTopic.trim() || !userId) return;
    createTask.mutate({ topic: newTopic, subject: newSubject, userId }, {
      onSuccess: () => {
        setNewTopic('');
        setIsOpen(false);
        toast.info("Yeni görev eklendi! ✍️");
      }
    });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="lg:col-span-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-playful-dark">Görevlerim</h1>
            <p className="font-bold text-muted-foreground">Adım adım başarıya!</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowPomo(!showPomo)}
              className={cn("p-4 border-4 border-playful-dark rounded-xl shadow-playful transition-all", showPomo ? "bg-playful-red text-white" : "bg-white")}
            >
              <Timer className="w-6 h-6" />
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="playful-button bg-playful-yellow">
                  <Plus className="w-6 h-6" strokeWidth={3} />
                  Yeni
                </button>
              </DialogTrigger>
              <DialogContent className="border-4 border-playful-dark rounded-[2rem]">
                <DialogHeader><DialogTitle className="text-2xl font-black">Yeni Görev</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <Input placeholder="Konu Başlığı" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} className="playful-input" />
                  <Select value={newSubject} onValueChange={(v) => setNewSubject(v as TYTSubject)}>
                    <SelectTrigger className="playful-input h-12"><SelectValue placeholder="Ders seç" /></SelectTrigger>
                    <SelectContent><SelectItem value="Matematik">Matematik</SelectItem><SelectItem value="Türkçe">Türkçe</SelectItem><SelectItem value="Fen">Fen</SelectItem><SelectItem value="Sosyal">Sosyal</SelectItem></SelectContent>
                  </Select>
                  <Button onClick={handleCreate} className="w-full bg-playful-teal text-white font-black py-6 border-4 border-playful-dark shadow-playful">Ekle!</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? <div className="flex justify-center p-12"><Loader2 className="w-10 h-10 animate-spin text-playful-teal" /></div> :
           tasks?.length ? (
             <AnimatePresence mode="popLayout">
               {tasks.map((task) => (
                 <motion.div key={task.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <PlayfulCard className={cn("flex items-center gap-4 group py-4", task.done && "bg-slate-50 opacity-60 grayscale")}>
                      <div onClick={() => handleToggle(task.id, task.done)} className={cn("w-10 h-10 border-4 border-playful-dark rounded-lg flex items-center justify-center cursor-pointer transition-all", task.done ? "bg-playful-teal" : "bg-white shadow-playful-active")}>
                        {task.done && <Check className="w-6 h-6 text-white" strokeWidth={5} />}
                      </div>
                      <div className="flex-1">
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark", SUBJECT_COLORS[task.subject])}>{task.subject}</span>
                        <h3 className={cn("text-lg font-bold truncate", task.done && "line-through")}>{task.topic}</h3>
                      </div>
                      <button onClick={() => deleteTask.mutate(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-playful-red"><Trash2 className="w-5 h-5" /></button>
                    </PlayfulCard>
                 </motion.div>
               ))}
             </AnimatePresence>
           ) : <div className="text-center py-20 text-slate-400 font-bold">Henüz görev yok!</div>
          }
        </div>
      </div>
      <div className="lg:col-span-4 space-y-6">
        {showPomo ? (
          <PomodoroTimer onComplete={() => completePomo.mutate()} />
        ) : (
          <PlayfulCard className="bg-playful-teal text-white flex flex-col items-center justify-center py-10 border-playful-dark shadow-playful cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowPomo(true)}>
            <Timer className="w-16 h-16 mb-4" strokeWidth={3} />
            <h3 className="text-2xl font-black">Odaklanmaya Başla</h3>
            <p className="font-bold opacity-80">25 Dakika Pomodoro</p>
          </PlayfulCard>
        )}
        <PlayfulCard className="bg-white border-dashed border-4 border-slate-300 p-6">
          <h4 className="font-black mb-2 flex items-center gap-2"><Check className="text-playful-teal" /> Streak Bonusu</h4>
          <p className="text-sm font-bold text-muted-foreground leading-snug">Pomodoro seansları sırasında bitirdiğin her görev ekstra 25 puan kazandırır!</p>
        </PlayfulCard>
      </div>
    </div>
  );
}