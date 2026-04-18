import React from 'react';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { CoachTeaser } from './CoachTeaser';
import { PricingSection } from './PricingSection';
import { TestimonialCarousel } from './TestimonialCarousel';
import { PopularCoaches } from './PopularCoaches';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Users, MessageSquare, RefreshCw } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
interface CoachLandingViewProps {
  onSwitch: () => void;
}
export function CoachLandingView({ onSwitch }: CoachLandingViewProps) {
  // Coach specific stats
  const coachStats = {
    activeStudents: '12k+',
    avgNetIncrease: '24',
    totalTasksDone: '1.2M'
  };
  return (
    <div className="space-y-24 pb-32">
      <HeroSection funnel="koç" />
      <div className="max-w-7xl mx-auto px-4">
        <StatsSection stats={coachStats} />
      </div>
      <CoachTeaser />
      <section className="py-24 px-4 bg-playful-dark text-white -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 border-y-8 border-playful-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              DİJİTAL <br /> <span className="text-playful-red">DÖNÜŞÜMÜ</span> <br /> BAŞLAT!
            </h2>
            <p className="text-xl font-bold opacity-70 leading-relaxed">
              Excel dosyalarından, karışık WhatsApp gruplarından ve kaybolan ödevlerden kurtul. KocFlow ile tüm rehberlik sürecini tek bir platformda topla.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Veri Odaklı", desc: "Öğrencilerinin netlerini grafiklerle izle.", icon: BarChart3 },
                { title: "Hızlı İletişim", desc: "Dahili chat ile sürekli bağlantıda kal.", icon: MessageSquare },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border-2 border-white/10">
                  <item.icon className="w-8 h-8 text-playful-red flex-shrink-0" strokeWidth={3} />
                  <div>
                    <h4 className="font-black text-lg">{item.title}</h4>
                    <p className="text-sm font-bold opacity-50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-playful-red/20 blur-3xl rounded-full" />
            <PlayfulCard className="bg-white text-playful-dark relative z-10 p-8 space-y-6 border-8 border-playful-dark shadow-playful">
              <div className="flex items-center gap-3 border-b-4 border-slate-100 pb-4">
                <Users className="text-playful-red w-8 h-8" />
                <span className="font-black text-xl uppercase">Yönetim Simülatörü</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-2 border-playful-dark">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-playful-yellow rounded-lg border-2 border-playful-dark" />
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                    </div>
                    <div className="h-6 w-16 bg-playful-teal rounded-lg border-2 border-playful-dark" />
                  </div>
                ))}
              </div>
              <div className="playful-button w-full bg-playful-red text-white">
                Sistemi Keşfet
              </div>
            </PlayfulCard>
          </div>
        </div>
      </section>
      <PopularCoaches />
      <TestimonialCarousel />
      <PricingSection />
      <footer className="pt-20 border-t-8 border-playful-dark text-center space-y-8 px-4 bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-black tracking-tighter uppercase italic bg-playful-red text-white border-4 border-playful-dark inline-block px-6 py-2 shadow-playful">KOCFLOW</div>
          <button 
            onClick={onSwitch}
            className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground hover:text-playful-teal transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Rol Seçimine Dön
          </button>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center font-black text-lg uppercase tracking-tighter text-muted-foreground">
          <Link to="/marketplace" className="hover:text-playful-red transition-colors">Portföy</Link>
          <Link to="/login" className="hover:text-playful-teal transition-colors">Giriş</Link>
          <Link to="/signup" className="hover:text-playful-yellow transition-colors">Başvur</Link>
        </div>
        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest pb-10">
          © 2025 KocFlow Koçluk Paneli. 🛡️
        </p>
      </footer>
    </div>
  );
}