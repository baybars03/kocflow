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
      color: 'bg-playful-teal/10',
      iconColor: 'text-playful-teal'
    },
    {
      label: 'Net Artışı',
      value: `%${stats?.avgNetIncrease || '18'}+`,
      icon: TrendingUp,
      color: 'bg-playful-red/10',
      iconColor: 'text-playful-red'
    },
    {
      label: 'Tamamlanan Görev',
      value: stats?.totalTasksDone || '45k',
      icon: CheckCircle2,
      color: 'bg-playful-yellow/10',
      iconColor: 'text-playful-yellow'
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <PlayfulCard className={`${item.color} text-center py-10 flex flex-col items-center gap-2 group border-playful-dark shadow-playful`}>
            <div className="bg-white border-2 border-playful-dark p-2 rounded-xl mb-1 shadow-playful-active">
              <item.icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={3} />
            </div>
            <p className="text-5xl font-black text-playful-dark tracking-tighter">
              {item.value}
            </p>
            <p className="font-black text-playful-dark/40 uppercase tracking-widest text-[10px] md:text-xs">
              {item.label}
            </p>
          </PlayfulCard>
        </motion.div>
      ))}
    </section>
  );
}