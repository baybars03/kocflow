import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { ArrowLeft, TrendingUp, Target, ClipboardCheck, MessageCircle, Star, Sparkles, Loader2, FileDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { DenemeScore, TYTTask, UserStats } from '@shared/types';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoachStudentChat } from '@/components/chat/CoachStudentChat';
export function CoachStudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: scores, isLoading: scoresLoading } = useQuery({
    queryKey: ['scores', id],
    queryFn: () => api<DenemeScore[]>(`/api/scores?userId=${id}`),
    enabled: !!id
  });
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => api<TYTTask[]>(`/api/tasks?userId=${id}`),
    enabled: !!id
  });
  const { data: stats } = useQuery({
    queryKey: ['stats', id],
    queryFn: () => api<UserStats>(`/api/stats?userId=${id}`),
    enabled: !!id
  });
  const chartData = (scores || []).map(s => ({
    ...s,
    formattedDate: format(parseISO(s.date), 'd MMM', { locale: tr })
  }));
  const radarData = [
    { subject: 'Türkçe', value: scores?.[scores.length-1]?.turkce || 0 },
    { subject: 'Matematik', value: scores?.[scores.length-1]?.matematik || 0 },
    { subject: 'Sosyal', value: scores?.[scores.length-1]?.sosyal || 0 },
    { subject: 'Fen', value: scores?.[scores.length-1]?.fen || 0 },
  ];
  const handleRemind = () => {
    toast.success("Hatırlatıcı gönderildi! 🔔");
  };
  const handleExport = () => {
    window.print();
  };
  if (scoresLoading || tasksLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-playful-teal w-12 h-12" /></div>;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between no-print">
          <button
            onClick={() => navigate('/coach')}
            className="flex items-center gap-2 font-black text-playful-dark hover:text-playful-teal transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
            Panele Geri Dön
          </button>
          <button onClick={handleExport} className="playful-button bg-playful-yellow text-sm py-2">
            <FileDown className="w-5 h-5" /> Gelişim Raporu
          </button>
        </div>
        <Tabs defaultValue="analytics" className="w-full no-print">
          <TabsList className="bg-transparent border-b-4 border-playful-dark w-full justify-start h-auto p-0 gap-2 mb-8">
            <TabsTrigger value="analytics" className="px-6 py-3 rounded-t-xl border-4 border-b-0 border-playful-dark bg-white data-[state=active]:bg-playful-teal data-[state=active]:text-white font-black">Analiz</TabsTrigger>
            <TabsTrigger value="chat" className="px-6 py-3 rounded-t-xl border-4 border-b-0 border-playful-dark bg-white data-[state=active]:bg-playful-red data-[state=active]:text-white font-black">Mesajlaşma</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics" className="space-y-8 print-section">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <PlayfulCard className="bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black flex items-center gap-2">
                      <TrendingUp className="text-playful-teal" /> Net Gelişimi
                    </h3>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="5 5" vertical={false} />
                        <XAxis dataKey="formattedDate" />
                        <YAxis domain={[0, 120]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="totalNet"
                          stroke="#4ECDC4"
                          strokeWidth={6}
                          dot={{ r: 8, fill: '#4ECDC4', stroke: '#1e293b', strokeWidth: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </PlayfulCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <PlayfulCard className="bg-white">
                    <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                      <Target className="text-playful-red" /> Konu Hakimiyeti
                    </h3>
                    <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                         <RadarChart data={radarData}>
                           <PolarGrid />
                           <PolarAngleAxis dataKey="subject" />
                           <Radar name="Netler" dataKey="value" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.6} />
                         </RadarChart>
                       </ResponsiveContainer>
                    </div>
                  </PlayfulCard>
                  <PlayfulCard className="bg-playful-yellow text-playful-dark flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-xl mb-2 flex items-center gap-2">
                        <Star className="fill-current" /> Seviye & Puan
                      </h3>
                      <p className="font-bold opacity-80">Gelecek hedeflerine {stats?.nextLevelPoints || 0} puan kaldı!</p>
                    </div>
                    <LevelProgress value={stats?.progressToNextLevel || 0} label={`Lvl ${stats?.level || 1}`} className="mt-4" />
                  </PlayfulCard>
                </div>
              </div>
              <div className="space-y-8">
                <PlayfulCard className="bg-white border-b-8 border-playful-dark">
                  <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                    <ClipboardCheck className="text-playful-teal" /> Bekleyen Görevler
                  </h3>
                  <div className="space-y-3">
                    {tasks?.filter(t => !t.done).map(task => (
                      <div key={task.id} className="p-3 border-2 border-slate-100 rounded-xl flex items-center justify-between group">
                        <div>
                          <p className="font-bold text-sm leading-tight">{task.topic}</p>
                          <span className="text-[10px] font-black uppercase text-muted-foreground">{task.subject}</span>
                        </div>
                        <button onClick={handleRemind} className="opacity-0 group-hover:opacity-100 p-2 text-playful-teal hover:bg-slate-50 rounded-lg transition-all">
                           <Sparkles className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </PlayfulCard>
                <PlayfulCard className="bg-slate-50 border-dashed border-4 border-slate-300">
                   <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                     <MessageCircle className="text-muted-foreground" /> Koç Notları
                   </h3>
                   <textarea
                     className="w-full bg-transparent border-none focus:ring-0 font-bold text-muted-foreground placeholder:text-slate-300 resize-none h-40"
                     placeholder="Öğrenci hakkında notlarını buraya yazabilirsin..."
                   />
                </PlayfulCard>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="chat">
            {id && <CoachStudentChat otherUserId={id} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}