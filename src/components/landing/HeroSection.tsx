import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Zap, AlarmClock, Star } from 'lucide-react';
import { differenceInDays } from 'date-fns';
const TARGET_DATE = new Date('2025-06-14');
export function HeroSection() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    setDays(differenceInDays(TARGET_DATE, new Date()));
  }, []);
  return (
    <section className="text-center space-y-10 pt-16 md:pt-24 px-4 overflow-hidden relative">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: [0, -2, 2, -2, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-playful-yellow border-4 border-playful-dark px-8 py-3 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-playful inline-flex items-center gap-3"
        >
          <AlarmClock className="w-5 h-5" />
          TYT 2025'e Son {days} Gün!
        </motion.div>
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="bg-playful-red text-white border-4 border-playful-dark px-4 py-1 rounded-lg font-black text-xs uppercase shadow-playful-active z-10"
        >
          Acele Et! Bugün 100 Bedava Deneme Slotu Kaldı! 🚨
        </motion.div>
      </div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl md:text-9xl font-black text-playful-dark tracking-tighter leading-[0.85] uppercase"
      >
        TYT'yi Oyun Yap, <br />
        <span className="text-playful-teal drop-shadow-[4px_4px_0px_#1e293b]">Kazan!</span>
      </motion.h1>
      <p className="text-xl md:text-3xl font-bold text-muted-foreground max-w-3xl mx-auto leading-tight">
        Netlerini yapay zeka ve profesyonel koçlarla <span className="text-playful-dark underline decoration-playful-red decoration-4">zirveye taşı</span>. TYT artık bir stres değil, bir oyun alanı!
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4 relative">
        <Link
          to="/signup"
          className="playful-button bg-playful-red text-white text-3xl py-8 px-12 group"
        >
          Hemen Başla! <Rocket className="w-10 h-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
        </Link>
        <Link
          to="/quiz"
          className="playful-button bg-playful-yellow text-playful-dark text-xl py-6 px-10 relative"
        >
          Hemen Deneme Çöz! <Zap className="w-6 h-6 fill-playful-dark text-playful-dark" />
          <motion.div 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute -top-3 -right-3 bg-white border-2 border-playful-dark rounded-full p-1"
          >
            <Star className="w-4 h-4 fill-playful-red text-playful-red" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}