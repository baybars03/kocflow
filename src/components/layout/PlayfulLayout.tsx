import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, TrendingUp, LogOut, Users, Settings, HelpCircle, ShoppingBag, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface PlayfulLayoutProps {
  children: React.ReactNode;
}
export function PlayfulLayout({ children }: PlayfulLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = useAuth((s) => s.user?.role);
  const userEmail = useAuth((s) => s.user?.email);
  const logout = useAuth((s) => s.logout);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const isDemo = userEmail?.includes('kampus.com') || userEmail?.includes('kocflow.com');
  const isLoggedIn = !!userEmail;
  const getNavItems = () => {
    if (!isLoggedIn) {
      return [
        { label: 'Market', path: '/marketplace', icon: ShoppingBag, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal' },
      ];
    }
    if (userRole === 'öğrenci') {
      return [
        { label: 'Akış', path: '/dashboard', icon: Home, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal' },
        { label: 'Market', path: '/marketplace', icon: ShoppingBag, color: 'hover:bg-playful-red', activeColor: 'bg-playful-red' },
        { label: 'Görevler', path: '/tasks', icon: ClipboardList, color: 'hover:bg-playful-red', activeColor: 'bg-playful-red' },
        { label: 'Netlerim', path: '/progress', icon: TrendingUp, color: 'hover:bg-playful-yellow', activeColor: 'bg-playful-yellow text-playful-dark' },
      ];
    }
    if (userRole === 'koç') {
      return [
        { label: 'Panel', path: '/coach', icon: Home, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal' },
      ];
    }
    if (userRole === 'admin') {
      return [
        { label: 'Panel', path: '/admin', icon: Home, color: 'hover:bg-playful-teal', activeColor: 'bg-playful-teal' },
        { label: 'Yönetim', path: '/admin', icon: Settings, color: 'hover:bg-playful-yellow', activeColor: 'bg-playful-yellow text-playful-dark' },
      ];
    }
    return [];
  };
  const getRoleHelp = () => {
    if (!isLoggedIn) return 'KocFlow Marketplace üzerinden kendine bir koç seçerek başarıya ulaş!';
    switch (userRole) {
      case 'öğrenci': return 'KocFlow ile görevlerini ve netlerini takip et.';
      case 'koç': return 'Rehberlik ettiğin öğrencileri KocFlow üzerinden yönet.';
      case 'admin': return 'KocFlow sistemini ve kullanıcıları yönet.';
      default: return '';
    }
  };
  const navItems = getNavItems();
  return (
    <div className="min-h-screen bg-playful-bg flex flex-col font-sans">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-playful-dark px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={isLoggedIn ? (userRole === 'öğrenci' ? '/dashboard' : userRole === 'koç' ? '/coach' : '/admin') : '/'} className="text-2xl font-black text-playful-dark flex items-center gap-2">
              <div className="w-10 h-10 bg-playful-red border-4 border-playful-dark rounded-xl flex items-center justify-center text-white shadow-playful hover:scale-105 transition-transform">
                K
              </div>
              <span className="hidden sm:inline tracking-tighter">KOCFLOW</span>
            </Link>
            <div className="flex items-center gap-1">
              {isLoggedIn && (
                <span className={cn(
                  "px-2 py-0.5 text-[10px] font-black rounded uppercase border-2 border-playful-dark",
                  userRole === 'öğrenci' ? "bg-playful-teal text-white" : userRole === 'koç' ? "bg-playful-red text-white" : "bg-playful-yellow text-playful-dark",
                  isDemo && "animate-pulse"
                )}>
                  {userRole}
                </span>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-playful-dark/30 hover:text-playful-dark cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent className="border-4 border-playful-dark bg-white font-bold p-3 rounded-xl shadow-playful">
                    <p className="text-playful-dark">{getRoleHelp()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-transparent font-bold transition-all",
                  location.pathname === item.path
                    ? "bg-playful-dark text-white border-playful-dark shadow-playful"
                    : cn("text-playful-dark", item.color, "hover:shadow-playful hover:-translate-y-0.5 hover:border-playful-dark")
                )}
              >
                <item.icon className="w-5 h-5" strokeWidth={3} />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Link to="/login" className="px-4 py-2 border-2 border-playful-dark rounded-xl font-black hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> <span className="hidden sm:inline">Giriş</span>
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-playful-teal text-white border-2 border-playful-dark rounded-xl font-black shadow-playful hover:-translate-y-1 transition-all flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> <span className="hidden sm:inline">Kaydol</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="p-2 md:px-4 md:py-2 rounded-xl border-2 border-playful-dark bg-white font-bold text-playful-dark hover:bg-playful-red hover:text-white transition-all flex items-center gap-2 shadow-playful active:shadow-none active:translate-y-1"
              >
                <LogOut className="w-5 h-5" strokeWidth={3} />
                <span className="hidden md:inline">Çıkış</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 pb-24 md:pb-12">
        {children}
      </main>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-playful-dark z-50 px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200",
              location.pathname === item.path
                ? cn("border-2 border-playful-dark shadow-playful-active", item.activeColor || "bg-playful-dark text-white")
                : "text-playful-dark/60"
            )}
          >
            <item.icon className="w-6 h-6" strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 p-2 rounded-xl text-playful-red/60"
          >
            <LogOut className="w-6 h-6" strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Çıkış</span>
          </button>
        )}
      </nav>
    </div>
  );
}