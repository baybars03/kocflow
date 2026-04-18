import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import type { UserRole } from '@shared/types';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const user = useAuth((s) => s.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-playful-bg p-4">
        <div className="playful-card bg-white p-8 text-center max-w-md">
          <h2 className="text-3xl font-black text-playful-dark mb-4">Erişim Yok! 🛑</h2>
          <p className="font-bold text-muted-foreground mb-6">
            Bu sayfayı görüntülemek için yeterli yetkiniz bulunmuyor.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }
  return <>{children}</>;
}