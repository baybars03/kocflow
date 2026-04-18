import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, TrendingUp, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
interface PlayfulLayoutProps {
  children: React.ReactNode;
}
export function PlayfulLayout({ children }: PlayfulLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const navItems = user?.role === 'öğrenci' ? [
    { label: 'Kampüs', path: '/', icon: Home, color: 'hover:bg-playful-teal' },
    { label: 'Görevler', path: '/tasks', icon: ClipboardList, color: 'hover:bg-playful-red' },
    { label: 'Netlerim', path: '/progress', icon: TrendingUp, color: 'hover:bg-playful-yellow' },
  ] : [
    { label: 'Ana Sayfa', path: '/', icon: Home, color: 'hover:bg-playful-teal' },
  ];
  return (
    <div className="min-h-screen bg-playful-bg">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-playful-dark px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black text-playful-dark flex items-center gap-2">
              <div className="w-8 h-8 bg-playful-red border-2 border-playful-dark rounded-lg flex items-center justify-center text-white">
                T
              </div>
              <span className="hidden sm:inline">TYT KAMPÜS</span>
            </Link>
            {user && (
              <span className="px-2 py-0.5 bg-playful-dark text-white text-[10px] font-black rounded uppercase border-2 border-playful-dark">
                {user.role}
              </span>
            )}
          </div>
          <div className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-transparent font-bold transition-all",
                  location.pathname === item.path
                    ? "bg-playful-dark text-white border-playful-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                    : cn("text-playful-dark", item.color)
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
              className="p-2 md:px-4 md:py-2 rounded-xl border-2 border-playful-dark bg-white font-bold text-playful-dark hover:bg-playful-red hover:text-white transition-all flex items-center gap-2"
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