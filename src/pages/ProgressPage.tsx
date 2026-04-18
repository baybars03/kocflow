import React, { useState } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useScores } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Plus, Loader2, Info, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function ProgressPage() {
  const userId = useAuth((s) => s.user?.id);
  const { data: scores, isLoading, createScore } = useScores(userId);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ turkce: 0, matematik: 0, sosyal: 0, fen: 0 });
  const chartData = (scores || []).map(score => ({
    ...score,
    formattedDate: format(parseISO(score.date), 'd MMM', { locale: tr })
  }));
  const latestScore = scores && scores.length > 0
    ? scores[scores.length - 1]
    : { turkce: 0, matematik: 0, sosyal: 0, fen: 0, totalNet: 0 };
  const getAvg = (key: 'turkce' | 'matematik' | 'sosyal' | 'fen') => {
    if (!scores || scores.length === 0) return '0';
    return (scores.reduce((acc, s) => acc + s[key], 0) / scores.length).toFixed(1);
  };
  const handleAddScore = () => {
    if (!userId) return;
    const totalNet = Number(form.turkce) + Number(form.matematik) + Number(form.sosyal) + Number(form.fen);
    createScore.mutate({
      userId,
      date: new Date().toISOString(),
      ...form,
      totalNet
    }, {
      onSuccess: () => {
        setIsOpen(false);
        setForm({ turkce: 0, matematik: 0, sosyal: 0, fen: 0 });
      }
    });
  };
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-playful-dark">Net Takibi</h1>
          <p className="text-muted-foreground font-bold flex items-center gap-1">
            <Info className="w-4 h-4" /> Gelişimini buradan takip et.
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="playful-button bg-playful-yellow">
              <Plus className="w-6 h-6" strokeWidth={3} />
              Yeni Deneme
            </button>
          </DialogTrigger>
          <DialogContent className="border-4 border-playful-dark rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Deneme Netlerini Gir</DialogTitle>
              <DialogDescription className="text-muted-foreground">Deneme netlerini girerek ilerlemeni grafik üzerinde takip et.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {[
                { key: 'turkce', label: 'Türkçe' },
                { key: 'matematik', label: 'Matematik' },
                { key: 'sosyal', label: 'Sosyal' },
                { key: 'fen', label: 'Fen' }
              ].map((subj) => (
                <div key={subj.key} className="space-y-2">
                  <label className="font-bold">{subj.label}</label>
                  <Input
                    type="number"
                    step="0.25"
                    className="playful-input"
                    value={form[subj.key as keyof typeof form]}
                    onChange={(e) => setForm({...form, [subj.key]: Number(e.target.value)})}
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={handleAddScore}
              disabled={createScore.isPending}
              className="w-full bg-playful-teal text-playful-dark font-black text-lg py-6 border-4 border-playful-dark shadow-playful hover:translate-y-[-2px] hover:shadow-playful-hover transition-all"
            >
              {createScore.isPending ? <Loader2 className="animate-spin" /> : 'Netleri Kaydet!'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Türkçe', value: latestScore.turkce, avg: getAvg('turkce'), color: 'bg-playful-red' },
          { label: 'Matematik', value: latestScore.matematik, avg: getAvg('matematik'), color: 'bg-playful-teal' },
          { label: 'Sosyal', value: latestScore.sosyal, avg: getAvg('sosyal'), color: 'bg-playful-yellow' },
          { label: 'Fen', value: latestScore.fen, avg: getAvg('fen'), color: 'bg-green-400' },
        ].map((item) => (
          <PlayfulCard key={item.label} className="flex flex-col items-center py-6 group relative border-playful-dark shadow-playful">
            <div className={cn("absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-playful-dark", item.color)} />
            <span className="text-xs font-black uppercase text-muted-foreground mb-1">{item.label}</span>
            <span className="text-4xl font-black text-playful-dark">{item.value}</span>
            <span className="text-[10px] font-bold mt-2 opacity-60 bg-slate-100 px-2 py-0.5 rounded-full border border-playful-dark">ORT: {item.avg}</span>
          </PlayfulCard>
        ))}
      </div>
      <PlayfulCard className="p-4 md:p-10 min-h-[450px] bg-white border-playful-dark shadow-playful">
        {isLoading ? (
          <div className="flex items-center justify-center h-[350px]">
            <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
          </div>
        ) : scores && scores.length > 0 ? (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontWeight: 'black', fill: '#1e293b', fontSize: 12 }} 
                  axisLine={{ stroke: '#1e293b', strokeWidth: 4 }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, 120]} 
                  tick={{ fontWeight: 'black', fill: '#1e293b', fontSize: 12 }} 
                  axisLine={{ stroke: '#1e293b', strokeWidth: 4 }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: '1.5rem', 
                    border: '4px solid #1e293b', 
                    boxShadow: '6px 6px 0px 0px rgba(30,41,59,1)', 
                    fontWeight: 'black',
                    padding: '12px'
                  }}
                  cursor={{ stroke: '#1e293b', strokeWidth: 4, strokeDasharray: '0' }}
                />
                <Legend verticalAlign="top" height={60} iconType="circle" wrapperStyle={{ fontWeight: 'bold', fontSize: '14px' }} />
                <Line 
                  name="Toplam Net" 
                  type="monotone" 
                  dataKey="totalNet" 
                  stroke="#1e293b" 
                  strokeWidth={8} 
                  dot={{ r: 8, fill: '#1e293b', strokeWidth: 4, stroke: '#fff' }} 
                  activeDot={{ r: 12, strokeWidth: 0 }} 
                />
                <Line name="Türkçe" type="monotone" dataKey="turkce" stroke="#FF6B6B" strokeWidth={4} dot={false} strokeDasharray="5 5" />
                <Line name="Matematik" type="monotone" dataKey="matematik" stroke="#4ECDC4" strokeWidth={4} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[350px] text-center space-y-4">
            <div className="w-24 h-24 bg-slate-100 border-4 border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center">
              <TrendingUp className="w-12 h-12 text-slate-300" />
            </div>
            <p className="text-xl font-black text-slate-400">Henüz Veri Yok</p>
            <p className="text-slate-400 font-bold max-w-xs">İlk deneme sonucunu ekleyerek gelişim grafiğini başlatabilirsin!</p>
          </div>
        )}
      </PlayfulCard>
    </div>
  );
}