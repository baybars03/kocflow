import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Users, ClipboardList, GraduationCap, TrendingUp, AlertCircle, ChevronRight, CheckCircle2, Loader2, Search } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useCoachStudents, useBulkAssignTask } from '@/hooks/use-tyt-api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import type { TYTSubject } from '@shared/types';
export function CoachDashboard() {
  const navigate = useNavigate();
  const userId = useAuth(s => s.user?.id);
  const { data: students, isLoading } = useCoachStudents(userId);
  const bulkAssign = useBulkAssignTask();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [taskSubject, setTaskSubject] = useState<TYTSubject>('Matematik');
  const [taskTopic, setTaskTopic] = useState('');
  const handleSelectAll = () => {
    if (selectedIds.length === students?.length) setSelectedIds([]);
    else setSelectedIds(students?.map(s => s.studentId) || []);
  };
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const handleBulkAssign = async () => {
    if (!taskTopic.trim() || !selectedIds.length) {
      toast.error("Lütfen öğrenci seçin ve konu başlığı girin.");
      return;
    }
    bulkAssign.mutate({ studentIds: selectedIds, subject: taskSubject, topic: taskTopic }, {
      onSuccess: () => {
        toast.success(`${selectedIds.length} öğrenciye ödev gönderildi! 🚀`);
        setTaskTopic('');
        setSelectedIds([]);
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-10 animate-in slide-in-from-left-4 duration-500">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-playful-dark">Rehberlik Paneli 👨‍🏫</h1>
            <p className="text-lg font-bold text-muted-foreground">Öğrencilerinin başarı yolculuğuna yön ver.</p>
          </div>
          <div className="flex gap-4">
            <PlayfulCard className="bg-playful-teal text-white flex items-center gap-3 py-3 px-6 border-playful-dark shadow-playful">
              <Users className="w-6 h-6" strokeWidth={3} />
              <div className="flex flex-col">
                <span className="text-2xl font-black leading-none">{students?.length || 0}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">ÖĞRENCİ</span>
              </div>
            </PlayfulCard>
          </div>
        </div>
        {/* Bulk Actions */}
        <PlayfulCard className="bg-white border-playful-dark shadow-playful space-y-4">
          <h3 className="font-black text-xl flex items-center gap-2">
            <ClipboardList className="text-playful-red" /> Toplu Ödev Atama
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground">Ders</label>
              <select 
                value={taskSubject} 
                onChange={(e) => setTaskSubject(e.target.value as TYTSubject)}
                className="w-full playful-input h-12 bg-slate-50 font-bold"
              >
                <option value="Matematik">Matematik</option>
                <option value="Türkçe">Türkçe</option>
                <option value="Sosyal">Sosyal</option>
                <option value="Fen">Fen</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground">Konu Başlığı</label>
              <input 
                placeholder="Örn: Rasyonel Sayılar Çalışması" 
                value={taskTopic}
                onChange={(e) => setTaskTopic(e.target.value)}
                className="w-full playful-input h-12"
              />
            </div>
            <button 
              onClick={handleBulkAssign}
              disabled={bulkAssign.isPending}
              className="playful-button bg-playful-yellow text-playful-dark h-12 py-0 text-sm"
            >
              {bulkAssign.isPending ? <Loader2 className="animate-spin" /> : "Ödev Gönder!"}
            </button>
          </div>
          <div className="pt-2 border-t-2 border-dashed border-slate-100 flex items-center gap-2 text-xs font-bold text-muted-foreground">
             <AlertCircle className="w-4 h-4 text-playful-teal" /> Seçili {selectedIds.length} öğrenciye atanacaktır.
          </div>
        </PlayfulCard>
        {/* Student Table */}
        <PlayfulCard className="p-0 overflow-hidden border-4">
          <div className="p-6 border-b-4 border-playful-dark bg-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black">Öğrenci Listesi</h3>
            <button onClick={handleSelectAll} className="text-xs font-black uppercase hover:text-playful-teal transition-colors">
              {selectedIds.length === students?.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b-4 border-playful-dark text-xs font-black uppercase text-muted-foreground">
                  <th className="px-6 py-4 w-12"></th>
                  <th className="px-6 py-4">ÖĞRENCİ</th>
                  <th className="px-6 py-4 text-center">SEVİYE</th>
                  <th className="px-6 py-4 text-center">STREAK</th>
                  <th className="px-6 py-4 text-center">SON NET</th>
                  <th className="px-6 py-4 text-right">DURUM</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-playful-red" /></td></tr>
                ) : students?.map((s) => (
                  <tr 
                    key={s.studentId} 
                    className={cn(
                      "border-b-2 border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group",
                      selectedIds.includes(s.studentId) && "bg-playful-teal/5"
                    )}
                    onClick={() => navigate(`/coach/student/${s.studentId}`)}
                  >
                    <td className="px-6 py-4" onClick={(e) => { e.stopPropagation(); toggleSelect(s.studentId); }}>
                      <div className={cn(
                        "w-6 h-6 border-2 border-playful-dark rounded flex items-center justify-center transition-all",
                        selectedIds.includes(s.studentId) ? "bg-playful-teal text-white" : "bg-white"
                      )}>
                        {selectedIds.includes(s.studentId) && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-playful-dark">{s.email}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="warning">Lvl {s.level}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-playful-red flex items-center justify-center gap-1">
                      🔥 {s.streak}
                    </td>
                    <td className="px-6 py-4 text-center font-black text-playful-dark">
                      {s.latestNet || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {s.lowProgressAlert ? (
                        <div className="flex items-center justify-end gap-2 text-playful-red animate-pulse">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase">Düşük İlerleme</span>
                        </div>
                      ) : (
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
}