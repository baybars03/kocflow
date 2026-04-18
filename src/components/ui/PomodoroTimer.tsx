import React, { useState, useEffect } from 'react';
import { PlayfulCard } from './PlayfulCard';
import { Play, RotateCcw, SkipForward, Pause, Timer, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
interface PomodoroTimerProps {
  onComplete: () => void;
}
export function PomodoroTimer({ onComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);
  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;
  return (
    <PlayfulCard className={cn(
      "relative overflow-hidden transition-colors duration-500",
      isActive ? "bg-playful-red text-white border-playful-dark" : "bg-white"
    )}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Timer className={cn("w-6 h-6", isActive ? "animate-pulse" : "text-playful-dark")} />
          <span className="font-black text-sm uppercase tracking-widest">Pomodoro Odağı</span>
        </div>
        <div className="text-7xl md:text-8xl font-black tracking-tighter tabular-nums mb-4 drop-shadow-sm">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={toggle}
            className={cn(
              "flex-1 playful-button py-3 text-sm",
              isActive ? "bg-white text-playful-red" : "bg-playful-teal text-white"
            )}
          >
            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            {isActive ? "Duraklat" : "Odaklan"}
          </button>
          <button
            onClick={reset}
            className="p-4 border-4 border-playful-dark rounded-xl bg-white text-playful-dark shadow-playful hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full h-4 bg-playful-dark/10 rounded-full mt-4 overflow-hidden border-2 border-playful-dark">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-playful-yellow border-r-2 border-playful-dark"
          />
        </div>
        {timeLeft === 0 && (
          <div className="flex items-center gap-2 mt-2 text-playful-yellow font-black animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>+100 PUAN KAZANDIN!</span>
          </div>
        )}
      </div>
    </PlayfulCard>
  );
}