import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { RoleSelectionPopup } from '@/components/landing/RoleSelectionPopup';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleResetFunnel = () => {
    localStorage.removeItem('kocflow-funnel-pref');
    setActiveFunnel(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  // Primary gateway for unauthenticated users without a saved preference
  if (!isLoggedIn && !activeFunnel) {
    return <RoleSelectionPopup onSelect={handleRoleSelect} />;
  }
  // Transition to specific views based on funnel
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