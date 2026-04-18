import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ArrowRight, X, Sparkles } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
interface RoleSelectionPopupProps {
  onSelect: (role: 'öğrenci' | 'koç') => void;
  onClose: () => void;
}
export function RoleSelectionPopup({ onSelect, onClose }: RoleSelectionPopupProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-playful-yellow overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 border-8 border-playful-dark border-dashed rounded-full opacity-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-playful-red rounded-full opacity-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl relative z-10"
      >
        <PlayfulCard className="bg-white p-8 md:p-16 relative border-8 border-playful-dark shadow-[12px_12px_0px_0px_rgba(30,41,59,1)]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 hover:bg-slate-100 rounded-2xl transition-all text-playful-dark hover:rotate-90"
          >
            <X className="w-8 h-8" strokeWidth={3} />
          </button>
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 bg-playful-dark text-white px-4 py-1 rounded-full font-black text-xs uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-4 h-4 fill-playful-yellow text-playful-yellow" /> KocFlow'a Hoş Geldin
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-playful-dark leading-none">
              SENİN AKIŞIN <br />
              <span className="text-playful-red">HANGİSİ?</span>
            </h2>
            <p className="font-bold text-muted-foreground text-xl md:text-2xl max-w-xl mx-auto">
              Deneyimi kişiselleştirmek için tarafını seç.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <button
              onClick={() => onSelect('öğrenci')}
              className="group relative flex flex-col items-center gap-6 p-10 md:p-14 border-8 border-playful-dark rounded-[3rem] bg-playful-teal text-white shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] hover:-translate-y-3 hover:shadow-[12px_12px_0px_0px_rgba(30,41,59,1)] active:translate-y-0 transition-all overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-white/20" />
              <div className="w-24 h-24 bg-white rounded-[2rem] border-4 border-playful-dark flex items-center justify-center text-playful-teal rotate-6 group-hover:rotate-12 transition-transform shadow-playful">
                <GraduationCap className="w-12 h-12" strokeWidth={3} />
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black uppercase italic tracking-tighter">ÖĞRENCİYİM</span>
                <span className="text-sm font-black opacity-80 uppercase tracking-widest mt-2 block">Hedefim TYT Başarısı</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest mt-4">
                AI Koç & Mini Denemeler
              </div>
            </button>
            <button
              onClick={() => onSelect('koç')}
              className="group relative flex flex-col items-center gap-6 p-10 md:p-14 border-8 border-playful-dark rounded-[3rem] bg-playful-red text-white shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] hover:-translate-y-3 hover:shadow-[12px_12px_0px_0px_rgba(30,41,59,1)] active:translate-y-0 transition-all overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-white/20" />
              <div className="w-24 h-24 bg-white rounded-[2rem] border-4 border-playful-dark flex items-center justify-center text-playful-red -rotate-6 group-hover:-rotate-12 transition-transform shadow-playful">
                <Users className="w-12 h-12" strokeWidth={3} />
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black uppercase italic tracking-tighter">KOÇUM</span>
                <span className="text-sm font-black opacity-80 uppercase tracking-widest mt-2 block">Eğitmen / Danışmanım</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest mt-4">
                Öğrenci Yönetim Paneli
              </div>
            </button>
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => onSelect('öğrenci')}
              className="inline-flex items-center gap-2 font-black text-muted-foreground hover:text-playful-dark transition-colors uppercase tracking-widest text-sm"
            >
              ŞİMDİLİK GEÇ VE GÖZAT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </PlayfulCard>
      </motion.div>
    </div>
  );
}