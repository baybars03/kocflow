import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface LevelProgressProps {
  value: number;
  label: string;
  className?: string;
}
export function LevelProgress({ value, label, className }: LevelProgressProps) {
  return (
    <div className={cn("space-y-2 w-full", className)}>
      <div className="flex justify-between items-end">
        <span className="font-black text-playful-dark text-lg">{label}</span>
        <span className="font-bold text-playful-dark/60 text-sm">{value}%</span>
      </div>
      <div className="h-8 w-full bg-white border-4 border-playful-dark rounded-xl overflow-hidden shadow-playful relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="h-full bg-playful-teal border-r-4 border-playful-dark"
        />
      </div>
    </div>
  );
}