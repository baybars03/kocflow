import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, ArrowRight, X } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { cn } from '@/lib/utils';
interface RoleSelectionPopupProps {
  onSelect: (role: 'öğrenci' | 'koç') => void;
  onClose: () => void;
}
export function RoleSelectionPopup({ onSelect, onClose }: RoleSelectionPopupProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-playful-dark/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-2xl"
      >
        <PlayfulCard className="bg-white p-8 md:p-12 relative border-4 border-playful-dark shadow-[8px_8px_0px_0px_rgba(30,41,59,1)]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-playful-dark/40 hover:text-playful-dark"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-playful-dark">
              KocFlow'a Hoş Geldin! 👋
            </h2>
            <p className="font-bold text-muted-foreground text-lg">
              Sana en iyi deneyimi sunabilmemiz için kim olduğunu seç:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onSelect('öğrenci')}
              className="group relative flex flex-col items-center gap-4 p-8 border-4 border-playful-dark rounded-[2rem] bg-playful-teal text-white shadow-playful hover:-translate-y-2 hover:shadow-playful-hover active:translate-y-0 transition-all"
            >
              <div className="w-20 h-20 bg-white rounded-2xl border-4 border-playful-dark flex items-center justify-center text-playful-teal rotate-3 group-hover:rotate-6 transition-transform">
                <GraduationCap className="w-10 h-10" strokeWidth={3} />
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black uppercase italic">Öğrenciyim</span>
                <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Hedefim Başarı</span>
              </div>
            </button>
            <button
              onClick={() => onSelect('koç')}
              className="group relative flex flex-col items-center gap-4 p-8 border-4 border-playful-dark rounded-[2rem] bg-playful-red text-white shadow-playful hover:-translate-y-2 hover:shadow-playful-hover active:translate-y-0 transition-all"
            >
              <div className="w-20 h-20 bg-white rounded-2xl border-4 border-playful-dark flex items-center justify-center text-playful-red -rotate-3 group-hover:-rotate-6 transition-transform">
                <Users className="w-10 h-10" strokeWidth={3} />
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black uppercase italic">Koçum</span>
                <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Eğitim Veriyorum</span>
              </div>
            </button>
          </div>
          <div className="mt-10 text-center">
            <a 
              href="/marketplace"
              className="inline-flex items-center gap-2 font-black text-muted-foreground hover:text-playful-dark transition-colors"
            >
              Sadece Gözatmak İstiyorum <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </PlayfulCard>
      </motion.div>
    </div>
  );
}