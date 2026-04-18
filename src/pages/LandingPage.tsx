import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { RoleGateway } from '@/components/landing/RoleGateway';
import { StudentLandingView } from '@/components/landing/StudentLandingView';
import { CoachLandingView } from '@/components/landing/CoachLandingView';
export function LandingPage() {
  const isHydrated = useAuth((s) => s.isHydrated);
  const userId = useAuth((s) => s.user?.id);
  const isLoggedIn = !!userId;
  const [activeFunnel, setActiveFunnel] = useState<'öğrenci' | 'koç' | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedFunnel = localStorage.getItem('kocflow-funnel-pref') as 'öğrenci' | 'koç' | null;
    if (savedFunnel) {
      setActiveFunnel(savedFunnel);
    }
  }, []);
  const handleRoleSelect = (role: 'öğrenci' | 'koç') => {
    localStorage.setItem('kocflow-funnel-pref', role);
    setActiveFunnel(role);
  };
  const handleResetFunnel = () => {
    localStorage.removeItem('kocflow-funnel-pref');
    setActiveFunnel(null);
    window.scrollTo(0, 0);
  };
  if (!isHydrated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-playful-bg">
        <div className="w-16 h-16 bg-playful-teal border-4 border-playful-dark rounded-2xl animate-bounce shadow-playful flex items-center justify-center text-white text-3xl font-black">
          K
        </div>
        <p className="font-black text-playful-dark tracking-tighter uppercase animate-pulse">Akış Hazırlanıyor...</p>
      </div>
    );
  }
  // If user is logged in, we show the student view by default as a "marketing" landing, 
  // but if they aren't logged in and haven't chosen, show the gateway.
  if (!isLoggedIn && !activeFunnel) {
    return <RoleGateway onSelect={handleRoleSelect} />;
  }
  // Default to student if somehow both are null but user is logged in
  const currentRole = activeFunnel || 'öğrenci';
  return (
    <div className="animate-in fade-in duration-700">
      {currentRole === 'öğrenci' ? (
        <StudentLandingView onSwitch={handleResetFunnel} />
      ) : (
        <CoachLandingView onSwitch={handleResetFunnel} />
      )}
    </div>
  );
}