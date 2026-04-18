import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Zap, AlarmClock } from 'lucide-react';
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-playful-dark px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.15em] shadow-playful inline-flex items-center gap-3"
        >
          <AlarmClock className="w-5 h-5 text-playful-red" />
          TYT 2025'e Son {days} Gün
        </motion.div>
      </div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-8xl font-black text-playful-dark tracking-tighter leading-[0.9] uppercase"
      >
        TYT'yi Oyun Yap, <br />
        <span className="text-playful-teal drop-shadow-[3px_3px_0px_#1e293b]">Kazanmaya Başla!</span>
      </motion.h1>
      <p className="text-lg md:text-2xl font-bold text-muted-foreground max-w-2xl mx-auto leading-tight">
        Netlerini yapay zeka ve profesyonel koçlarla <span className="text-playful-dark underline decoration-playful-red decoration-4 underline-offset-2">zirveye taşı</span>. TYT artık bir stres değil, bir başarı hikayesi!
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
        <Link
          to="/signup"
          className="playful-button bg-playful-red text-white text-2xl md:text-3xl py-6 md:py-8 px-10 md:px-14 group min-w-[280px]"
        >
          Hemen Başla! <Rocket className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-2" />
        </Link>
        <Link
          to="/quiz"
          className="playful-button bg-playful-yellow text-playful-dark text-lg md:text-xl py-5 md:py-6 px-8 md:px-10 group min-w-[240px]"
        >
          Deneme Çöz <Zap className="w-5 h-5 fill-playful-dark text-playful-dark group-hover:scale-110 transition-transform ml-2" />
        </Link>
      </div>
    </section>
  );
}