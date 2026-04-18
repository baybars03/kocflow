import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '0',
    description: 'Temel araçlarla başla',
    features: ['AI Task Önerileri', 'Günlük Görev Takibi', 'Sınırlı Pomodoro'],
    color: 'bg-white',
    button: 'Hemen Başla'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '99',
    description: 'Disiplin kazananlar için',
    features: ['Koç Marketplace Erişimi', 'Sınırsız Görev & Pomodoro', 'Net Gelişim Grafikleri', 'Özel Başarı Rozetleri'],
    color: 'bg-playful-teal',
    button: 'Abone Ol',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '199',
    description: 'Zirveye oynayan şampiyonlara',
    features: ['AI Tutor (Limitsiz)', 'Canlı Rehberlik Seansları', 'Grup Etütleri', 'Veli Bilgilendirme Paneli'],
    color: 'bg-playful-red',
    button: 'Pro\'ya Geç',
    popular: true
  }
];
export function PricingSection() {
  const user = useAuth((s) => s.user);
  const isLoggedIn = !!user;
  const userRole = user?.role;
  const handleAction = (tierId: string) => {
    if (tierId === 'free' && !isLoggedIn) return; // Link works normally
    if (isLoggedIn) {
      toast.info("Abonelik işlemleri yakında aktif edilecek! 🚀");
    }
  };
  return (
    <section className="space-y-16 py-20 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black tracking-tight uppercase">Planını Seç 💎</h2>
        <p className="font-bold text-muted-foreground text-xl">Hedeflerine göre en uygun paketi belirle.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_TIERS.map((tier, i) => {
          // Hide Pro for Coaches or show as Enterprise
          const isCoach = userRole === 'koç';
          const displayName = (isCoach && tier.id === 'pro') ? 'Enterprise' : tier.name;
          const displayDesc = (isCoach && tier.id === 'pro') ? 'Kurumlar ve kalabalık ekipler için' : tier.description;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {tier.popular && !isCoach && (
                <motion.div
                  animate={{ rotate: [0, -3, 3, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 bg-playful-yellow border-4 border-playful-dark px-4 py-1 rounded-full font-black text-sm uppercase shadow-playful"
                >
                  En Popüler ✨
                </motion.div>
              )}
              <PlayfulCard className={`${tier.color} h-full flex flex-col p-10 ${tier.popular ? 'border-playful-dark ring-8 ring-playful-yellow/30' : ''}`}>
                <div className="space-y-2 mb-8">
                  <h3 className="text-3xl font-black">{displayName}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black tracking-tighter">₺{tier.price}</span>
                    <span className="font-bold text-lg">/ay</span>
                  </div>
                  <p className="font-bold opacity-70 leading-tight">{displayDesc}</p>
                </div>
                <div className="flex-1 space-y-4 mb-8">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1 bg-playful-dark rounded-full p-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={4} />
                      </div>
                      <span className="font-bold">{f}</span>
                    </div>
                  ))}
                </div>
                {isLoggedIn ? (
                  <button
                    onClick={() => handleAction(tier.id)}
                    className={`playful-button text-xl py-6 ${tier.id === 'free' ? 'bg-playful-dark text-white' : 'bg-white text-playful-dark'}`}
                  >
                    {tier.button}
                  </button>
                ) : (
                  <Link
                    to={`/signup?role=${isCoach ? 'koç' : 'öğrenci'}`}
                    className={`playful-button text-xl py-6 ${tier.id === 'free' ? 'bg-playful-dark text-white' : 'bg-white text-playful-dark'}`}
                  >
                    {tier.button}
                  </Link>
                )}
              </PlayfulCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}