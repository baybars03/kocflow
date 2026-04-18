import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAuth } from '@/hooks/use-auth';
import { User, Shield, CreditCard, LogOut, ChevronRight, Settings, Star, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
export function ProfilePage() {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  if (!user) return null;
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-playful-dark">Hesabım 👤</h1>
        <p className="text-lg font-bold text-muted-foreground">KocFlow deneyimini yönet.</p>
      </div>
      <PlayfulCard className="bg-white border-playful-dark shadow-playful p-0 overflow-hidden">
        <div className="p-8 border-b-4 border-playful-dark bg-slate-50 flex items-center gap-6">
          <div className="w-20 h-20 bg-playful-yellow rounded-[2rem] border-4 border-playful-dark flex items-center justify-center text-3xl font-black shadow-playful-active">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black">{user.email}</h2>
            <div className="flex gap-2">
              <Badge variant="playful" className="uppercase">{user.role}</Badge>
              {user.isPremium && <Badge variant="warning" className="gap-1"><Crown className="w-3 h-3 fill-current" /> PREMIUM</Badge>}
            </div>
          </div>
        </div>
        <div className="divide-y-2 divide-slate-100">
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="font-black text-xl flex items-center gap-2">
              <Settings className="w-5 h-5 text-playful-red" /> Hesap Detayları
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Kullanıcı ID</p>
                <p className="font-bold text-slate-400 font-mono text-sm">{user.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Kayıt Tarihi</p>
                <p className="font-bold">Mayıs 2024</p>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="font-black text-xl flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-playful-teal" /> Abonelik & Ödeme
            </h3>
            <div className={cn(
              "p-6 rounded-2xl border-4 border-playful-dark shadow-playful-active flex flex-col md:flex-row items-center justify-between gap-6",
              user.isPremium ? "bg-playful-yellow" : "bg-white"
            )}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl border-2 border-playful-dark">
                  <Star className={cn("w-6 h-6", user.isPremium ? "text-playful-yellow fill-current" : "text-slate-200")} />
                </div>
                <div>
                  <p className="font-black text-lg">
                    {user.isPremium ? "Premium Paket Aktif" : "Ücretsiz Paket"}
                  </p>
                  <p className="text-sm font-bold opacity-70">
                    {user.isPremium ? "Tüm özelliklere sınırsız erişimin var!" : "Kısıtlı özellikleri kullanıyorsun."}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/marketplace')} 
                className={cn(
                  "playful-button py-2 px-6 text-sm",
                  user.isPremium ? "bg-white" : "bg-playful-teal text-white"
                )}
              >
                {user.isPremium ? "Yönet" : "Hemen Yükselt"}
              </button>
            </div>
          </div>
          <div className="p-8 flex justify-between items-center bg-slate-50">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 font-black text-playful-red hover:underline transition-all"
            >
              <LogOut className="w-5 h-5" /> Çıkış Yap
            </button>
            <p className="text-[10px] font-black text-muted-foreground uppercase">KocFlow v1.2.0-stable</p>
          </div>
        </div>
      </PlayfulCard>
    </div>
  );
}