import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Users, TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
export function StatsSection({ stats }: { stats?: any }) {
  const items = [
    {
      label: 'Aktif Öğrenci',
      value: stats?.activeStudents || '1.2k+',
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
      value: stats?.totalTasksDone || '45k+',
      icon: CheckCircle2,
      color: 'bg-playful-yellow/10',
      iconColor: 'text-playful-yellow'
    },
  ];
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <PlayfulCard className={`${item.color} text-center py-12 flex flex-col items-center gap-3 group border-playful-dark shadow-playful relative overflow-hidden`}>
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white border-2 border-playful-dark p-3 rounded-2xl mb-2 shadow-playful-active"
              >
                <item.icon className={`w-8 h-8 ${item.iconColor}`} strokeWidth={3} />
              </motion.div>
              <p className="text-6xl font-black text-playful-dark tracking-tighter leading-none">
                {item.value}
              </p>
              <p className="font-black text-playful-dark/50 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                {item.label}
              </p>
            </PlayfulCard>
          </motion.div>
        ))}
      </section>
      <div className="flex flex-wrap items-center justify-center gap-6 px-4 py-8 border-4 border-dashed border-playful-dark/10 rounded-[2rem]">
        <div className="flex items-center gap-2 font-black text-muted-foreground uppercase text-xs">
          <Award className="w-5 h-5 text-playful-yellow fill-current" />
          50+ Okul Tarafından Onaylı
        </div>
        <div className="h-4 w-[2px] bg-slate-200 hidden md:block" />
        <div className="flex items-center gap-2 font-black text-muted-foreground uppercase text-xs">
          <CheckCircle2 className="w-5 h-5 text-playful-teal" />
          MEB Müfredatı İle %100 Uyumlu
        </div>
      </div>
    </div>
  );
}