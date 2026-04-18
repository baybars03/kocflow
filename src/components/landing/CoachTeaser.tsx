import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ClipboardList, AlertCircle, Plus, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
export function CoachTeaser() {
  const [assigned, setAssigned] = useState(false);
  const handleDemoAssign = () => {
    setAssigned(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D']
    });
    setTimeout(() => setAssigned(false), 3000);
  };
  const mockStudents = [
    { name: 'Mert Y.', progress: 85, alert: false, level: 12 },
    { name: 'Selin B.', progress: 32, alert: true, level: 8 },
    { name: 'Emre K.', progress: 64, alert: false, level: 10 },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-playful-red/10 text-playful-red px-4 py-2 rounded-full border-2 border-playful-red font-black text-sm uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" /> Koçlar İçin Tasarlandı
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-tight uppercase">
            Öğrencilerini <br />
            <span className="text-playful-teal underline decoration-playful-dark decoration-8 underline-offset-8">Otomatik Yönet! 📈</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed">
            KocFlow ile onlarca öğrencinin gelişimini saniyeler içinde takip et. Kim geri kalıyor, kim uçuşta anında gör.
          </p>
          <div className="space-y-4">
            {[
              { icon: ClipboardList, title: "Tek Tıkla Ödev", desc: "Tüm grubuna veya kişiye özel saniyeler içinde görev ata." },
              { icon: AlertCircle, title: "Düşük İlerleme Uyarıları", desc: "Çalışmayı bırakan öğrencileri sistem sana anında raporlasın." }
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
        <div className="relative">
          <div className="absolute -inset-4 bg-playful-teal/20 rounded-[3rem] -rotate-2 border-4 border-playful-dark border-dashed" />
          <PlayfulCard className="bg-white p-0 overflow-hidden relative border-4 border-playful-dark shadow-playful">
            <div className="bg-playful-dark p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <span className="font-black">Öğrenci Listesi (Demo)</span>
              </div>
              <Sparkles className="w-5 h-5 text-playful-yellow" />
            </div>
            <div className="p-6 space-y-4 bg-slate-50 min-h-[400px]">
              {mockStudents.map((s, i) => (
                <div key={i} className="bg-white border-2 border-playful-dark p-4 rounded-xl flex items-center justify-between group hover:border-playful-teal transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg border-2 border-playful-dark flex items-center justify-center font-black">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-sm leading-none">{s.name}</p>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Lvl {s.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {s.alert && (
                      <div className="flex items-center gap-1 text-playful-red animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase">Düşük</span>
                      </div>
                    )}
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-playful-dark">
                      <div className="h-full bg-playful-teal" style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-6 mt-6 border-t-2 border-dashed border-slate-200">
                <button
                  onClick={handleDemoAssign}
                  disabled={assigned}
                  className={cn(
                    "w-full playful-button py-4 text-base gap-3",
                    assigned ? "bg-playful-teal text-white" : "bg-playful-yellow text-playful-dark"
                  )}
                >
                  {assigned ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" strokeWidth={3} /> Ödev Gönderildi!
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" strokeWidth={4} /> Toplu Ödev Ata
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