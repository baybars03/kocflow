import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Zap, AlarmClock, GraduationCap, ArrowRight, UserPlus, Play, Sparkles } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { TARGET_DATE } from '@shared/mock-tyt-data';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
interface HeroSectionProps {
  funnel?: 'öğrenci' | 'koç' | null;
}
export function HeroSection({ funnel }: HeroSectionProps) {
  const [days, setDays] = useState(0);
  const user = useAuth((s) => s.user);
  const userRole = user?.role;
  const userEmail = user?.email;
  const isLoggedIn = !!user;
  useEffect(() => {
    setDays(Math.max(0, differenceInDays(TARGET_DATE, new Date())));
  }, []);
  const getHeading = () => {
    if (isLoggedIn) return `Hoş Geldin, ${userEmail?.split('@')[0] || 'Kaşif'}!`;
    if (funnel === 'koç') return "Kariyerini KocFlow İle";
    return "Öğrenci Akışını";
  };
  const getSubHeading = () => {
    if (isLoggedIn) return "Akışına kalmış yerden devam et.";
    if (funnel === 'koç') return "Geleceğin şampiyonlarına rehberlik et, işini dijitalleştir.";
    return "Türkiye'nin en gelişmiş AI destekli rehberlik ve koçluk ekosistemi.";
  };
  const getPrimaryCTA = () => {
    if (!isLoggedIn) {
      if (funnel === 'koç') return { label: "Koç Olarak Katıl", path: "/signup?role=koç", icon: UserPlus };
      return { label: "Hemen Başla", path: "/signup?role=öğrenci", icon: Rocket };
    }
    if (userRole === 'koç') return { label: "Panele Dön", path: "/coach", icon: ArrowRight };
    if (userRole === 'admin') return { label: "Yönetime Git", path: "/admin", icon: Zap };
    return { label: "Akışına Dön", path: "/dashboard", icon: ArrowRight };
  };
  const getSecondaryCTA = () => {
    if (!isLoggedIn) {
      if (funnel === 'koç') return { label: "Sistemi İncele", path: "/marketplace", icon: Zap };
      return { label: "Koç Ara", path: "/marketplace", icon: Zap };
    }
    return { label: "Marketplace", path: "/marketplace", icon: Zap };
  };
  const primaryCTA = getPrimaryCTA();
  const secondaryCTA = getSecondaryCTA();
  return (
    <section className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-12 overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        <div className="space-y-10">
          <div className="flex flex-col items-center lg:items-start gap-6">
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
              {['K-12', 'Sınav Hazırlık', 'AI Mentörlük'].map((tag) => (
                <span key={tag} className="bg-playful-yellow border-2 border-playful-dark px-3 py-0.5 rounded-lg text-[10px] font-black shadow-playful-active">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="space-y-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl xl:text-8xl font-black text-playful-dark tracking-tighter leading-[0.9] uppercase"
            >
              {getHeading()} <br />
              {!isLoggedIn && (
                <span className="text-playful-teal drop-shadow-[3px_3px_0px_#1e293b]">
                  {funnel === 'koç' ? "KOCFLOW İLE BÜYÜT!" : "KOCFLOW İLE YÖNET!"}
                </span>
              )}
            </motion.h1>
            <p className="text-lg md:text-2xl font-bold text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-tight">
              {getSubHeading()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center pt-4">
            <Link
              to={primaryCTA.path}
              className="playful-button bg-playful-red text-white text-2xl md:text-3xl py-6 md:py-8 px-10 md:px-14 group w-full sm:w-auto"
            >
              {primaryCTA.label} <primaryCTA.icon className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-2" />
            </Link>
            <Link
              to={secondaryCTA.path}
              className="playful-button bg-playful-yellow text-playful-dark text-lg md:text-xl py-5 md:py-6 px-8 md:px-10 group w-full sm:w-auto"
            >
              {secondaryCTA.label} <secondaryCTA.icon className="w-5 h-5 fill-playful-dark text-playful-dark group-hover:scale-110 transition-transform ml-2" />
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-playful-yellow/20 rounded-[3rem] rotate-3 border-4 border-playful-dark border-dashed" />
          <PlayfulCard className="p-0 overflow-hidden relative border-4 border-playful-dark shadow-playful aspect-video lg:aspect-[4/3]">
            <img 
              src={funnel === 'koç' ? "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80" : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"} 
              alt="KocFlow Preview" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-playful-dark/10 flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileActive={{ scale: 0.9 }}
                className="w-24 h-24 bg-white border-4 border-playful-dark rounded-full flex items-center justify-center shadow-playful text-playful-red group-hover:bg-playful-red group-hover:text-white transition-colors"
              >
                <Play className="w-10 h-10 fill-current ml-2" />
              </motion.button>
            </div>
            {/* Animated Badges Overlay */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-6 left-6 bg-white border-2 border-playful-dark px-4 py-2 rounded-xl shadow-playful flex items-center gap-2"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-black text-xs uppercase">10k+ Aktif Öğrenci</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-6 right-6 bg-playful-teal border-2 border-playful-dark px-4 py-2 rounded-xl shadow-playful flex items-center gap-2 text-white"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="font-black text-xs uppercase">AI Mentörlük Aktif</span>
            </motion.div>
          </PlayfulCard>
        </div>
      </div>
      <div className="flex items-center justify-center lg:justify-start gap-10 pt-20 opacity-40 grayscale flex-wrap">
         <div className="flex items-center gap-2 font-black text-sm uppercase tracking-tighter"><GraduationCap className="w-5 h-5" /> Uzman Koç Ağı</div>
         <div className="flex items-center gap-2 font-black text-sm uppercase tracking-tighter"><Zap className="w-5 h-5" strokeWidth={3} /> AI Destekli Planlar</div>
      </div>
    </section>
  );
}