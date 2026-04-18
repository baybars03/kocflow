import React from 'react';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { PracticeQuizPreview } from './PracticeQuizPreview';
import { AIKocFeature } from './AIKocFeature';
import { PopularCoaches } from './PopularCoaches';
import { PricingSection } from './PricingSection';
import { TestimonialCarousel } from './TestimonialCarousel';
import { Link } from 'react-router-dom';
import { Zap, Target, Trophy, Rocket, RefreshCw } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
interface StudentLandingViewProps {
  onSwitch: () => void;
}
export function StudentLandingView({ onSwitch }: StudentLandingViewProps) {
  return (
    <div className="space-y-24 pb-32">
      <HeroSection funnel="öğrenci" />
      <div className="max-w-7xl mx-auto px-4">
        <StatsSection />
      </div>
      <PracticeQuizPreview funnel="öğrenci" />
      <AIKocFeature />
      <PopularCoaches />
      <section className="space-y-16 py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-playful-dark">Nasıl Başaracaksın? 🎯</h2>
          <p className="font-bold text-muted-foreground text-lg md:text-xl">KocFlow sana sıradan bir ders programından fazlasını sunar.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "AI Eksik Analizi", desc: "Çözdüğün her denemeden sonra AI, hangi konuya çalışman gerektiğini saniyeler içinde söyler.", icon: Zap, color: "bg-playful-red" },
            { title: "Birebir Rehberlik", desc: "Seçtiğin koçla hedeflerini her hafta masaya yatır ve disiplini asla elden bırakma.", icon: Target, color: "bg-playful-teal" },
            { title: "Oyunlaştırılmış Akış", desc: "Puan topla, rütbe kazan, eğitimi bir yük olarak değil her gün atladığın bir level olarak gör.", icon: Trophy, color: "bg-playful-yellow" },
          ].map((f, i) => (
            <PlayfulCard key={i} className="bg-white space-y-6 group border-playful-dark shadow-playful hover:-translate-y-2 transition-all">
              <div className={`${f.color} w-16 h-16 rounded-2xl border-4 border-playful-dark flex items-center justify-center text-white shadow-playful group-hover:rotate-6 transition-transform`}>
                <f.icon className="w-8 h-8" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-playful-dark">{f.title}</h3>
              <p className="font-bold text-muted-foreground text-lg leading-relaxed">{f.desc}</p>
            </PlayfulCard>
          ))}
        </div>
      </section>
      <TestimonialCarousel />
      <PricingSection />
      <footer className="pt-20 border-t-8 border-playful-dark text-center space-y-8 px-4 bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-black tracking-tighter uppercase italic bg-playful-yellow border-4 border-playful-dark inline-block px-6 py-2 shadow-playful">KOCFLOW</div>
          <button 
            onClick={onSwitch}
            className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground hover:text-playful-red transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Rol Seçimine Dön
          </button>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center font-black text-lg uppercase tracking-tighter text-muted-foreground">
          <Link to="/marketplace" className="hover:text-playful-red transition-colors">Koçlar</Link>
          <Link to="/login" className="hover:text-playful-teal transition-colors">Giriş</Link>
          <Link to="/signup" className="hover:text-playful-yellow transition-colors">Kaydol</Link>
        </div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest pb-10">
          © 2025 KocFlow Öğrenci Akışı. 🚀
        </p>
      </footer>
    </div>
  );
}