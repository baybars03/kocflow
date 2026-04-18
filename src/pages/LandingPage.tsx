import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { PopularCoaches } from '@/components/landing/PopularCoaches';
import { PracticeQuizPreview } from '@/components/landing/PracticeQuizPreview';
import { TestimonialCarousel } from '@/components/landing/TestimonialCarousel';
import { AIKocFeature } from '@/components/landing/AIKocFeature';
import { StudentLandingTeaser } from '@/components/landing/StudentLandingTeaser';
import { CoachLandingTeaser } from '@/components/landing/CoachLandingTeaser';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Link } from 'react-router-dom';
import { Zap, Target, Trophy, MessageSquare, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function LandingPage() {
  const isHydrated = useAuth((s) => s.isHydrated);
  const userRole = useAuth((s) => s.user?.role);
  const userEmail = useAuth((s) => s.user?.email);
  const isLoggedIn = !!userEmail;
  if (!isHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-playful-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="space-y-16 md:space-y-24 pb-32 overflow-x-hidden">
      <HeroSection />
      <AnimatePresence mode="wait">
        {isLoggedIn && userRole === 'öğrenci' && (
          <motion.div
            key="student-teaser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <StudentLandingTeaser />
          </motion.div>
        )}
        {isLoggedIn && userRole === 'koç' && (
          <motion.div
            key="coach-teaser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CoachLandingTeaser />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4">
        <StatsSection />
      </div>
      {!isLoggedIn && <PracticeQuizPreview />}
      <PopularCoaches />
      <AIKocFeature />
      <section className="space-y-16 py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Neden KocFlow? 🤔</h2>
          <p className="font-bold text-muted-foreground text-lg md:text-xl">Sadece bir uygulama değil, senin başarı akışın.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Kişiselleştirilmiş", desc: "Eksiklerini analiz eder, en verimli rotayı saniyeler içinde çizer.", icon: Zap, color: "bg-playful-red" },
            { title: "Birebir Destek", desc: "Seçtiğin uzman koçla hedeflerini her hafta masaya yatır ve akışta kal.", icon: Target, color: "bg-playful-teal" },
            { title: "Flow Atla!", desc: "Puan topla, rütbe kazan, eğitimi bir yük olarak değil oyun olarak gör.", icon: Trophy, color: "bg-playful-yellow" },
          ].map((f, i) => (
            <PlayfulCard key={i} className="bg-white space-y-6 group border-playful-dark shadow-playful hover:-translate-y-2 transition-all">
              <div className={`${f.color} w-16 h-16 rounded-2xl border-4 border-playful-dark flex items-center justify-center text-white shadow-playful group-hover:rotate-6 transition-transform`}>
                <f.icon className="w-8 h-8" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black">{f.title}</h3>
              <p className="font-bold text-muted-foreground text-lg leading-relaxed">{f.desc}</p>
            </PlayfulCard>
          ))}
        </div>
      </section>
      <TestimonialCarousel />
      <PricingSection />
      <section className="px-4 max-w-6xl mx-auto">
        <PlayfulCard className="bg-playful-dark text-white p-12 md:p-20 text-center space-y-10 border-playful-dark shadow-playful relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-playful-red/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-playful-teal/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Başarı Akışına <br />
              <span className="text-playful-yellow underline decoration-playful-yellow decoration-4 underline-offset-8">Bugün Katıl!</span>
            </h2>
            <p className="text-lg md:text-xl font-bold text-white/70 max-w-2xl mx-auto">
              Binlerce öğrenci ve uzman koç KocFlow ile zirveye yürüyor.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link to="/signup?role=öğrenci" className="playful-button bg-playful-teal text-white text-xl py-5 px-10 group">
              Öğrenci Olarak Katıl <Rocket className="w-6 h-6 group-hover:animate-bounce ml-2" />
            </Link>
            <Link to="/signup?role=koç" className="playful-button bg-playful-red text-white text-xl py-5 px-10">
              Koç Olarak Katıl <MessageSquare className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </PlayfulCard>
      </section>
      <footer className="pt-20 border-t-8 border-playful-dark text-center space-y-8 px-4">
        <div className="text-4xl font-black tracking-tighter uppercase italic bg-playful-yellow border-4 border-playful-dark inline-block px-6 py-2 shadow-playful">KOCFLOW</div>
        <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center font-black text-lg uppercase tracking-tighter text-muted-foreground">
          <Link to="/marketplace" className="hover:text-playful-red transition-colors">Marketplace</Link>
          <Link to="/login" className="hover:text-playful-teal transition-colors">Giriş Yap</Link>
          <Link to="/signup" className="hover:text-playful-yellow transition-colors">Hemen Kaydol</Link>
          <Link to="/" className="hover:text-playful-dark transition-colors">Destek</Link>
        </div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest pb-10">
          © 2025 KocFlow. Tüm hakları saklıdır. 🚀 Akışta kal, başarıya ulaş.
        </p>
      </footer>
    </div>
  );
}