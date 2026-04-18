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
    <div className={cn("space-y-3 w-full", className)}>
      <div className="flex justify-between items-end px-1">
        <span className="font-black text-playful-dark text-xl tracking-tight">{label}</span>
        <span className="font-black text-playful-dark/40 text-sm bg-slate-100 px-3 py-1 rounded-full border-2 border-playful-dark/5">%{value}</span>
      </div>
      <div className="h-10 w-full bg-white border-4 border-playful-dark rounded-[1.25rem] overflow-hidden shadow-playful relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 70, 
            damping: 12, // Lower damping for more "elastic" feel
            mass: 0.8
          }}
          className="h-full bg-playful-teal border-r-4 border-playful-dark relative"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          {/* Contrasting end cap indicator */}
          <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-playful-dark opacity-20" />
        </motion.div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}