import React from 'react';
import { Link } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Zap, Timer, Brain, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
export function PracticeQuizPreview() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black leading-tight uppercase">
              Sınırlarını <br />
              <span className="text-playful-red underline decoration-playful-dark decoration-8 underline-offset-8">Test Et! ⚡</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed">
              Vakit kaybetmeden gerçek bir deneme deneyimi yaşa. Hangi konularda eksik olduğunu saniyeler içinde öğren!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Timer, text: "5 Dakika Hızlı Test", color: "text-playful-teal" },
              { icon: Brain, text: "20 Kritik TYT Sorusu", color: "text-playful-red" },
              { icon: Zap, text: "Anında Net Hesabı", color: "text-playful-yellow" },
              { icon: GraduationCap, text: "Sürpriz XP Ödülleri", color: "text-playful-dark" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-2 border-playful-dark rounded-2xl bg-white font-bold">
                <item.icon className={`w-6 h-6 ${item.color}`} strokeWidth={3} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-playful-teal/20 rounded-[3rem] -rotate-3 border-4 border-playful-dark border-dashed" />
          <PlayfulCard className="bg-white p-8 relative space-y-6">
            <div className="flex justify-between items-center pb-4 border-b-4 border-playful-dark">
              <div className="flex items-center gap-2">
                <Sparkles className="text-playful-yellow fill-current" />
                <span className="font-black uppercase tracking-widest text-sm">Mini Deneme #24</span>
              </div>
              <div className="px-3 py-1 bg-playful-dark text-white rounded-full font-black text-xs uppercase">Aktif</div>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-100 border-2 border-playful-dark rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-playful-teal border-r-2 border-playful-dark" />
              </div>
              <p className="font-black text-xl leading-tight">
                "Bir sayının karesi kendisinden küçükse bu sayı hangi aralıktadır?"
              </p>
              <div className="space-y-2">
                {['(-1, 0)', '(0, 1)', '(1, 2)', '(-1, 1)'].map((opt, i) => (
                  <div key={i} className="p-3 border-2 border-playful-dark rounded-xl font-bold hover:bg-slate-50 cursor-pointer">
                    {String.fromCharCode(65 + i)}) {opt}
                  </div>
                ))}
              </div>
            </div>
            <Link to="/quiz" className="playful-button w-full bg-playful-teal text-white text-xl py-6 group">
              Şimdi Gir! <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </PlayfulCard>
        </div>
      </div>
    </section>
  );
}