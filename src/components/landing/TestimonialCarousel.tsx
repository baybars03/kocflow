import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
const TESTIMONIALS = [
  { name: "Melis Y.", role: "Tıp Fakültesi Adayı", text: "Netlerimin 50'den 90'a çıkacağını hiç hayal etmezdim. AI koçum her gün ne yapmam gerektiğini söylüyor!", color: "bg-playful-teal" },
  { name: "Emre K.", role: "Mühendislik Adayı", text: "Koçumla haftalık yaptığımız görüşmeler sayesinde çalışma disiplini kazandım. Pomodoro bağımlısı oldum!", color: "bg-playful-red" },
  { name: "Burak S.", role: "Hukuk Adayı", text: "Fen netlerim uçuşa geçti! Daha önce hiç anlamadığım Fizik konularını bu sistemle 1 haftada kavradım.", color: "bg-playful-yellow" },
  { name: "Selin B.", role: "Edebiyat Adayı", text: "Koçumla her gün mesajlaşıyoruz. Moralim bozulduğunda hemen destek oluyor, pes etmemi engelliyor.", color: "bg-white" },
  { name: "Deniz G.", role: "Mimarlık Adayı", text: "Uygulamanın oyunlaştırılmış yapısı beni her gün çalışmaya itiyor. Sıralamada yükselmek harika bir duygu!", color: "bg-playful-teal" }
];
export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  return (
    <section className="space-y-12 py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-5xl font-black uppercase tracking-tight">Şampiyonlar Kulübü 🏆</h2>
          <p className="font-bold text-muted-foreground text-xl">Kendi başarı hikayeni yazmaya hazır mısın?</p>
        </div>
        <div className="flex gap-4">
          <button onClick={scrollPrev} className="p-4 border-4 border-playful-dark rounded-2xl bg-white shadow-playful hover:translate-y-[-2px] active:translate-y-0 transition-all">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={scrollNext} className="p-4 border-4 border-playful-dark rounded-2xl bg-white shadow-playful hover:translate-y-[-2px] active:translate-y-0 transition-all">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8 px-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
              <PlayfulCard className={`${t.color} h-full flex flex-col gap-6 border-playful-dark shadow-playful`}>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-playful-dark text-playful-dark" />)}
                </div>
                <p className="text-2xl font-bold italic leading-tight flex-1">"{t.text}"</p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}