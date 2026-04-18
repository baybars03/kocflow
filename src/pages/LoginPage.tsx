import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogIn, Loader2 } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await login({ email });
      toast.success('Giriş yapıldı! Hoş geldin. 🚀');
      navigate('/');
    } catch (err) {
      toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-playful-yellow p-4">
      <PlayfulCard className="w-full max-w-md bg-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-playful-red border-4 border-playful-dark rounded-2xl text-white text-3xl font-black mb-4">
            T
          </div>
          <h1 className="text-3xl font-black text-playful-dark">Tekrar Hoş Geldin!</h1>
          <p className="font-bold text-muted-foreground">Kampüse giriş yap ve çalışmaya başla.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-bold text-playful-dark">E-posta Adresi</label>
            <Input
              type="email"
              placeholder="ogrenci@kampus.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="playful-input h-14"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold text-playful-dark">Şifre</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="playful-input h-14"
              required
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
              Hemen Kaydol!
            </Link>
          </p>
        </div>
      </PlayfulCard>
    </div>
  );
}