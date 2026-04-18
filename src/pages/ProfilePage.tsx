import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAuth } from '@/hooks/use-auth';
import { useCoaches } from '@/hooks/use-tyt-api';
import { User, Shield, CreditCard, LogOut, ChevronRight, Settings, Star, Crown, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
export function ProfilePage() {
  const navigate = useNavigate();
  // Adhering to strict primitive selector pattern
  const userEmail = useAuth((s) => s.user?.email);
  const userRole = useAuth((s) => s.user?.role);
  const userId = useAuth((s) => s.user?.id);
  const isPremium = useAuth((s) => s.user?.isPremium);
  const assignedCoachId = useAuth((s) => s.user?.assignedCoachId);
  const logout = useAuth((s) => s.logout);
  const { data: coaches } = useCoaches();

  const assignedCoach = React.useMemo(() => {
    if (!coaches || !assignedCoachId) return null;
    return coaches.find((c) => c.id === assignedCoachId);
  }, [coaches, assignedCoachId]);

  if (!userId) return null;
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
            {userEmail?.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black">{userEmail}</h2>
            <div className="flex gap-2">
              <Badge variant="playful" className="uppercase">{userRole}</Badge>
              {isPremium && <Badge variant="warning" className="gap-1"><Crown className="w-3 h-3 fill-current" /> PREMIUM</Badge>}
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
                <p className="font-bold text-slate-400 font-mono text-sm">{userId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Kayıt Tarihi</p>
                <p className="font-bold">Mayıs 2024</p>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="font-black text-xl flex items-center gap-2">
              <Shield className="w-5 h-5 text-playful-teal" /> Koçluk Durumu
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl border-4 border-playful-dark flex items-center justify-between gap-4 shadow-playful-active">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl border-2 border-playful-dark flex items-center justify-center">
                  <Users className="text-playful-dark w-6 h-6" />
                </div>
                <div>
                  <p className="font-black">{assignedCoach ? assignedCoach.displayName : "Koç Atanmadı"}</p>
                  <p className="text-xs font-bold text-muted-foreground">{assignedCoach ? "Birebir rehberliğin aktif" : "KocFlow maratonunda rehberini seç"}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(assignedCoach ? '/messages' : '/marketplace')}
                className="playful-button bg-white text-xs py-2 px-4"
              >
                {assignedCoach ? "Mesaj At" : "Koç Bul"}
              </button>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="font-black text-xl flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-playful-teal" /> Abonelik & Ödeme
            </h3>
            <div className={cn(
              "p-6 rounded-2xl border-4 border-playful-dark shadow-playful-active flex flex-col md:flex-row items-center justify-between gap-6",
              isPremium ? "bg-playful-yellow" : "bg-white"
            )}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl border-2 border-playful-dark">
                  <Crown className={cn("w-6 h-6", isPremium ? "text-playful-yellow fill-current animate-bounce" : "text-slate-200")} />
                </div>
                <div>
                  <p className="font-black text-lg">
                    {isPremium ? "Premium Paket Aktif" : "Ücretsiz Paket"}
                  </p>
                  <p className="text-sm font-bold opacity-70">
                    {isPremium ? "Tüm özelliklere sınırsız erişimin var!" : "Kısıtlı özellikleri kullanıyorsun."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/marketplace')}
                className={cn(
                  "playful-button py-2 px-6 text-sm",
                  isPremium ? "bg-white" : "bg-playful-teal text-white"
                )}
              >
                {isPremium ? "Yönet" : "Hemen Yükselt"}
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