import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn, Loader2, User, Users, ShieldCheck, Eye, EyeOff } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const handleLogin = async (e?: React.FormEvent, directEmail?: string, directPass?: string) => {
    if (e) e.preventDefault();
    const loginEmail = (directEmail || email).trim();
    const loginPass = directPass || password;
    if (!loginEmail || !loginPass) {
      toast.error('Lütfen e-posta ve şifrenizi girin.');
      return;
    }
    setLoading(true);
    try {
      await login({ email: loginEmail, password: loginPass });
      // CRITICAL: Get current state after login call for redirection
      const user = useAuth.getState().user;
      if (!user) {
        throw new Error("Giriş yapıldı fakat kullanıcı bilgisi alınamadı.");
      }
      toast.success("KocFlow'a başarıyla giriş yapıldı! 🚀");
      const role = user.role;
      if (role === 'öğrenci') {
        navigate('/dashboard', { replace: true });
      } else if (role === 'koç') {
        navigate('/coach', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };
  const demoLogins = [
    { role: 'Öğrenci', email: 'ogrenci1@kampus.com', icon: User, color: 'bg-playful-teal' },
    { role: 'Koç', email: 'koc@kampus.com', icon: Users, color: 'bg-playful-red' },
    { role: 'Admin', email: 'admin@kampus.com', icon: ShieldCheck, color: 'bg-playful-yellow' },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-playful-yellow p-4 py-12 font-sans">
      <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <PlayfulCard className="bg-white">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-playful-red border-4 border-playful-dark rounded-2xl text-white text-3xl font-black mb-4 shadow-playful hover:rotate-6 transition-transform">
              K
            </Link>
            <h1 className="text-3xl font-black text-playful-dark tracking-tight uppercase">Tekrar Hoş Geldin!</h1>
            <p className="font-bold text-muted-foreground mt-1">KocFlow akışına giriş yap ve yüksel.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-black text-xs uppercase tracking-widest text-playful-dark">E-posta</label>
              <Input
                type="email"
                placeholder="merhaba@kocflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="playful-input h-14 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="font-black text-xs uppercase tracking-widest text-playful-dark">Şifre</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="playful-input h-14 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-playful-teal text-playful-dark font-black text-xl py-8 border-4 border-playful-dark shadow-playful hover:translate-y-[-4px] transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Giriş Yap"}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="font-bold text-muted-foreground">
              Henüz üye değil misin?{' '}
              <Link to="/signup" className="text-playful-red hover:underline font-black">
                Kaydol!
              </Link>
            </p>
          </div>
        </PlayfulCard>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 bg-playful-dark/10 rounded-full" />
            <span className="font-black text-playful-dark/40 uppercase text-[10px] tracking-[0.2em]">Hızlı Erişim (Demo)</span>
            <div className="h-1 flex-1 bg-playful-dark/10 rounded-full" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {demoLogins.map((demo) => (
              <button
                key={demo.email}
                onClick={() => handleLogin(undefined, demo.email, 'demo123')}
                disabled={loading}
                className="flex items-center justify-between p-4 border-4 border-playful-dark rounded-2xl bg-white shadow-playful hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border-2 border-playful-dark ${demo.color}`}>
                    <demo.icon className="w-5 h-5 text-playful-dark" strokeWidth={3} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-playful-dark leading-none">{demo.role} Girişi</p>
                    <p className="text-xs font-bold text-muted-foreground">{demo.email}</p>
                  </div>
                </div>
                <LogIn className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}