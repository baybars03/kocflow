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
import { Plus, Loader2 } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-playful-dark">Net Takibi</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="playful-button bg-playful-yellow">
              <Plus className="w-6 h-6" strokeWidth={3} />
              Yeni Deneme
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="text-2xl font-black">Deneme Netlerini Gir</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {['turkce', 'matematik', 'sosyal', 'fen'].map((subj) => (
                <div key={subj} className="space-y-2">
                  <label className="font-bold capitalize">{subj}</label>
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
              className="w-full bg-playful-teal text-playful-dark font-black text-lg py-6 border-4 border-playful-dark shadow-playful"
            >
              {createScore.isPending ? <Loader2 className="animate-spin" /> : 'Netleri Kaydet!'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Türkçe', value: latestScore.turkce, color: 'text-playful-red' },
          { label: 'Matematik', value: latestScore.matematik, color: 'text-playful-teal' },
          { label: 'Sosyal', value: latestScore.sosyal, color: 'text-playful-yellow' },
          { label: 'Fen', value: latestScore.fen, color: 'text-green-500' },
        ].map((item) => (
          <PlayfulCard key={item.label} className="flex flex-col items-center py-4">
            <span className="text-sm font-black uppercase text-muted-foreground">{item.label}</span>
            <span className={cn("text-3xl font-black", item.color)}>{item.value}</span>
          </PlayfulCard>
        ))}
      </div>
      <PlayfulCard className="p-4 md:p-8 min-h-[450px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-[350px]">
            <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-black">Net Gelişimi</h2>
              <p className="font-medium text-muted-foreground">Performans yolculuğun</p>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="formattedDate" tick={{ fontWeight: 'bold', fill: '#1e293b' }} />
                  <YAxis domain={[0, 120]} tick={{ fontWeight: 'bold', fill: '#1e293b' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '1rem', border: '3px solid #1e293b', boxShadow: '4px 4px 0px 0px rgba(30,41,59,1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Line name="Toplam Net" type="monotone" dataKey="totalNet" stroke="#1e293b" strokeWidth={5} dot={{ r: 8, fill: '#1e293b' }} />
                  <Line name="Türkçe" type="monotone" dataKey="turkce" stroke="#FF6B6B" strokeWidth={3} />
                  <Line name="Matematik" type="monotone" dataKey="matematik" stroke="#4ECDC4" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </PlayfulCard>
    </div>
  );
}