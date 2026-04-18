import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Zap, MessageSquare, Brain } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
const CHAT_DEMO = [
  { role: 'user', content: 'Netlerim bir türlü artmıyor, neden olabilir? 📉', delay: 1 },
  { role: 'bot', content: 'Son deneme analizine baktım Şampiyon! Matematikte "Problemler" kısmındaki hızın düşük. Hemen özel bir hız kampı başlatalım mı? 🚀', delay: 3 },
  { role: 'user', content: 'Harika olur! Peki bugün ne kadar çalışmalıyım?', delay: 5 },
  { role: 'bot', content: 'Senin için 2 saatlik odaklanma seansı ve 40 kritik soru hazırladım. Pomodoro sayacını başlatıyorum! ⏱️✨', delay: 7 }
];
export function AIKocFeature() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="absolute -inset-6 bg-playful-red/20 rounded-[3rem] rotate-2 border-4 border-playful-dark border-dashed" />
          <PlayfulCard className="bg-white p-0 overflow-hidden relative border-8 border-playful-dark shadow-[16px_16px_0px_0px_rgba(30,41,59,1)] h-[550px] flex flex-col">
            <div className="bg-playful-dark p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-playful-teal rounded-2xl flex items-center justify-center border-2 border-white shadow-sm">
                  <Bot className="w-7 h-7" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-black text-lg leading-none uppercase tracking-tighter">AI KOCFLOW</p>
                  <p className="text-[10px] font-black text-playful-teal animate-pulse mt-1">SANA ÖZEL ANALİZ YAPIYOR...</p>
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-playful-yellow fill-current" />
            </div>
            <div className="flex-1 p-8 space-y-8 overflow-hidden bg-slate-50 relative">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]" />
              {CHAT_DEMO.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 40 : -40, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: msg.delay, duration: 0.5, type: 'spring' }}
                  className={`flex relative z-10 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-[2rem] border-4 border-playful-dark font-black text-sm md:text-base shadow-playful-active ${
                    msg.role === 'user' ? 'bg-playful-yellow text-playful-dark' : 'bg-white text-playful-dark'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-6 bg-white border-t-8 border-playful-dark">
              <div className="flex gap-3">
                <div className="flex-1 h-14 bg-slate-100 rounded-2xl border-4 border-playful-dark border-dashed flex items-center px-4 font-bold text-slate-300">
                  Bir mesaj yaz...
                </div>
                <div className="w-14 h-14 bg-playful-red rounded-2xl border-4 border-playful-dark shadow-playful-active flex items-center justify-center text-white">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>
          </PlayfulCard>
        </div>
        <div className="order-1 lg:order-2 space-y-10">
          <div className="inline-flex items-center gap-2 bg-playful-teal/10 text-playful-teal px-5 py-2 rounded-full border-4 border-playful-teal font-black text-sm uppercase tracking-widest">
            <Zap className="w-5 h-5 fill-current" /> Geleceğin Rehberliği
          </div>
          <h2 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter">
            SÜPER GÜÇ: <br />
            <span className="text-playful-red underline decoration-playful-dark decoration-[12px] underline-offset-8">AI KOÇ! 🧠</span>
          </h2>
          <p className="text-xl md:text-3xl font-bold text-muted-foreground leading-tight max-w-xl">
            7/24 yanındaki akıllı rehberin. Hatalarını analiz eder, eksiklerini tespit eder ve netlerini artıracak rotayı saniyeler içinde çizer.
          </p>
          <div className="space-y-6">
            {[
              { icon: MessageSquare, title: "Anlık Soru Çözümü", desc: "Takıldığın her an sorunu sor, anında pedagojik yanıtını al." },
              { icon: Brain, title: "Kişiselleştirilmiş Akış", desc: "Senin hızına, seviyene ve hedefine göre programı her gün günceller." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white border-4 border-playful-dark rounded-[2.5rem] shadow-playful hover:-translate-y-2 transition-all group">
                <div className="p-4 bg-playful-yellow border-4 border-playful-dark rounded-2xl h-fit group-hover:rotate-6 transition-transform">
                  <item.icon className="w-8 h-8" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-2xl font-black">{item.title}</h4>
                  <p className="font-bold text-muted-foreground text-lg leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}