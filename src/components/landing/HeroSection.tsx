import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Zap, AlarmClock, GraduationCap, ArrowRight } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { TARGET_DATE } from '@shared/mock-tyt-data';
export function HeroSection() {
  const [days, setDays] = useState(0);
  const user = useAuth((s) => s.user);
  const userRole = user?.role;
  const userEmail = user?.email;
  const isLoggedIn = !!user;
  useEffect(() => {
    setDays(Math.max(0, differenceInDays(TARGET_DATE, new Date())));
  }, []);
  const getHeading = () => {
    if (isLoggedIn) return `Tekrar Hoş Geldin, ${userEmail?.split('@')[0] || 'Kaşif'}!`;
    return "Öğrenci Akışını";
  };
  const getPrimaryCTA = () => {
    if (!isLoggedIn) return { label: "KocFlow'a Katıl!", path: "/signup?role=öğrenci", icon: Rocket };
    if (userRole === 'koç') return { label: "Panele Dön", path: "/coach", icon: ArrowRight };
    if (userRole === 'admin') return { label: "Yönetime Git", path: "/admin", icon: Zap };
    return { label: "Akışına Dön", path: "/dashboard", icon: ArrowRight };
  };
  const getSecondaryCTA = () => {
    if (!isLoggedIn || userRole === 'öğrenci') return { label: "Koçları İncele", path: "/marketplace", icon: Zap };
    return { label: "Öğrenci Yönetimi", path: "/coach", icon: GraduationCap };
  };
  const primaryCTA = getPrimaryCTA();
  const secondaryCTA = getSecondaryCTA();
  return (
    <section className="text-center space-y-10 pt-16 md:pt-24 px-4 overflow-hidden relative">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-playful-dark px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.15em] shadow-playful inline-flex items-center gap-3"
        >
          <AlarmClock className="w-5 h-5 text-playful-red" />
          TYT Geri Sayım: {days} Gün
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          {['K-12', 'Üniversite', 'Sınav Hazırlık', 'AI Mentörlük'].map((tag) => (
            <span key={tag} className="bg-playful-yellow border-2 border-playful-dark px-3 py-0.5 rounded-lg text-[10px] font-black shadow-playful-active">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-8xl font-black text-playful-dark tracking-tighter leading-[0.9] uppercase"
      >
        {getHeading()} <br />
        {!isLoggedIn && <span className="text-playful-teal drop-shadow-[3px_3px_0px_#1e293b]">KocFlow İle Yönet!</span>}
      </motion.h1>
      <p className="text-lg md:text-2xl font-bold text-muted-foreground max-w-2xl mx-auto leading-tight">
        Türkiye'nin en gelişmiş <span className="text-playful-dark underline decoration-playful-red decoration-4 underline-offset-2">AI destekli</span> rehberlik ve koçluk ekosistemi.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
        <Link
          to={primaryCTA.path}
          className="playful-button bg-playful-red text-white text-2xl md:text-3xl py-6 md:py-8 px-10 md:px-14 group min-w-[280px]"
        >
          {primaryCTA.label} <primaryCTA.icon className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-2" />
        </Link>
        <Link
          to={secondaryCTA.path}
          className="playful-button bg-playful-yellow text-playful-dark text-lg md:text-xl py-5 md:py-6 px-8 md:px-10 group min-w-[240px]"
        >
          {secondaryCTA.label} <secondaryCTA.icon className="w-5 h-5 fill-playful-dark text-playful-dark group-hover:scale-110 transition-transform ml-2" />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 pt-10 opacity-40 grayscale">
         <div className="flex items-center gap-2 font-black text-xs uppercase"><GraduationCap className="w-4 h-4" /> Uzman Koç Ağı</div>
         <div className="flex items-center gap-2 font-black text-xs uppercase"><Zap className="w-4 h-4" /> AI Destekli Planlar</div>
      </div>
    </section>
  );
}