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
    <section className="py-6 bg-white border-y-4 border-playful-dark">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-center gap-2">
          <BookOpenCheck className="w-5 h-5 text-playful-teal/40" strokeWidth={3} />
          <h2 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-playful-dark/30 text-center">
            Özel Deneme Sponsorlarımız
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {SPONSORS.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2"
            >
              <div className={`px-4 py-1.5 rounded-xl border-2 border-playful-dark shadow-playful-active font-black text-sm md:text-lg ${sponsor.color} ${sponsor.textColor}`}>
                {sponsor.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}