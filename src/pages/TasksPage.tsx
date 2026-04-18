import React, { useState } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Plus, Check, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTasks } from '@/hooks/use-tyt-api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TYTSubject } from '@shared/types';
export function TasksPage() {
  const { data: tasks, isLoading, updateTask, createTask, deleteTask } = useTasks();
  const [newTopic, setNewTopic] = useState('');
  const [newSubject, setNewSubject] = useState<TYTSubject>('Matematik');
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = (id: string, currentDone: boolean) => {
    updateTask.mutate({ id, done: !currentDone }, {
      onSuccess: (data) => {
        if (data.done) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
          });
        }
      }
    });
  };
  const handleCreate = () => {
    if (!newTopic.trim()) return;
    createTask.mutate({ topic: newTopic, subject: newSubject }, {
      onSuccess: () => {
        setNewTopic('');
        setIsOpen(false);
      }
    });
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-playful-dark">Görevlerim</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="playful-button bg-playful-yellow">
              <Plus className="w-6 h-6" strokeWidth={3} />
              Yeni Görev
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Yeni Görev Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="font-bold">Konu Başlığı</label>
                <Input 
                  placeholder="Örn: Rasyonel Sayılar" 
                  value={newTopic} 
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="playful-input"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Ders</label>
                <Select value={newSubject} onValueChange={(v) => setNewSubject(v as TYTSubject)}>
                  <SelectTrigger className="playful-input h-12">
                    <SelectValue placeholder="Ders seç" />
                  </SelectTrigger>
                  <SelectContent className="border-4 border-playful-dark rounded-xl">
                    <SelectItem value="Matematik">Matematik</SelectItem>
                    <SelectItem value="Türkçe">Türkçe</SelectItem>
                    <SelectItem value="Fen">Fen</SelectItem>
                    <SelectItem value="Sosyal">Sosyal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleCreate} 
                disabled={createTask.isPending}
                className="w-full bg-playful-teal text-playful-dark font-black text-lg py-6 border-4 border-playful-dark shadow-playful hover:translate-y-[-2px] hover:shadow-playful-hover transition-all"
              >
                {createTask.isPending ? <Loader2 className="animate-spin" /> : 'Listeye Ekle!'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-10 h-10 animate-spin text-playful-teal" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {tasks?.map((task) => (
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
                    "flex items-center gap-4 group relative",
                    task.done && "bg-slate-50 opacity-80"
                  )}
                >
                  <div 
                    onClick={() => handleToggle(task.id, task.done)}
                    className={cn(
                      "w-10 h-10 border-4 border-playful-dark rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer",
                      task.done ? "bg-playful-teal translate-y-0.5" : "bg-white shadow-playful hover:scale-105"
                    )}
                  >
                    {task.done && <Check className="w-6 h-6 text-white" strokeWidth={4} />}
                  </div>
                  <div className="flex-1 cursor-default">
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
                  <button 
                    onClick={() => deleteTask.mutate(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-playful-red/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-playful-red" />
                  </button>
                </PlayfulCard>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}