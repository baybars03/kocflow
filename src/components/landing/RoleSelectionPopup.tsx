import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Sparkles } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { cn } from '@/lib/utils';
interface RoleSelectionPopupProps {
  onSelect: (role: 'öğrenci' | 'koç') => void;
}
export function RoleSelectionPopup({ onSelect }: RoleSelectionPopupProps) {
  return (
    <div className="fixed inset-0 bg-playful-teal z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full flex flex-col items-center gap-12 py-12"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-playful-red border-4 border-playful-dark rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-playful mx-auto"
          >
            K
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-playful-dark tracking-tighter uppercase italic drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            KOCFLOW'A HOŞ GELDİN!
          </h1>
          <p className="text-xl md:text-2xl font-black text-playful-dark/60 uppercase tracking-widest">
            Senin rolün hangisi?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => onSelect('öğrenci')}
            className="cursor-pointer group"
          >
            <PlayfulCard className="bg-playful-yellow border-[8px] border-playful-dark shadow-[12px_12px_0px_0px_rgba(30,41,59,1)] hover:shadow-[20px_20px_0px_0px_rgba(30,41,59,1)] transition-all hover:-translate-y-2 h-full flex flex-col items-center justify-center p-12 gap-6">
              <div className="p-6 bg-white border-4 border-playful-dark rounded-[2rem] shadow-playful-active group-hover:rotate-6 transition-transform">
                <GraduationCap className="w-16 h-16 text-playful-teal" strokeWidth={3} />
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-black text-playful-dark uppercase mb-2">ÖĞRENCİ</h2>
                <p className="font-bold text-playful-dark/70 leading-tight">Hedeflerine koşan, AI destekli akışla netlerini artıran şampiyon.</p>
              </div>
              <div className="mt-4 px-6 py-2 bg-playful-dark text-white rounded-full font-black text-sm uppercase flex items-center gap-2">
                Hemen Başla <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </PlayfulCard>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => onSelect('koç')}
            className="cursor-pointer group"
          >
            <PlayfulCard className="bg-playful-red border-[8px] border-playful-dark shadow-[12px_12px_0px_0px_rgba(30,41,59,1)] hover:shadow-[20px_20px_0px_0px_rgba(30,41,59,1)] transition-all hover:-translate-y-2 h-full flex flex-col items-center justify-center p-12 gap-6">
              <div className="p-6 bg-white border-4 border-playful-dark rounded-[2rem] shadow-playful-active group-hover:-rotate-6 transition-transform">
                <Users className="w-16 h-16 text-playful-red" strokeWidth={3} />
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-black text-white uppercase mb-2">EĞİTMEN / KOÇ</h2>
                <p className="font-bold text-white/80 leading-tight">Öğrencilerine rehberlik eden, portföyünü dijitalle büyüten lider.</p>
              </div>
              <div className="mt-4 px-6 py-2 bg-white text-playful-dark rounded-full font-black text-sm uppercase flex items-center gap-2">
                Sisteme Katıl <Sparkles className="w-4 h-4 fill-playful-red text-playful-red" />
              </div>
            </PlayfulCard>
          </motion.div>
        </div>
        <p className="text-sm font-black text-playful-dark/40 uppercase tracking-widest mt-8">
          KocFlow Ecosystem v1.2 • Sınav Hazırlıkta Yeni Nesil
        </p>
      </motion.div>
    </div>
  );
}