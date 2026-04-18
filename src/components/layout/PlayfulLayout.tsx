import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, TrendingUp, LogOut, HelpCircle, ShoppingBag, LogIn, UserPlus, User, ShieldCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NotificationTray } from './NotificationTray';
interface PlayfulLayoutProps {
  children: React.ReactNode;
}
export function PlayfulLayout({ children }: PlayfulLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useAuth((s) => s.user?.id);
  const userRole = useAuth((s) => s.user?.role);
  const userEmail = useAuth((s) => s.user?.email);
  const isPremium = useAuth((s) => s.user?.isPremium);
  const logout = useAuth((s) => s.logout);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const isLoggedIn = !!userId;
  const getNavItems = () => {
    if (!isLoggedIn) {
      return [
        { label: 'Market', path: '/marketplace', icon: ShoppingBag, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal text-white' },
      ];
    }
    if (userRole === 'öğrenci') {
      return [
        { label: 'Akış', path: '/dashboard', icon: Home, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal text-white' },
        { label: 'Görevler', path: '/tasks', icon: ClipboardList, color: 'hover:bg-playful-red', activeColor: 'bg-playful-red text-white' },
        { label: 'Netlerim', path: '/progress', icon: TrendingUp, color: 'hover:bg-playful-yellow', activeColor: 'bg-playful-yellow text-playful-dark' },
        { label: 'Market', path: '/marketplace', icon: ShoppingBag, color: 'hover:bg-slate-100', activeColor: 'bg-playful-dark text-white' },
        { label: 'Profil', path: '/profile', icon: User, color: 'hover:bg-slate-100', activeColor: 'bg-slate-200 text-playful-dark' },
      ];
    }
    if (userRole === 'koç') {
      return [
        { label: 'Panel', path: '/coach', icon: Home, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal text-white' },
        { label: 'Market', path: '/marketplace', icon: ShoppingBag, color: 'hover:bg-playful-red', activeColor: 'bg-playful-red text-white' },
        { label: 'Profil', path: '/profile', icon: User, color: 'hover:bg-slate-100', activeColor: 'bg-slate-200 text-playful-dark' },
      ];
    }
    if (userRole === 'admin') {
      return [
        { label: 'Admin', path: '/admin', icon: ShieldCheck, color: 'hover:bg-playful-dark hover:text-white', activeColor: 'bg-playful-dark text-white' },
        { label: 'Market', path: '/marketplace', icon: ShoppingBag, color: 'hover:bg-playful-red', activeColor: 'bg-playful-red text-white' },
        { label: 'Profil', path: '/profile', icon: User, color: 'hover:bg-slate-100', activeColor: 'bg-slate-200 text-playful-dark' },
      ];
    }
    return [];
  };
  const getRoleHelp = () => {
    if (!isLoggedIn) return 'KocFlow ile kendine bir koç seç ve başarıya ulaş!';
    switch (userRole) {
      case 'öğrenci': return isPremium ? 'Premium Avantajın Aktif! ✨' : 'KocFlow ile görevlerini takip et.';
      case 'koç': return 'Rehberlik ettiğin öğrencileri KocFlow üzerinden yönet.';
      case 'admin': return 'KocFlow sistemini yönetiyorsun.';
      default: return '';
    }
  };
  const navItems = getNavItems();
  return (
    <div className="min-h-screen bg-playful-bg flex flex-col font-sans overflow-x-hidden">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-playful-dark px-4 py-3 sm:px-6 lg:px-8 shadow-sm no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={isLoggedIn ? (userRole === 'öğrenci' ? '/dashboard' : userRole === 'koç' ? '/coach' : '/admin') : '/'} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-playful-red border-4 border-playful-dark rounded-xl flex items-center justify-center text-white shadow-playful hover:scale-105 transition-all">
                K
              </div>
              <span className="hidden sm:inline font-black text-2xl text-playful-dark tracking-tighter uppercase italic">KOCFLOW</span>
            </Link>
            <div className="flex items-center gap-2">
              {isLoggedIn && (
                <span className={cn(
                  "px-2 py-0.5 text-[9px] font-black rounded uppercase border-2 border-playful-dark flex items-center gap-1",
                  userRole === 'öğrenci' ? "bg-playful-teal text-white" : userRole === 'koç' ? "bg-playful-red text-white" : "bg-playful-yellow text-playful-dark"
                )}>
                  {userRole} {isPremium && <Star className="w-2 h-2 fill-current" />}
                </span>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-playful-dark/30 hover:text-playful-dark cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent className="border-4 border-playful-dark bg-white font-bold p-3 rounded-xl shadow-playful z-[100]">
                    <p className="text-playful-dark">{getRoleHelp()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="hidden lg:flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-transparent font-black transition-all",
                  location.pathname === item.path
                    ? item.activeColor + " border-playful-dark shadow-playful"
                    : cn("text-playful-dark", item.color, "hover:shadow-playful hover:-translate-y-0.5 hover:border-playful-dark")
                )}
              >
                <item.icon className="w-4 h-4" strokeWidth={3} />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn && <NotificationTray />}
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Link to="/login" className="px-4 py-2 border-2 border-playful-dark rounded-xl font-black hover:bg-slate-50 transition-colors">
                  Giriş
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-playful-teal text-white border-2 border-playful-dark rounded-xl font-black shadow-playful hover:-translate-y-1 transition-all">
                  Kaydol
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="p-2 lg:px-4 lg:py-2 rounded-xl border-2 border-playful-dark bg-white font-black text-playful-dark hover:bg-playful-red hover:text-white transition-all shadow-playful active:shadow-none active:translate-y-1"
              >
                <LogOut className="w-5 h-5 lg:w-4 lg:h-4" strokeWidth={3} />
                <span className="hidden lg:inline ml-2">Çıkış</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-32 md:pb-12">
        {children}
      </main>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-playful-dark z-[50] px-2 py-4 flex justify-around items-center no-print shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 active:scale-90",
              location.pathname === item.path
                ? cn("border-2 border-playful-dark shadow-playful-active", item.activeColor)
                : "text-playful-dark/50"
            )}
          >
            <item.icon className="w-6 h-6" strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}