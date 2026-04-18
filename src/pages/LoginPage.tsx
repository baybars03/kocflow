import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn, Loader2, User, Users, ShieldCheck } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const handleSubmit = async (e?: React.FormEvent, directEmail?: string, directPassword?: string) => {
    if (e) e.preventDefault();
    const loginEmail = directEmail || email;
    const loginPassword = directPassword || password;
    if (!loginEmail) {
      toast.error('Lütfen e-posta adresinizi girin.');
      return;
    }
    setLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      toast.success('KocFlow\'a giriş yapıldı! Akış başlıyor. 🚀');
      navigate('/');
    } catch (err) {
      toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };
  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    handleSubmit(undefined, demoEmail, 'demo123');
  };
  const demoLogins = [
    { role: 'Öğrenci', email: 'ogrenci1@kampus.com', icon: User, color: 'bg-playful-teal' },
    { role: 'Koç', email: 'koc@kampus.com', icon: Users, color: 'bg-playful-red' },
    { role: 'Admin', email: 'admin@kampus.com', icon: ShieldCheck, color: 'bg-playful-yellow' },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-playful-yellow p-4 py-12 font-sans">
      <div className="w-full max-w-md space-y-8">
        <PlayfulCard className="bg-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-playful-red border-4 border-playful-dark rounded-2xl text-white text-3xl font-black mb-4 shadow-playful">
              K
            </div>
            <h1 className="text-3xl font-black text-playful-dark">Tekrar Hoş Geldin!</h1>
            <p className="font-bold text-muted-foreground">KocFlow akışına giriş yap ve çalışmaya başla.</p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6" noValidate>
            <div className="space-y-2">
              <label className="font-bold text-playful-dark">E-posta Adresi</label>
              <Input
                type="email"
                placeholder="merhaba@kocflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="playful-input h-14"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold text-playful-dark">Şifre</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="playful-input h-14"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-playful-teal text-playful-dark font-black text-xl py-8 border-4 border-playful-dark shadow-playful hover:translate-y-[-4px] hover:shadow-playful-hover transition-all active:translate-y-0"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Giriş Yap <LogIn className="ml-2" />
                </>
              )}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="font-bold text-muted-foreground">
              Hesabın yok mu?{' '}
              <Link to="/signup" className="text-playful-red hover:underline">
                KocFlow'a Katıl!
              </Link>
            </p>
          </div>
        </PlayfulCard>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-1 flex-1 bg-playful-dark/10 rounded-full" />
            <span className="font-black text-playful-dark/40 uppercase text-sm tracking-widest">Hızlı Erişim (Demo)</span>
            <div className="h-1 flex-1 bg-playful-dark/10 rounded-full" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {demoLogins.map((demo) => (
              <button
                key={demo.email}
                onClick={() => handleDemoLogin(demo.email)}
                disabled={loading}
                className={`flex items-center justify-between p-4 border-4 border-playful-dark rounded-2xl bg-white shadow-playful hover:-translate-y-1 hover:shadow-playful-hover active:translate-y-0 active:shadow-playful-active transition-all group`}
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