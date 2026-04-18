import React, { useRef } from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
const TESTIMONIALS = [
  { name: "Melis Y.", role: "Tıp Fakültesi Adayı", text: "Netlerimin 50'den 90'a çıkacağını hiç hayal etmezdim. AI koçum her gün ne yapmam gerektiğini söylüyor!", color: "bg-playful-teal" },
  { name: "Emre K.", role: "Mühendislik Adayı", text: "Koçumla haftalık yaptığımız görüşmeler sayesinde çalışma disiplini kazandım. Pomodoro bağımlısı oldum!", color: "bg-playful-red" },
  { name: "Burak S.", role: "Hukuk Adayı", text: "Fen netlerim uçuşa geçti! Daha önce hiç anlamadığım Fizik konularını bu sistemle 1 haftada kavradım.", color: "bg-playful-yellow" },
  { name: "Selin B.", role: "Edebiyat Adayı", text: "Koçumla her gün mesajlaşıyoruz. Moralim bozulduğunda hemen destek oluyor, pes etmemi engelliyor.", color: "bg-white" },
  { name: "Deniz G.", role: "Mimarlık Adayı", text: "Uygulamanın oyunlaştırılmış yapısı beni her gün çalışmaya itiyor. Sıralamada yükselmek harika bir duygu!", color: "bg-playful-teal" }
];
export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  return (
    <section className="space-y-12 py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-5xl font-black uppercase tracking-tight">Şampiyonlar Kulübü 🏆</h2>
          <p className="font-bold text-muted-foreground text-xl">Kendi başarı hikayeni yazmaya hazır mısın?</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')} 
            className="p-4 border-4 border-playful-dark rounded-2xl bg-white shadow-playful hover:translate-y-[-2px] active:translate-y-0 transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="p-4 border-4 border-playful-dark rounded-2xl bg-white shadow-playful hover:translate-y-[-2px] active:translate-y-0 transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-8 px-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="flex-none w-[85vw] md:w-[40vw] lg:w-[30vw] snap-start h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full"
            >
              <PlayfulCard className={`${t.color} h-full flex flex-col gap-6 border-playful-dark shadow-playful min-h-[320px]`}>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-playful-dark text-playful-dark" />)}
                </div>
                <p className="text-xl md:text-2xl font-bold italic leading-tight flex-1">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t-4 border-playful-dark/10">
                  <div className="w-14 h-14 bg-white border-4 border-playful-dark rounded-2xl flex items-center justify-center font-black text-2xl rotate-3">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-xl leading-none">{t.name}</p>
                    <p className="text-sm font-bold opacity-60 uppercase mt-1">{t.role}</p>
                  </div>
                </div>
              </PlayfulCard>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}