import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
export function StatsSection({ stats }: { stats?: any }) {
  const items = [
    { 
      label: 'Aktif Öğrenci', 
      value: stats?.activeStudents || '1.2k', 
      icon: Users, 
      color: 'bg-playful-teal',
      shadowColor: 'rgba(78,205,196,0.2)'
    },
    { 
      label: 'Net Artışı', 
      value: `%${stats?.avgNetIncrease || '18'}+`, 
      icon: TrendingUp, 
      color: 'bg-playful-red',
      shadowColor: 'rgba(255,107,107,0.2)'
    },
    { 
      label: 'Tamamlanan Görev', 
      value: stats?.totalTasksDone || '45k', 
      icon: CheckCircle2, 
      color: 'bg-playful-yellow',
      shadowColor: 'rgba(255,230,109,0.2)'
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <PlayfulCard className={`${item.color} text-center py-12 flex flex-col items-center gap-2 group`}>
            <div className="bg-white border-4 border-playful-dark p-3 rounded-2xl mb-2 shadow-playful-active group-hover:-rotate-6 transition-transform">
              <item.icon className="w-8 h-8 text-playful-dark" strokeWidth={3} />
            </div>
            <p className="text-6xl font-black text-playful-dark tracking-tighter">
              {item.value}
            </p>
            <p className="font-black text-playful-dark/60 uppercase tracking-widest text-sm">
              {item.label}
            </p>
          </PlayfulCard>
        </motion.div>
      ))}
    </section>
  );
}