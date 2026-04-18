import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, TrendingUp, LogOut, Users, Settings, HelpCircle } from 'lucide-react';
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
  const isDemo = userEmail?.includes('kampus.com');
  const getNavItems = () => {
    if (userRole === 'öğrenci') {
      return [
        { label: 'Kampüs', path: '/', icon: Home, color: 'hover:bg-playful-teal' },
        { label: 'Görevler', path: '/tasks', icon: ClipboardList, color: 'hover:bg-playful-red' },
        { label: 'Netlerim', path: '/progress', icon: TrendingUp, color: 'hover:bg-playful-yellow' },
      ];
    }
    if (userRole === 'koç') {
      return [
        { label: 'Panel', path: '/', icon: Home, color: 'hover:bg-playful-teal' },
        { label: 'Öğrencilerim', path: '/coach', icon: Users, color: 'hover:bg-playful-red' },
      ];
    }
    if (userRole === 'admin') {
      return [
        { label: 'Panel', path: '/', icon: Home, color: 'hover:bg-playful-teal' },
        { label: 'Yönetim', path: '/admin', icon: Settings, color: 'hover:bg-playful-yellow' },
      ];
    }
    return [];
  };
  const getRoleHelp = () => {
    switch (userRole) {
      case 'öğrenci': return 'Görevlerini ve netlerini takip edebilirsin.';
      case 'koç': return 'Rehberlik ettiğin öğrencileri yönetebilirsin.';
      case 'admin': return 'Tüm sistemi ve kullanıcıları yönetebilirsin.';
      default: return '';
    }
  };
  const navItems = getNavItems();
  return (
    <div className="min-h-screen bg-playful-bg">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-playful-dark px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-2xl font-black text-playful-dark flex items-center gap-2">
              <div className="w-10 h-10 bg-playful-red border-4 border-playful-dark rounded-xl flex items-center justify-center text-white shadow-playful hover:scale-105 transition-transform">
                T
              </div>
              <span className="hidden sm:inline tracking-tighter">TYT KAMPÜS</span>
            </Link>
            <div className="flex items-center gap-1">
              <span className={cn(
                "px-2 py-0.5 text-[10px] font-black rounded uppercase border-2 border-playful-dark",
                userRole === 'öğrenci' ? "bg-playful-teal text-white" : userRole === 'koç' ? "bg-playful-red text-white" : "bg-playful-yellow text-playful-dark",
                isDemo && "animate-pulse"
              )}>
                {userRole}
              </span>
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
            <div className="md:hidden flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "p-2 rounded-lg border-2 border-playful-dark",
                    location.pathname === item.path ? "bg-playful-dark text-white" : "bg-white"
                  )}
                >
                  <item.icon className="w-5 h-5" strokeWidth={3} />
                </Link>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 md:px-4 md:py-2 rounded-xl border-2 border-playful-dark bg-white font-bold text-playful-dark hover:bg-playful-red hover:text-white transition-all flex items-center gap-2 shadow-playful active:shadow-none active:translate-y-1"
            >
              <LogOut className="w-5 h-5" strokeWidth={3} />
              <span className="hidden md:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        {children}
      </main>
    </div>
  );
}