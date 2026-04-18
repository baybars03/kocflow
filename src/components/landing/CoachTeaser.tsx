import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, AlertCircle, Plus, CheckCircle2, Sparkles, TrendingUp, BarChart3, Star } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
export function CoachTeaser() {
  const [assigned, setAssigned] = useState(false);
  const handleDemoAssign = () => {
    setAssigned(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
    });
    setTimeout(() => setAssigned(false), 3000);
  };
  const mockStudents = [
    { name: 'Mert Y.', progress: 85, alert: false, level: 14, status: 'Uçuşta' },
    { name: 'Selin B.', progress: 28, alert: true, level: 8, status: 'Geri Kaldı' },
    { name: 'Emre K.', progress: 64, alert: false, level: 11, status: 'Stabil' },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 bg-playful-red/10 text-playful-red px-5 py-2 rounded-full border-4 border-playful-red font-black text-sm uppercase tracking-widest shadow-sm">
            <TrendingUp className="w-5 h-5" /> Koçlar İçin Tasarlandı
          </div>
          <h2 className="text-6xl md:text-8xl font-black leading-tight uppercase tracking-tighter text-playful-dark">
            ÖĞRENCİLERİNİ <br />
            <span className="text-playful-teal underline decoration-playful-dark decoration-[12px] underline-offset-8">OTOMATİK YÖNET! 📈</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed max-w-xl">
            KocFlow ile onlarca öğrencinin gelişimini saniyeler içinde takip et. Kim geri kalıyor, kim uçuşta anında gör ve müdahale et.
          </p>
          <div className="space-y-6">
            {[
              { icon: ClipboardList, title: "Tek Tıkla Toplu Ödev", desc: "Tüm grubuna veya kişiye özel saniyeler içinde TYT görevleri ata." },
              { icon: AlertCircle, title: "Düşük İlerleme Uyarıları", desc: "Çalışmayı bırakan veya neti düşenleri sistem sana anında raporlasın." },
              { icon: BarChart3, title: "Portföy Analizi", desc: "Öğrencilerinin toplam gelişimini ve başarı oranlarını tek ekranda izle." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white border-4 border-playful-dark rounded-[2rem] shadow-playful hover:-translate-y-2 transition-all group">
                <div className="p-4 bg-playful-yellow border-4 border-playful-dark rounded-2xl h-fit group-hover:rotate-6 transition-transform">
                  <item.icon className="w-8 h-8" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-2xl font-black">{item.title}</h4>
                  <p className="font-bold text-muted-foreground text-lg leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8 relative">
          <div className="absolute -inset-8 bg-playful-teal/5 rounded-[4rem] -rotate-2 border-4 border-playful-dark border-dashed -z-10" />
          {/* Analytics Teaser Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute -top-12 -right-12 z-20 hidden xl:block"
          >
            <PlayfulCard className="bg-playful-dark text-white p-6 w-64 border-4 shadow-playful">
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-playful-yellow fill-current w-5 h-5" />
                <span className="font-black uppercase text-xs">Aylık Başarı</span>
              </div>
              <div className="text-3xl font-black text-playful-yellow">+%24.8</div>
              <p className="text-[10px] font-bold text-white/50 mt-1 uppercase">Öğrenci Net Artışı</p>
              <div className="flex gap-1 mt-4 items-end h-12">
                {[30, 50, 40, 70, 60, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-playful-teal rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </PlayfulCard>
          </motion.div>
          <PlayfulCard className="bg-white p-0 overflow-hidden relative border-8 border-playful-dark shadow-[16px_16px_0px_0px_rgba(30,41,59,1)]">
            <div className="bg-playful-dark p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-playful-yellow" />
                <span className="font-black text-xl uppercase tracking-tighter">Öğrenci Takip Paneli</span>
              </div>
              <div className="px-3 py-1 bg-playful-red rounded-lg font-black text-xs">LIVE DEMO</div>
            </div>
            <div className="p-8 space-y-6 bg-slate-50 min-h-[450px]">
              {mockStudents.map((s, i) => (
                <div key={i} className="bg-white border-4 border-playful-dark p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between group hover:border-playful-teal transition-all shadow-playful-active">
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl border-4 border-playful-dark flex items-center justify-center font-black text-2xl rotate-3 group-hover:rotate-6 transition-transform">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-xl leading-none">{s.name}</p>
                      <div className="flex gap-2 mt-2">
                         <span className="text-[10px] font-black uppercase bg-playful-yellow px-2 py-0.5 rounded border border-playful-dark">Lvl {s.level}</span>
                         <span className={cn(
                           "text-[10px] font-black uppercase px-2 py-0.5 rounded border border-playful-dark",
                           s.alert ? "bg-playful-red text-white" : "bg-playful-teal text-white"
                         )}>{s.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto">
                    <div className="flex-1 md:w-32 h-4 bg-slate-200 rounded-full overflow-hidden border-2 border-playful-dark">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.progress}%` }}
                        className={cn("h-full", s.alert ? "bg-playful-red" : "bg-playful-teal")} 
                      />
                    </div>
                    <Sparkles className={cn("w-6 h-6", s.alert ? "text-slate-200" : "text-playful-yellow fill-current animate-pulse")} />
                  </div>
                </div>
              ))}
              <div className="pt-8 mt-4 border-t-4 border-dashed border-slate-200">
                <button
                  onClick={handleDemoAssign}
                  disabled={assigned}
                  className={cn(
                    "w-full playful-button py-6 text-xl gap-4 border-4",
                    assigned ? "bg-playful-teal text-white" : "bg-playful-yellow text-playful-dark"
                  )}
                >
                  {assigned ? (
                    <>
                      <CheckCircle2 className="w-8 h-8" strokeWidth={4} /> ÖDEVLER GÖNDERİLDİ! 🚀
                    </>
                  ) : (
                    <>
                      <Plus className="w-8 h-8" strokeWidth={5} /> TOPLU ÖDEV ATA
                    </>
                  )}
                </button>
              </div>
            </div>
          </PlayfulCard>
        </div>
      </div>
    </section>
  );
}