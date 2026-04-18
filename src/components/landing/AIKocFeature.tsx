import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Zap, MessageSquare, Brain } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
const CHAT_DEMO = [
  { role: 'user', content: 'Matematikte netlerim düşük, ne yapmalıyım? 📉', delay: 1 },
  { role: 'bot', content: 'Selam Şampiyon! Son denemendeki "Fonksiyonlar" hataların göze çarpıyor. Hemen bir çalışma planı oluşturdum! 🚀', delay: 3 },
  { role: 'user', content: 'Teşekkürler! Peki bugün kaç soru çözmeliyim?', delay: 5 },
  { role: 'bot', content: 'Bugün odaklanman gereken 30 soru ve 2 Pomodoro seansı var. Hadi başlayalım! ⏱️', delay: 7 }
];
export function AIKocFeature() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="absolute -inset-4 bg-playful-red/20 rounded-[3rem] rotate-2 border-4 border-playful-dark border-dashed" />
          <PlayfulCard className="bg-white p-0 overflow-hidden relative border-4 border-playful-dark shadow-playful h-[500px] flex flex-col">
            <div className="bg-playful-dark p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-playful-teal rounded-xl flex items-center justify-center border-2 border-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black leading-none">AI Koç</p>
                  <p className="text-[10px] font-bold text-white/60">YAZIYOR...</p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-playful-yellow" />
            </div>
            <div className="flex-1 p-6 space-y-6 overflow-hidden bg-slate-50">
              {CHAT_DEMO.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: msg.delay, duration: 0.4 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl border-4 border-playful-dark font-bold text-sm shadow-playful-active ${
                    msg.role === 'user' ? 'bg-playful-yellow' : 'bg-white'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 bg-white border-t-4 border-playful-dark">
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-slate-100 rounded-xl border-2 border-playful-dark border-dashed" />
                <div className="w-12 h-12 bg-playful-red rounded-xl border-2 border-playful-dark" />
              </div>
            </div>
          </PlayfulCard>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
          <div className="inline-flex items-center gap-2 bg-playful-teal/10 text-playful-teal px-4 py-2 rounded-full border-2 border-playful-teal font-black text-sm uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-current" /> Yeni Nesil Rehberlik
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-tight uppercase">
            Süper Güç: <br />
            <span className="text-playful-red underline decoration-playful-dark decoration-8 underline-offset-8">AI Koç! 🧠</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed">
            7/24 yanındaki akıllı rehberin. Hatalarını analiz eder, eksiklerini tespit eder ve sana özel rotayı saniyeler içinde çizer.
          </p>
          <div className="space-y-4">
            {[
              { icon: MessageSquare, title: "Anlık Soru Çözümü", desc: "Takıldığın her an sorunu sor, cevabını al." },
              { icon: Brain, title: "Akıllı Planlama", desc: "Senin hızına ve seviyene göre programı günceller." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white border-4 border-playful-dark rounded-2xl shadow-playful hover:-translate-y-1 transition-all">
                <div className="p-3 bg-playful-yellow border-2 border-playful-dark rounded-xl h-fit">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black">{item.title}</h4>
                  <p className="font-bold text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}