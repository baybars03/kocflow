import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { SponsorsSection } from '@/components/landing/SponsorsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { PopularCoaches } from '@/components/landing/PopularCoaches';
import { PracticeQuizPreview } from '@/components/landing/PracticeQuizPreview';
import { TestimonialCarousel } from '@/components/landing/TestimonialCarousel';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Link } from 'react-router-dom';
import { Zap, Target, Trophy, MessageSquare, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
export function LandingPage() {
  const { data: stats } = useQuery({
    queryKey: ['landing-stats'],
    queryFn: () => api<{ activeStudents: number, totalTasksDone: number, avgNetIncrease: number }>('/api/landing/stats'),
  });
  return (
    <div className="space-y-16 md:space-y-24 pb-32">
      {/* 1. HERO - Hook */}
      <HeroSection />
      {/* 2. TRUST - Sponsors (Immediate Validation) */}
      <SponsorsSection />
      {/* 3. PROOF - Stats */}
      <div className="max-w-7xl mx-auto px-4">
        <StatsSection stats={stats} />
      </div>
      {/* 4. ENGAGEMENT - Practice Quiz Teaser */}
      <PracticeQuizPreview />
      {/* 5. VALUE PROP - Features */}
      <section className="space-y-16 py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Neden TYT Kampüs? 🤔</h2>
          <p className="font-bold text-muted-foreground text-lg md:text-xl">Sadece bir uygulama değil, bir ekosistem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Yapay Zeka Koçu", desc: "Eksiklerini saniyeler içinde analiz eder, en verimli rotayı çizer.", icon: Zap, color: "bg-playful-red" },
            { title: "Birebir Destek", desc: "Seçtiğin uzman koçla hedeflerini her hafta masaya yatır.", icon: Target, color: "bg-playful-teal" },
            { title: "Lvl Atla!", desc: "Puan topla, rütbe kazan, sınavı bir yük olarak değil oyun olarak gör.", icon: Trophy, color: "bg-playful-yellow" },
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
      {/* 6. SOCIAL PROOF - Testimonials */}
      <TestimonialCarousel />
      {/* 7. MARKETPLACE PREVIEW */}
      <PopularCoaches />
      {/* 8. PRICING */}
      <PricingSection />
      {/* 9. FINAL CTA */}
      <section className="px-4 max-w-6xl mx-auto">
        <PlayfulCard className="bg-playful-dark text-white p-12 md:p-20 text-center space-y-10 border-playful-dark shadow-playful relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-playful-red/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-playful-teal/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Başarı Hikayene <br />
              <span className="text-playful-yellow underline decoration-playful-yellow decoration-4 underline-offset-8">Bugün Başla!</span>
            </h2>
            <p className="text-lg md:text-xl font-bold text-white/70 max-w-2xl mx-auto">
              Binlerce öğrenci arasına katıl, TYT maratonunda yalnız kalma.
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
      {/* FOOTER */}
      <footer className="pt-20 border-t-8 border-playful-dark text-center space-y-8 px-4">
        <div className="text-4xl font-black tracking-tighter uppercase italic bg-playful-yellow border-4 border-playful-dark inline-block px-6 py-2 shadow-playful">TYT KAMPÜS</div>
        <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center font-black text-lg uppercase tracking-tighter text-muted-foreground">
          <Link to="/marketplace" className="hover:text-playful-red transition-colors">Marketplace</Link>
          <Link to="/login" className="hover:text-playful-teal transition-colors">Giriş Yap</Link>
          <Link to="/signup" className="hover:text-playful-yellow transition-colors">Hemen Kaydol</Link>
          <Link to="/" className="hover:text-playful-dark transition-colors">Yardım</Link>
        </div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest pb-10">
          © 2024 TYT Kampüs. Tüm hakları saklıdır. 🚀 Başarıya giden en kısa yol.
        </p>
      </footer>
    </div>
  );
}