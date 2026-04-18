import React, { useState } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useScores, useLeaderboard } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Plus, Loader2, TrendingUp, Trophy, Calculator, GraduationCap, FileDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DenemeScore } from '@shared/types';
export function ProgressPage() {
  const userId = useAuth((s) => s.user?.id);
  const { data: scores, isLoading, createScore } = useScores(userId);
  const { data: leaderboard, isLoading: lbLoading } = useLeaderboard();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ turkce: 0, matematik: 0, sosyal: 0, fen: 0 });
  const chartData = (scores || []).map(score => ({
    ...score,
    formattedDate: format(parseISO(score.date), 'd MMM', { locale: tr })
  }));
  const latestScore = scores?.[scores.length - 1] || {
    turkce: 0,
    matematik: 0,
    sosyal: 0,
    fen: 0,
    totalNet: 0
  };
  const calculateTYT = (s: Pick<DenemeScore, 'turkce' | 'matematik' | 'sosyal' | 'fen'>) => {
    return Math.floor(100 + (s.turkce * 3.3) + (s.matematik * 3.3) + (s.sosyal * 3.4) + (s.fen * 3.4));
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
  const handlePrint = () => {
    window.print();
  };
  const subjectKeys = [
    { label: 'Türkçe', key: 'turkce' as const },
    { label: 'Matematik', key: 'matematik' as const },
    { label: 'Sosyal', key: 'sosyal' as const },
    { label: 'Fen', key: 'fen' as const }
  ];
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between no-print">
        <h1 className="text-4xl font-black text-playful-dark">Gelişim & Başarı</h1>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="p-4 border-4 border-playful-dark rounded-xl bg-white shadow-playful hover:translate-y-[-2px] transition-all">
            <FileDown className="w-6 h-6" />
          </button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="playful-button bg-playful-yellow">
                <Plus className="w-5 h-5" /> Deneme Ekle
              </button>
            </DialogTrigger>
            <DialogContent className="border-4 border-playful-dark rounded-[2rem]">
              <DialogHeader>
                <h2 className="text-2xl font-black">Netlerini Gir</h2>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {subjectKeys.map(({ label, key }) => (
                  <div key={key} className="space-y-1">
                    <label className="font-bold text-sm">{label}</label>
                    <Input
                      type="number"
                      step="0.25"
                      className="playful-input"
                      value={form[key]}
                      onChange={(e) => setForm({...form, [key]: Number(e.target.value)})}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleAddScore} className="w-full bg-playful-teal text-white font-black py-6 border-4 border-playful-dark shadow-playful">Kaydet!</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="bg-transparent border-b-4 border-playful-dark w-full justify-start h-auto p-0 gap-2 mb-8 no-print">
          <TabsTrigger value="stats" className="px-6 py-3 rounded-t-xl border-4 border-b-0 border-playful-dark bg-white data-[state=active]:bg-playful-teal data-[state=active]:text-white font-black">İstatistikler</TabsTrigger>
          <TabsTrigger value="simulator" className="px-6 py-3 rounded-t-xl border-4 border-b-0 border-playful-dark bg-white data-[state=active]:bg-playful-red data-[state=active]:text-white font-black">Puan Simülatörü</TabsTrigger>
          <TabsTrigger value="leaderboard" className="px-6 py-3 rounded-t-xl border-4 border-b-0 border-playful-dark bg-white data-[state=active]:bg-playful-yellow data-[state=active]:text-playful-dark font-black">Sıralama</TabsTrigger>
        </TabsList>
        <TabsContent value="stats" className="space-y-8 print-section">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjectKeys.map(({ label, key }) => (
              <PlayfulCard key={key} className="text-center py-4 border-playful-dark shadow-playful">
                <p className="text-[10px] font-black uppercase text-muted-foreground">{label}</p>
                <p className="text-3xl font-black">{latestScore[key] || 0}</p>
              </PlayfulCard>
            ))}
          </div>
          <PlayfulCard className="p-6 md:p-10 h-[400px] bg-white border-playful-dark shadow-playful">
            {isLoading ? <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin" /></div> :
             scores?.length ? (
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData}>
                   <CartesianGrid strokeDasharray="5 5" vertical={false} />
                   <XAxis dataKey="formattedDate" />
                   <YAxis domain={[0, 120]} />
                   <Tooltip />
                   <Line type="monotone" dataKey="totalNet" stroke="#1e293b" strokeWidth={6} dot={{ r: 8, fill: '#1e293b' }} />
                 </LineChart>
               </ResponsiveContainer>
             ) : <div className="flex flex-col items-center justify-center h-full text-slate-300 font-bold"><TrendingUp className="w-12 h-12 mb-2" />Veri Bekleniyor</div>}
          </PlayfulCard>
        </TabsContent>
        <TabsContent value="simulator" className="print-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlayfulCard className="bg-playful-red text-white flex flex-col items-center justify-center py-16 border-playful-dark shadow-playful">
               <Calculator className="w-16 h-16 mb-4" />
               <p className="font-black uppercase tracking-widest opacity-80">Tahmini TYT Puanın</p>
               <h2 className="text-8xl font-black my-4 tracking-tighter">{calculateTYT(latestScore)}</h2>
               <div className="bg-white/20 px-6 py-2 rounded-full font-bold border border-white/30">Son deneme baz alınmıştır</div>
            </PlayfulCard>
            <div className="space-y-4">
               <h3 className="text-2xl font-black">Hedef Üniversite Analizi</h3>
               <PlayfulCard className="bg-white border-playful-dark shadow-playful flex items-center gap-4">
                 <div className="w-14 h-14 bg-playful-teal rounded-xl border-2 border-playful-dark flex items-center justify-center text-white"><GraduationCap /></div>
                 <div><p className="font-black">Boğaziçi/ODTÜ Rotası</p><p className="text-xs font-bold text-muted-foreground">Şu anki netlerinle %65 uyumlusun!</p></div>
               </PlayfulCard>
               <PlayfulCard className="bg-white border-playful-dark shadow-playful flex items-center gap-4 border-dashed opacity-50 no-print">
                 <div className="w-14 h-14 bg-slate-100 rounded-xl border-2 border-slate-300 flex items-center justify-center text-slate-400">?</div>
                 <div><p className="font-black text-slate-400">Yeni Hedef Ekle</p></div>
               </PlayfulCard>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="leaderboard" className="no-print">
          <PlayfulCard className="bg-white p-0 overflow-hidden border-4">
            <div className="p-6 border-b-4 border-playful-dark bg-playful-yellow flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-2"><Trophy className="w-6 h-6" /> Küresel Sıralama</h3>
              <span className="text-xs font-black uppercase">En Yüksek 100 Net Ortalaması</span>
            </div>
            <table className="w-full text-left">
              <thead><tr className="border-b-4 border-playful-dark bg-slate-50"><th className="px-6 py-4 font-black">Sıra</th><th className="px-6 py-4 font-black">Öğrenci</th><th className="px-6 py-4 font-black">Ort. Net</th><th className="px-6 py-4 font-black">Seviye</th></tr></thead>
              <tbody>
                {lbLoading ? <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr> :
                 leaderboard?.map((entry, idx) => (
                  <tr key={idx} className={cn("border-b-2 border-slate-100 hover:bg-slate-50", idx < 3 && "bg-playful-teal/5")}>
                    <td className="px-6 py-4 font-black text-xl">{idx + 1}.</td>
                    <td className="px-6 py-4 font-bold">{entry.displayName}</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-playful-dark text-white rounded-lg font-black">{entry.avgNet}</span></td>
                    <td className="px-6 py-4"><span className="px-2 py-1 border-2 border-playful-dark rounded font-black text-xs uppercase bg-playful-yellow">Lvl {entry.level}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PlayfulCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}