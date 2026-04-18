import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useCoachStudents } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { Users, AlertCircle, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
const ENGAGEMENT_DATA = [
  { day: 'Pzt', val: 12 }, { day: 'Sal', val: 18 }, { day: 'Çar', val: 15 },
  { day: 'Per', val: 24 }, { day: 'Cum', val: 32 }, { day: 'Cmt', val: 28 }, { day: 'Paz', val: 35 }
];
export function CoachLandingTeaser() {
  const userId = useAuth(s => s.user?.id);
  const { data: students, isLoading } = useCoachStudents(userId);
  const alerts = students?.filter(s => s.lowProgressAlert) || [];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PlayfulCard className="bg-white border-playful-dark shadow-playful p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-playful-red/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-playful-red rounded-2xl border-4 border-playful-dark flex items-center justify-center text-white shadow-playful-active">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Öğrenci Akış Özetin</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border-2 border-playful-dark rounded-2xl flex flex-col">
                <span className="text-xs font-black uppercase text-muted-foreground">Aktif Öğrenci</span>
                <span className="text-3xl font-black">{isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : students?.length || 0}</span>
              </div>
              <div className={cn("p-4 border-2 border-playful-dark rounded-2xl flex flex-col transition-colors", alerts.length > 0 ? "bg-playful-red/10 border-playful-red" : "bg-slate-50")}>
                <span className="text-xs font-black uppercase text-muted-foreground">Dikkat Gereken</span>
                <span className="text-3xl font-black text-playful-red">{alerts.length}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-black text-sm uppercase flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-playful-red" /> Kritik Durumlar
              </h4>
              <div className="space-y-2">
                {alerts.slice(0, 2).map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border-2 border-slate-100 rounded-xl">
                    <span className="font-bold text-sm">{s.email}</span>
                    <Badge variant="error" className="text-[10px]">Düşük İlerleme</Badge>
                  </div>
                ))}
                {alerts.length === 0 && <p className="text-sm font-bold text-muted-foreground">Tüm öğrenciler akışta! ✨</p>}
              </div>
            </div>
            <Link to="/coach" className="playful-button bg-playful-dark text-white w-full md:w-auto py-4 px-8 group">
              Tüm Paneli Yönet <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="lg:col-span-5 h-full">
            <PlayfulCard className="bg-playful-teal/5 border-dashed border-4 border-playful-teal/30 h-full flex flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2 mb-1">
                  <TrendingUp className="text-playful-teal" /> Etkileşim Trendi
                </h3>
                <p className="text-xs font-bold text-muted-foreground mb-6">Haftalık öğrenci aktivite grafiği</p>
              </div>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ENGAGEMENT_DATA}>
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <Line type="step" dataKey="val" stroke="#4ECDC4" strokeWidth={6} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </PlayfulCard>
          </div>
        </div>
      </PlayfulCard>
    </div>
  );
}