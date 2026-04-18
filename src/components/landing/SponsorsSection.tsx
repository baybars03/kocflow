import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { ShieldCheck, BookOpenCheck } from 'lucide-react';
import { motion } from 'framer-motion';
const SPONSORS = [
  { name: 'Palme', color: 'bg-green-500', textColor: 'text-white' },
  { name: 'Limit', color: 'bg-playful-red', textColor: 'text-white' },
  { name: 'Fem', color: 'bg-purple-600', textColor: 'text-white' },
];
export function SponsorsSection() {
  return (
    <section className="py-12 bg-white border-y-4 border-playful-dark">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-center gap-3">
          <BookOpenCheck className="w-6 h-6 text-playful-teal" strokeWidth={3} />
          <h2 className="text-xl font-black uppercase tracking-widest text-playful-dark/40 text-center">
            Özel Deneme Sponsorlarımız
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {SPONSORS.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              whileHover={{ y: -5, rotate: i % 2 === 0 ? 2 : -2 }}
              className="flex items-center gap-2"
            >
              <div className={`px-6 py-3 rounded-2xl border-4 border-playful-dark shadow-playful font-black text-2xl ${sponsor.color} ${sponsor.textColor}`}>
                {sponsor.name}
              </div>
              <ShieldCheck className="w-6 h-6 text-playful-teal" strokeWidth={3} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}