import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import type { UserRole } from '@shared/types';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  // Strict primitive selectors
  const userId = useAuth((s) => s.user?.id);
  const userRole = useAuth((s) => s.user?.role);
  const isHydrated = useAuth((s) => s.isHydrated);
  const location = useLocation();
  // Wait for persistence hydration to avoid premature redirection
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-playful-bg p-4">
        <Loader2 className="w-12 h-12 animate-spin text-playful-teal mb-4" />
        <p className="font-black text-playful-dark uppercase tracking-widest animate-pulse">Oturum Açılıyor...</p>
      </div>
    );
  }
  if (!userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-playful-bg p-4">
        <PlayfulCard className="bg-white p-8 text-center max-w-md border-playful-red">
          <div className="w-20 h-20 bg-playful-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-playful-red" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-playful-dark mb-4">Erişim Yok! 🛑</h2>
          <p className="font-bold text-muted-foreground mb-8">
            Bu sayfayı görüntülemek için "{userRole}" yetkisi yeterli değil.
          </p>
          <Link
            to="/"
            className="playful-button bg-playful-teal w-full text-white"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
            Ana Sayfaya Dön
          </Link>
        </PlayfulCard>
      </div>
    );
  }
  return <>{children}</>;
}