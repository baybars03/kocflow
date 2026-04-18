import React from 'react';
import { Bell, Check, Sparkles, MessageCircle, Info } from 'lucide-react';
import { useNotifications } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
export function NotificationTray() {
  const userId = useAuth((s) => s.user?.id);
  const { data: notifications, markAsRead } = useNotifications(userId);
  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'streak': return <Sparkles className="w-4 h-4 text-playful-yellow" />;
      case 'chat': return <MessageCircle className="w-4 h-4 text-playful-teal" />;
      case 'task': return <Check className="w-4 h-4 text-playful-red" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-xl border-2 border-playful-dark bg-white shadow-playful-active hover:-translate-y-0.5 transition-all">
          <Bell className="w-5 h-5 text-playful-dark" strokeWidth={3} />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-playful-red text-white border-2 border-playful-dark rounded-full text-[10px] font-black flex items-center justify-center animate-bounce"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-4 border-playful-dark rounded-[1.5rem] shadow-playful bg-white z-[100] mr-4">
        <div className="p-4 border-b-4 border-playful-dark bg-slate-50 flex items-center justify-between">
          <h3 className="font-black uppercase text-xs tracking-widest">Bildirimler</h3>
          {unreadCount > 0 && (
            <span className="text-[10px] font-black bg-playful-teal text-white px-2 py-0.5 rounded border border-playful-dark">
              {unreadCount} YENİ
            </span>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications && notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "p-4 border-b-2 border-slate-100 flex gap-3 transition-colors",
                  !n.read ? "bg-playful-yellow/5" : "opacity-60"
                )}
              >
                <div className="mt-1 flex-shrink-0">
                  {getTypeIcon(n.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-black leading-none">{n.title}</p>
                  <p className="text-xs font-bold text-muted-foreground leading-tight">{n.message}</p>
                  <p className="text-[9px] font-black uppercase text-slate-300">
                    {formatDistanceToNow(n.createdAt, { addSuffix: true, locale: tr })}
                  </p>
                </div>
                {!n.read && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => markAsRead.mutate(n.id)}
                    className="flex-shrink-0 self-center p-1 hover:bg-playful-teal hover:text-white rounded border border-slate-200 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                  </motion.button>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-2">
              <Bell className="w-12 h-12 text-slate-200 mx-auto" strokeWidth={1} />
              <p className="font-black text-slate-300 text-sm">Henüz bildirim yok!</p>
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-50 border-t-2 border-playful-dark/10 text-center">
          <button className="text-[10px] font-black uppercase text-playful-teal hover:underline">
            Tümünü Gör
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}