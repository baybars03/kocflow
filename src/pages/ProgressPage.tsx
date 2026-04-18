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
import { cn } from '@/lib/utils';
import { Plus, Loader2, Award, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function ProgressPage() {
  const { data: scores, isLoading, createScore } = useScores();
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
    if (!scores || scores.length === 0) return 0;
    return (scores.reduce((acc, s) => acc + s[key], 0) / scores.length).toFixed(1);
  };
  const handleAddScore = () => {
    const totalNet = Number(form.turkce) + Number(form.matematik) + Number(form.sosyal) + Number(form.fen);
    createScore.mutate({
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
            <DialogHeader><DialogTitle className="text-2xl font-black">Deneme Netlerini Gir</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {['turkce', 'matematik', 'sosyal', 'fen'].map((subj) => (
                <div key={subj} className="space-y-2">
                  <label className="font-bold capitalize">{subj === 'turkce' ? 'Türkçe' : subj}</label>
                  <Input
                    type="number"
                    step="0.25"
                    className="playful-input"
                    value={form[subj as keyof typeof form]}
                    onChange={(e) => setForm({...form, [subj]: Number(e.target.value)})}
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
          <PlayfulCard key={item.label} className="flex flex-col items-center py-6 group relative">
            <div className={cn("absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-playful-dark", item.color)} />
            <span className="text-xs font-black uppercase text-muted-foreground mb-1">{item.label}</span>
            <span className="text-4xl font-black text-playful-dark">{item.value}</span>
            <span className="text-[10px] font-bold mt-2 opacity-60">ORT: {item.avg}</span>
          </PlayfulCard>
        ))}
      </div>
      <PlayfulCard className="p-4 md:p-8 min-h-[450px] bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-[350px]">
            <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
          </div>
        ) : scores && scores.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Net Gelişimi</h2>
                <p className="font-medium text-muted-foreground">Zaman içindeki performansın</p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-slate-100 p-2 rounded-xl border-2 border-playful-dark">
                <Award className="w-5 h-5 text-playful-yellow" />
                <span className="text-xs font-bold">En İyi: {Math.max(...scores.map(s => s.totalNet))} Net</span>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="formattedDate" tick={{ fontWeight: 'bold', fill: '#1e293b', fontSize: 12 }} axisLine={{ strokeWidth: 3 }} />
                  <YAxis domain={[0, 120]} tick={{ fontWeight: 'bold', fill: '#1e293b', fontSize: 12 }} axisLine={{ strokeWidth: 3 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '1.5rem', border: '4px solid #1e293b', boxShadow: '6px 6px 0px 0px rgba(30,41,59,1)', fontWeight: 'bold' }}
                    cursor={{ stroke: '#1e293b', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Legend verticalAlign="top" height={48} iconType="circle" />
                  <Line name="Toplam Net" type="stepAfter" dataKey="totalNet" stroke="#1e293b" strokeWidth={5} dot={{ r: 8, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 0 }} />
                  <Line name="Türkçe" type="monotone" dataKey="turkce" stroke="#FF6B6B" strokeWidth={3} dot={false} />
                  <Line name="Matematik" type="monotone" dataKey="matematik" stroke="#4ECDC4" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[350px] text-center space-y-4">
            <div className="p-6 bg-slate-50 rounded-full border-4 border-dashed border-slate-300">
              <TrendingUp className="w-16 h-16 text-slate-300" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-400">Henüz Veri Yok</p>
              <p className="font-bold text-slate-400/60">İlk deneme sonucunu ekleyerek grafiği başlat!</p>
            </div>
          </div>
        )}
      </PlayfulCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PlayfulCard className="bg-playful-yellow/20 border-dashed">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" /> Branş Analizi
          </h3>
          <p className="font-medium text-sm text-playful-dark/70">
            Türkçe ve Matematik branşlarında son 3 denemedir yükseliştesin. Fen bilimleri için biraz daha konu tekrarı gerekebilir!
          </p>
        </PlayfulCard>
        <PlayfulCard className="bg-playful-teal/20 border-dashed">
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" /> Strateji Notu
          </h3>
          <p className="font-medium text-sm text-playful-dark/70">
            Sosyal Bilgiler netlerin oldukça istikrarlı. Kalan zamanını Matematik problemlerine ayırmak toplam netini daha hızlı artırabilir.
          </p>
        </PlayfulCard>
      </div>
    </div>
  );
}