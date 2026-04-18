import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { ShieldCheck, Users, Mail, UserPlus, Loader2, Activity } from 'lucide-react';
import type { User as UserType } from '@shared/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
export function AdminDashboard() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => api<UserType[]>('/api/admin/users'),
  });
  const stats = {
    total: users?.length || 0,
    students: users?.filter(u => u.role === 'öğrenci').length || 0,
    coaches: users?.filter(u => u.role === 'koç').length || 0,
  };
  const handleSuspend = (email: string) => {
    toast.warning(`${email} adlı kullanıcı askıya alındı.`, {
      description: "Bu işlem şu an için sadece görsel bir simülasyondur.",
    });
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-playful-dark">
            Admin Paneli 🛡️
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            Platformdaki tüm kullanıcıları ve sistem durumunu yönet.
          </p>
        </div>
        <div className="flex gap-4">
           <PlayfulCard className="bg-playful-yellow py-2 px-4 flex items-center gap-2 border-playful-dark shadow-playful">
             <Activity className="w-5 h-5" strokeWidth={3} />
             <span className="font-black text-sm">SİSTEM AKTİF</span>
           </PlayfulCard>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlayfulCard className="bg-white flex items-center gap-4">
          <div className="p-4 bg-playful-teal/20 rounded-2xl">
            <Users className="w-8 h-8 text-playful-teal" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Toplam Kullanıcı</p>
            <h3 className="text-3xl font-black">{stats.total}</h3>
          </div>
        </PlayfulCard>
        <PlayfulCard className="bg-white flex items-center gap-4">
          <div className="p-4 bg-playful-red/20 rounded-2xl">
            <UserPlus className="w-8 h-8 text-playful-red" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Öğrenciler</p>
            <h3 className="text-3xl font-black">{stats.students}</h3>
          </div>
        </PlayfulCard>
        <PlayfulCard className="bg-white flex items-center gap-4">
          <div className="p-4 bg-playful-yellow/20 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-playful-yellow" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Koçlar</p>
            <h3 className="text-3xl font-black">{stats.coaches}</h3>
          </div>
        </PlayfulCard>
      </div>
      <PlayfulCard className="bg-white p-0 overflow-hidden border-4">
        <div className="p-6 border-b-4 border-playful-dark bg-slate-50">
          <h3 className="text-xl font-black flex items-center gap-2">
            <Users className="w-6 h-6" /> Kullanıcı Listesi
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b-4 border-playful-dark">
                <th className="px-6 py-4 font-black text-sm uppercase">Kullanıcı</th>
                <th className="px-6 py-4 font-black text-sm uppercase">Rol</th>
                <th className="px-6 py-4 font-black text-sm uppercase">ID</th>
                <th className="px-6 py-4 font-black text-sm uppercase">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-playful-teal mx-auto" />
                  </td>
                </tr>
              ) : users?.map((user) => (
                <tr key={user.id} className="border-b-2 border-slate-100 hover:bg-playful-teal/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg border-2 border-playful-dark bg-slate-100 flex items-center justify-center font-bold text-xs uppercase">
                        {user.email.charAt(0)}
                      </div>
                      <span className="font-bold">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-playful-dark",
                      user.role === 'öğrenci' ? "bg-playful-teal" : user.role === 'koç' ? "bg-playful-red" : "bg-playful-yellow"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{user.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleSuspend(user.email)}
                      className="text-xs font-black hover:bg-playful-red hover:text-white border-2 border-transparent hover:border-playful-dark px-2 py-1 rounded transition-all"
                    >
                      ASKIYA AL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PlayfulCard>
    </div>
  );
}