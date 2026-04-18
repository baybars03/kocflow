import React, { useState, useEffect } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { SUBJECT_COLORS } from '@shared/mock-tyt-data';
import { Plus, Check, Loader2, Trash2, ClipboardList, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTasks, useStats } from '@/hooks/use-tyt-api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { TYTSubject } from '@shared/types';
export function TasksPage() {
  const { data: tasks, isLoading, updateTask, createTask, deleteTask } = useTasks();
  const { data: stats } = useStats();
  const [newTopic, setNewTopic] = useState('');
  const [newSubject, setNewSubject] = useState<TYTSubject>('Matematik');
  const [isOpen, setIsOpen] = useState(false);
  const [prevLevel, setPrevLevel] = useState<number | null>(null);
  // Monitor level up
  useEffect(() => {
    if (stats?.level) {
      if (prevLevel !== null && stats.level > prevLevel) {
        toast.success(`TEBRİKLER! Seviye Atladın: Seviye ${stats.level} 🚀`, {
          description: "Çalışmalarının karşılığını alıyorsun, böyle devam!",
          duration: 5000,
        });
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
        });
      }
      setPrevLevel(stats.level);
    }
  }, [stats?.level]);
  const handleToggle = (id: string, currentDone: boolean) => {
    updateTask.mutate({ id, done: !currentDone }, {
      onSuccess: (data) => {
        if (data.done) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#4ECDC4', '#FFE66D']
          });
          toast.success("Görev Tamamlandı! +50 Puan 🌟");
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
        toast.info("Yeni görev listene eklendi. Başarılar! ✍️");
      }
    });
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-playful-dark">Görevlerim</h1>
          <p className="font-bold text-muted-foreground">Konuları bitir, netlerini artır!</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="playful-button bg-playful-yellow">
              <Plus className="w-6 h-6" strokeWidth={3} />
              Yeni Görev
            </button>
          </DialogTrigger>
          <DialogContent className="border-4 border-playful-dark rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Yeni Görev Ekle</DialogTitle>
              <DialogDescription className="text-muted-foreground">TYT konularını buraya ekle ve tamamla!</DialogDescription>
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
        ) : tasks && tasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <PlayfulCard
                  className={cn(
                    "flex items-center gap-4 group relative py-4 md:py-6",
                    task.done && "bg-slate-50 border-slate-200 shadow-none hover:shadow-none translate-y-0"
                  )}
                >
                  <div
                    onClick={() => handleToggle(task.id, task.done)}
                    className={cn(
                      "w-12 h-12 border-4 border-playful-dark rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer",
                      task.done ? "bg-playful-teal translate-y-0.5 border-playful-teal" : "bg-white shadow-playful hover:scale-105 active:scale-95"
                    )}
                  >
                    {task.done && <Check className="w-8 h-8 text-white" strokeWidth={5} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark inline-block mb-1",
                      SUBJECT_COLORS[task.subject]
                    )}>
                      {task.subject}
                    </span>
                    <h3 className={cn(
                      "text-xl font-bold transition-all truncate",
                      task.done && "line-through text-muted-foreground opacity-60"
                    )}>
                      {task.topic}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      deleteTask.mutate(task.id);
                      toast.error("Görev silindi.");
                    }}
                    className="opacity-0 group-hover:opacity-100 p-3 hover:bg-playful-red/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-6 h-6 text-playful-red" />
                  </button>
                </PlayfulCard>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 bg-white border-4 border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center mb-6">
              <ClipboardList className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-400">Hadi Başlayalım!</h3>
            <p className="text-slate-400 font-bold max-w-sm mt-2">
              Henüz bir görev eklememişsin. Sağ üstteki butona basarak ilk TYT görevini oluşturabilirsin! 🚀
            </p>
            <div className="mt-8 flex items-center gap-2 text-playful-teal font-black animate-bounce">
              <Sparkles className="w-5 h-5 fill-current" />
              <span>İlk adım her zaman en zoru, gerisi gelecek!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}