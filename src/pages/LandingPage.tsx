import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Target, Zap, Trophy, Users, Star, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
export function LandingPage() {
  const { data: stats } = useQuery({
    queryKey: ['landing-stats'],
    queryFn: () => api<{ activeStudents: number, totalTasksDone: number, avgNetIncrease: number }>('/api/landing/stats'),
  });
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-block bg-playful-yellow border-4 border-playful-dark px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-playful mb-4"
        >
          TYT 2025 Maratonuna Hazır mısın?
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black text-playful-dark tracking-tighter leading-none">
          TYT'yi Oyun <br /> 
          <span className="text-playful-red">Gibi Bitir! 🚀</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-muted-foreground max-w-2xl mx-auto px-4">
          Yapay zeka asistanın ve profesyonel koçlarınla sınav stresini eğlenceye dönüştür, netlerini katla.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link to="/signup" className="playful-button bg-playful-teal text-white text-2xl py-6 px-10">
            Hemen Başla! <Rocket className="w-8 h-8" />
          </Link>
          <Link to="/marketplace" className="playful-button bg-white text-playful-dark text-2xl py-6 px-10">
            Koçları Gör <Users className="w-8 h-8" />
          </Link>
        </div>
      </section>
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <PlayfulCard className="bg-white text-center py-10">
          <p className="text-5xl font-black text-playful-red">{stats?.activeStudents || '1.2k'}+</p>
          <p className="font-bold text-muted-foreground uppercase tracking-widest mt-2">Aktif Öğrenci</p>
        </PlayfulCard>
        <PlayfulCard className="bg-white text-center py-10">
          <p className="text-5xl font-black text-playful-teal">%{stats?.avgNetIncrease || '18'}+</p>
          <p className="font-bold text-muted-foreground uppercase tracking-widest mt-2">Ortalama Net Artışı</p>
        </PlayfulCard>
        <PlayfulCard className="bg-white text-center py-10">
          <p className="text-5xl font-black text-playful-yellow">{stats?.totalTasksDone || '45k'}+</p>
          <p className="font-bold text-muted-foreground uppercase tracking-widest mt-2">Tamamlanan Görev</p>
        </PlayfulCard>
      </section>
      {/* Features Carousel Mockup */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">Neden TYT Kampüs?</h2>
          <p className="font-bold text-muted-foreground">Sadece bir takip uygulaması değil, gerçek bir oyun alanı.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {[
            { title: "AI Çalışma Koçu", desc: "Sana özel eksiklerini belirler, en verimli çalışma rotasını çizer.", icon: Zap, color: "bg-playful-red" },
            { title: "Gerçek Koç Desteği", desc: "Alanında uzman koçlarla birebir görüş, hedeflerine emin adımlarla yürü.", icon: Target, color: "bg-playful-teal" },
            { title: "Gamified Takip", desc: "Puan topla, seviye atla, sıralamada yükselirken öğrenmenin tadını çıkar.", icon: Trophy, color: "bg-playful-yellow" },
          ].map((f, i) => (
            <PlayfulCard key={i} className="bg-white space-y-4 group">
              <div className={`${f.color} w-16 h-16 rounded-2xl border-4 border-playful-dark flex items-center justify-center text-white shadow-playful group-hover:scale-110 transition-transform`}>
                <f.icon className="w-8 h-8" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black">{f.title}</h3>
              <p className="font-bold text-muted-foreground leading-relaxed">{f.desc}</p>
            </PlayfulCard>
          ))}
        </div>
      </section>
      {/* Testimonials */}
      <section className="bg-playful-dark text-white py-20 px-4 -mx-4 sm:-mx-8 lg:-mx-12 border-y-8 border-playful-dark">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl font-black text-center">Şampiyonlar Konuşuyor 🏆</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <PlayfulCard className="bg-white text-playful-dark">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-playful-yellow text-playful-yellow" />)}
                </div>
                <p className="text-lg font-bold italic mb-6">"Netlerimin 50'den 90'a çıkacağını hiç hayal etmezdim. AI koçum her gün ne yapmam gerektiğini söylüyor, ben sadece uyguluyorum!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-playful-red rounded-full border-2 border-playful-dark" />
                  <div><p className="font-black">Melis Y.</p><p className="text-xs font-bold opacity-50">Tıp Fakültesi Adayı</p></div>
                </div>
             </PlayfulCard>
             <PlayfulCard className="bg-white text-playful-dark">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-playful-yellow text-playful-yellow" />)}
                </div>
                <p className="text-lg font-bold italic mb-6">"Koçumla haftalık yaptığımız görüşmeler sayesinde çalışma disiplini kazandım. Pomodoro sistemi ise odaklanma sorunumu tamamen bitirdi."</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-playful-teal rounded-full border-2 border-playful-dark" />
                  <div><p className="font-black">Emre K.</p><p className="text-xs font-bold opacity-50">Mühendislik Adayı</p></div>
                </div>
             </PlayfulCard>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="text-center px-4 space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black">Yolculuğa Başlamaya Hazır Mısın?</h2>
          <p className="text-xl font-bold text-muted-foreground">Saniyeler içinde kaydol, TYT'yi fethetmeye başla.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto">
          <PlayfulCard className="bg-playful-teal text-white flex-1 space-y-4">
             <ShieldCheck className="w-12 h-12 mx-auto" strokeWidth={3} />
             <h3 className="text-3xl font-black">Öğrenci Ol</h3>
             <p className="font-bold opacity-80">Tüm araçlara eriş, koçunu seç ve başarıya koş.</p>
             <Link to="/signup?role=öğrenci" className="playful-button bg-white text-playful-teal w-full">Hemen Kaydol</Link>
          </PlayfulCard>
          <PlayfulCard className="bg-playful-red text-white flex-1 space-y-4">
             <MessageSquare className="w-12 h-12 mx-auto" strokeWidth={3} />
             <h3 className="text-3xl font-black">Koç Ol</h3>
             <p className="font-bold opacity-80">Bilgini paylaş, öğrencilere rehberlik et ve kazan.</p>
             <Link to="/signup?role=koç" className="playful-button bg-white text-playful-red w-full">Başvuru Yap</Link>
          </PlayfulCard>
        </div>
      </section>
      {/* Footer */}
      <footer className="pt-20 border-t-4 border-playful-dark text-center space-y-6">
        <div className="text-3xl font-black tracking-tighter">TYT KAMPÜS</div>
        <div className="flex gap-8 justify-center font-bold text-muted-foreground">
          <Link to="/marketplace" className="hover:text-playful-dark">Marketplace</Link>
          <Link to="/login" className="hover:text-playful-dark">Giriş Yap</Link>
          <Link to="/signup" className="hover:text-playful-dark">Kaydol</Link>
        </div>
        <p className="text-sm font-bold text-muted-foreground">© 2024 TYT Kampüs. Tüm hakları saklıdır. 🚀</p>
      </footer>
    </div>
  );
}