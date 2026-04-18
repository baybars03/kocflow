import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
interface PlayfulLayoutProps {
  children: React.ReactNode;
}
export function PlayfulLayout({ children }: PlayfulLayoutProps) {
  const location = useLocation();
  const navItems = [
    { label: 'Kampüs', path: '/', icon: Home, color: 'hover:bg-playful-teal' },
    { label: 'Görevler', path: '/tasks', icon: ClipboardList, color: 'hover:bg-playful-red' },
    { label: 'Netlerim', path: '/progress', icon: TrendingUp, color: 'hover:bg-playful-yellow' },
  ];
  return (
    <div className="min-h-screen bg-playful-bg">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-playful-dark px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-playful-dark flex items-center gap-2">
            <div className="w-8 h-8 bg-playful-red border-2 border-playful-dark rounded-lg flex items-center justify-center text-white">
              T
            </div>
            TYT KAMPÜS
          </Link>
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
          <div className="md:hidden flex gap-2">
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
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        {children}
      </main>
    </div>
  );
}