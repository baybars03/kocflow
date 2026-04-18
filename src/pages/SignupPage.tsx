import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { UserPlus, Loader2, GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import type { UserRole } from '@shared/types';
import { cn } from '@/lib/utils';
export function SignupPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('öğrenci');
  const [loading, setLoading] = useState(false);
  const signup = useAuth((s) => s.signup);
  const navigate = useNavigate();
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'öğrenci' || roleParam === 'koç' || roleParam === 'admin') {
      setRole(roleParam as UserRole);
    }
  }, [searchParams]);
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Lütfen bir e-posta adresi girin.');
      return;
    }
    setLoading(true);
    try {
      await signup({ email, role });
      toast.success('Hesabın oluşturuldu! KocFlow akışına hoş geldin. ✨');
      navigate('/');
    } catch (err) {
      toast.error('Kayıt başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };
  const roles = [
    { id: 'öğrenci' as UserRole, label: 'Öğrenci', icon: GraduationCap, color: 'bg-playful-teal' },
    { id: 'koç' as UserRole, label: 'Koç', icon: Users, color: 'bg-playful-red' },
    { id: 'admin' as UserRole, label: 'Admin', icon: ShieldCheck, color: 'bg-playful-yellow' },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-playful-teal p-4 py-12 font-sans">
      <div className="w-full max-w-2xl space-y-8">
        <PlayfulCard className="bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-playful-dark">KocFlow'a Katıl! 🎓</h1>
            <p className="font-bold text-muted-foreground">Yeni bir hesap oluştur ve hedeflerine doğru ak.</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-8" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "cursor-pointer border-4 border-playful-dark rounded-2xl p-4 transition-all flex flex-col items-center gap-2",
                    role === r.id ? cn(r.color, "shadow-none translate-y-1") : "bg-white shadow-playful hover:-translate-y-1"
                  )}
                >
                  <r.icon className="w-8 h-8" strokeWidth={3} />
                  <span className="font-black">{r.label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-bold">E-posta Adresi</label>
                <Input
                  type="email"
                  placeholder="basarili@kocflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="playful-input h-14"
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Şifre Belirle</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="playful-input h-14"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-playful-yellow text-playful-dark font-black text-xl py-8 border-4 border-playful-dark shadow-playful hover:translate-y-[-4px] hover:shadow-playful-hover transition-all active:translate-y-0"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Akışı Başlat <UserPlus className="ml-2" />
                </>
              )}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="font-bold text-muted-foreground">
              Zaten hesabın var mı?{' '}
              <Link to="/login" className="text-playful-teal hover:underline font-black">
                Giriş Yap!
              </Link>
            </p>
          </div>
        </PlayfulCard>
        <PlayfulCard className="bg-playful-dark text-white border-playful-dark flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-white rotate-3">
              <Users className="text-playful-dark w-6 h-6" strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-black text-lg leading-none">Keşfetmek Mi İstiyorsun?</h4>
              <p className="text-sm font-medium text-white/70">KocFlow'u hemen incele.</p>
            </div>
          </div>
          <Link
            to="/marketplace"
            className="flex items-center gap-2 bg-playful-yellow text-playful-dark px-4 py-2 rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 transition-all"
          >
            Marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </PlayfulCard>
      </div>
    </div>
  );
}