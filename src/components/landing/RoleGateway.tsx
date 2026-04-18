import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
interface RoleGatewayProps {
  onSelect: (role: 'öğrenci' | 'koç') => void;
}
export function RoleGateway({ onSelect }: RoleGatewayProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-playful-yellow flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 space-y-4"
      >
        <div className="inline-block bg-playful-red border-4 border-playful-dark p-4 rounded-2xl shadow-playful text-white text-4xl font-black mb-4">
          K
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-playful-dark tracking-tighter uppercase leading-none">
          KOCFLOW'A <br /> HOŞ GELDİN!
        </h1>
        <p className="text-xl font-bold text-playful-dark/70">Senin için en iyi akışı hazırlayabilmemiz için rolünü seç.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <PlayfulCard 
            onClick={() => onSelect('öğrenci')}
            className="group cursor-pointer bg-white h-full hover:bg-playful-teal hover:text-white transition-all duration-300 p-10 flex flex-col items-center text-center space-y-6 border-8"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-playful-teal rounded-[2rem] border-4 border-playful-dark flex items-center justify-center shadow-playful group-hover:bg-white group-hover:text-playful-teal transition-colors">
                <GraduationCap className="w-12 h-12" strokeWidth={3} />
              </div>
              <div className="absolute -top-4 -right-4 bg-playful-yellow text-playful-dark px-3 py-1 rounded-full border-2 border-playful-dark font-black text-[10px] uppercase shadow-playful-active rotate-12">
                Yapay Zeka Destekli
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tight">ÖĞRENCİYİM</h2>
              <p className="font-bold opacity-80 text-lg">Netlerimi artırmak, AI Koç ile çalışmak ve hedefimi kazanmak istiyorum.</p>
            </div>
            <div className="pt-4 w-full">
              <div className="playful-button w-full bg-playful-dark text-white group-hover:bg-white group-hover:text-playful-dark">
                Akışa Başla <ArrowRight className="ml-2 w-6 h-6" />
              </div>
            </div>
          </PlayfulCard>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PlayfulCard 
            onClick={() => onSelect('koç')}
            className="group cursor-pointer bg-white h-full hover:bg-playful-red hover:text-white transition-all duration-300 p-10 flex flex-col items-center text-center space-y-6 border-8"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-playful-red rounded-[2rem] border-4 border-playful-dark flex items-center justify-center shadow-playful group-hover:bg-white group-hover:text-playful-red transition-colors">
                <Users className="w-12 h-12" strokeWidth={3} />
              </div>
              <div className="absolute -top-4 -right-4 bg-playful-dark text-white px-3 py-1 rounded-full border-2 border-white font-black text-[10px] uppercase shadow-playful-active -rotate-12">
                Yönetim Paneli
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tight">KOÇUM</h2>
              <p className="font-bold opacity-80 text-lg">Öğrencilerimi yönetmek, gelişimlerini takip etmek ve portföyümü büyütmek istiyorum.</p>
            </div>
            <div className="pt-4 w-full">
              <div className="playful-button w-full bg-playful-dark text-white group-hover:bg-white group-hover:text-playful-dark">
                Sisteme Katıl <ShieldCheck className="ml-2 w-6 h-6" />
              </div>
            </div>
          </PlayfulCard>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex items-center gap-2 text-playful-dark/40 font-black text-xs uppercase tracking-widest"
      >
        <Sparkles className="w-4 h-4 fill-current" />
        Türkiye'nin En Playful Sınav Platformu
      </motion.div>
    </div>
  );
}