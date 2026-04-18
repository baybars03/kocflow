import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { ShieldCheck, Users, Mail, UserPlus, Loader2, Activity, Trash2, Crown, UserCircle2, FileDown, Shield } from 'lucide-react';
import type { User as UserType } from '@shared/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAdminAnalytics, useUpdateUser, useDeleteUser } from '@/hooks/use-tyt-api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1e293b'];
export function AdminDashboard() {
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => api<UserType[]>('/api/admin/users'),
  });
  const { data: analytics, isLoading: analyticsLoading } = useAdminAnalytics();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const stats = {
    total: users?.length || 0,
    students: users?.filter(u => u.role === 'öğrenci').length || 0,
    coaches: users?.filter(u => u.role === 'koç').length || 0,
  };
  const handleRoleToggle = (user: UserType) => {
    const nextRole = user.role === 'öğrenci' ? 'koç' : 'öğrenci';
    updateUser.mutate({ id: user.id, role: nextRole }, {
      onSuccess: () => toast.success(`Kullanıcı rolü ${nextRole} olarak güncellendi!`)
    });
  };
  const handleDelete = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => toast.error("Kullanıcı sistemden başarıyla silindi.")
    });
  };
  const handleExport = () => {
    window.print();
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="py-8 md:py-10 lg:py-12 space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between no-print">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-playful-dark">Komuta Merkezi 🛡️</h1>
            <p className="text-lg font-bold text-muted-foreground">Platform genel durumu ve kullanıcı yönetimi.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleExport} className="p-4 border-4 border-playful-dark rounded-xl bg-white shadow-playful hover:translate-y-[-2px] transition-all">
               <FileDown className="w-6 h-6" />
            </button>
            <PlayfulCard className="bg-playful-yellow py-3 px-6 flex items-center gap-3 border-playful-dark shadow-playful">
              <Activity className="w-6 h-6 animate-pulse" strokeWidth={3} />
              <span className="font-black text-lg uppercase tracking-tighter">SİSTEM AKTİF</span>
            </PlayfulCard>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print-section">
          <PlayfulCard className="h-80 bg-white">
            <h3 className="font-black text-xl mb-4 flex items-center gap-2">
              <Activity className="text-playful-red" /> Kullanıcı Artış Trendi
            </h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={analytics?.totalGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.1} strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </PlayfulCard>
          <PlayfulCard className="h-80 bg-white">
            <h3 className="font-black text-xl mb-4 flex items-center gap-2">
              <Crown className="text-playful-yellow" /> En Popüler Branşlar
            </h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={analytics?.popularTasks}>
                <XAxis dataKey="subject" />
                <Tooltip />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {analytics?.popularTasks.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#1e293b" strokeWidth={2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </PlayfulCard>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print-section">
          <div className="playful-card bg-playful-teal text-white p-4 text-center">
            <p className="text-[10px] font-black uppercase">Retention</p>
            <p className="text-3xl font-black">%{analytics?.retentionRate || 0}</p>
          </div>
          <div className="playful-card bg-playful-red text-white p-4 text-center">
            <p className="text-[10px] font-black uppercase">Öğrenciler</p>
            <p className="text-3xl font-black">{stats.students}</p>
          </div>
          <div className="playful-card bg-playful-yellow text-playful-dark p-4 text-center">
            <p className="text-[10px] font-black uppercase">Aktif Seans</p>
            <p className="text-3xl font-black">{analytics?.activeSessions || 0}</p>
          </div>
          <div className="playful-card bg-playful-dark text-white p-4 text-center">
            <p className="text-[10px] font-black uppercase">Koçlar</p>
            <p className="text-3xl font-black">{stats.coaches}</p>
          </div>
        </div>
        <PlayfulCard className="p-0 overflow-hidden border-4 bg-white print-section">
          <div className="p-6 border-b-4 border-playful-dark bg-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2"><Users className="w-6 h-6" /> Kullanıcı Listesi</h3>
            <div className="flex gap-2 no-print">
               <span className="flex items-center gap-1 text-[10px] font-black text-muted-foreground uppercase"><Crown className="w-4 h-4 text-playful-yellow fill-current" /> Premium Statüsü</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b-4 border-playful-dark">
                  <th className="px-6 py-4 font-black text-sm">KULLANICI</th>
                  <th className="px-6 py-4 font-black text-sm text-center">ROL</th>
                  <th className="px-6 py-4 font-black text-sm text-center">PREMIUM</th>
                  <th className="px-6 py-4 font-black text-sm text-right no-print">EYLEMLER</th>
                </tr>
              </thead>
              <tbody>
                {usersLoading ? (
                  <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-playful-teal" /></td></tr>
                ) : users?.map((user) => (
                  <tr key={user.id} className="border-b-2 border-slate-100 hover:bg-playful-teal/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl border-2 border-playful-dark flex items-center justify-center font-black relative overflow-hidden",
                          user.isPremium ? "bg-playful-yellow" : "bg-slate-100"
                        )}>
                          {user.email.charAt(0).toUpperCase()}
                          {user.role === 'admin' && (
                            <div className="absolute top-0 right-0 p-0.5 bg-playful-dark">
                              <Shield className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold leading-none">{user.email}</p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-1">{user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.role === 'admin' ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark bg-playful-dark text-white">
                          ADMIN
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRoleToggle(user)}
                          disabled={updateUser.isPending}
                          className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark transition-all hover:scale-105 active:scale-95",
                            user.role === 'öğrenci' ? "bg-playful-teal text-white" : "bg-playful-red text-white"
                          )}
                        >
                          {user.role}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "inline-block p-2 rounded-lg border-2 border-playful-dark transition-all",
                        user.isPremium ? "bg-playful-yellow shadow-playful-active" : "bg-white text-slate-200 border-slate-200"
                      )}>
                        <Crown className={cn("w-5 h-5", user.isPremium && "fill-current")} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right no-print">
                      {user.role !== 'admin' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <button className="p-2 text-playful-red hover:bg-playful-red hover:text-white rounded-lg transition-all">
                               <Trash2 className="w-5 h-5" />
                             </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-4 border-playful-dark rounded-[2rem]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl font-black">Kullanıcıyı Sil?</AlertDialogTitle>
                              <AlertDialogDescription className="font-bold">Bu işlem geri alınamaz. Kullanıcının tüm verileri kalıcı olarak silinecektir.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="playful-button bg-white text-playful-dark">İptal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(user.id)} className="playful-button bg-playful-red text-white">Evet, Sil</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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