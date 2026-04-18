import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Zap, Timer, Brain, GraduationCap, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
const QUICK_QUESTIONS = [
  {
    q: "Bir sayının karesi kendisinden küçükse bu sayı hangi aralıktadır?",
    options: ["(-1, 0)", "(0, 1)", "(1, 2)", "(-1, 1)"],
    correct: 1,
    subject: "Matematik"
  },
  {
    q: '"Pek çok" kelimesinin yazımı hangisinde doğrudur?',
    options: ["Pekçok", "Pek-çok", "Pek çok", "Pekçoklar"],
    correct: 2,
    subject: "Türkçe"
  },
  {
    q: "DNA eşlenmesi hücre döngüsünün hangi evresinde gerçekleşir?",
    options: ["G1", "Metafaz", "İnterfaz (S)", "Anafaz"],
    correct: 2,
    subject: "Biyoloji"
  }
];
interface PracticeQuizPreviewProps {
  funnel?: 'öğrenci' | 'koç' | null;
}
export function PracticeQuizPreview({ funnel }: PracticeQuizPreviewProps) {
  const [step, setStep] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const handleAnswer = (idx: number) => {
    const isCorrect = idx === QUICK_QUESTIONS[currentIdx].correct;
    if (isCorrect) setCorrectCount(prev => prev + 1);
    if (currentIdx < QUICK_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setStep('results');
      if (correctCount + (isCorrect ? 1 : 0) === QUICK_QUESTIONS.length) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#4ECDC4', '#FFE66D', '#FF6B6B']
        });
      }
    }
  };
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-playful-yellow border-4 border-playful-dark px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-playful"
            >
              <Sparkles className="w-5 h-5 fill-current" /> +250 XP BOOST KAZAN!
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] uppercase tracking-tighter">
              SINIRLARINI <br />
              <span className="text-playful-red underline decoration-playful-dark decoration-[10px] underline-offset-8 italic">TEST ET! ⚡</span>
            </h2>
            <p className="text-xl md:text-3xl font-bold text-muted-foreground leading-tight max-w-xl">
              KocFlow'un akıllı soru sistemini hemen dene. 3 soruda TYT potansiyelini gör ve akışa katıl!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Timer, text: "60 Saniye Hızlı Test", color: "text-playful-teal" },
              { icon: Brain, text: "AI Destekli Analiz", color: "text-playful-red" },
              { icon: Zap, text: "Anında Feedback", color: "text-playful-yellow" },
              { icon: GraduationCap, text: "Bonus XP Ödülü", color: "text-playful-dark" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 border-4 border-playful-dark rounded-[1.5rem] bg-white font-black group hover:border-playful-red hover:-translate-y-1 transition-all shadow-playful-active">
                <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} strokeWidth={3} />
                <span className="text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[550px]">
          <div className="absolute -inset-6 bg-playful-teal/20 rounded-[4rem] -rotate-3 border-4 border-playful-dark border-dashed" />
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="h-full">
                <PlayfulCard className="bg-white p-12 relative h-full flex flex-col justify-center items-center text-center space-y-10 border-8 border-playful-dark shadow-[16px_16px_0px_0px_rgba(30,41,59,1)]">
                  <motion.div 
                    animate={{ rotate: [6, 12, 6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 bg-playful-yellow rounded-[2rem] border-4 border-playful-dark flex items-center justify-center shadow-playful"
                  >
                    <Brain className="w-12 h-12 text-playful-dark" strokeWidth={3} />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-5xl font-black uppercase italic tracking-tighter">MİNİ DENEME</h3>
                    <p className="font-bold text-muted-foreground text-xl">Potansiyelini ölçmek için 3 soruya hazır mısın?</p>
                  </div>
                  <button onClick={() => setStep('active')} className="playful-button w-full bg-playful-teal text-white text-3xl py-8 hover:scale-105 border-4">
                    Hemen Başla!
                  </button>
                </PlayfulCard>
              </motion.div>
            )}
            {step === 'active' && (
              <motion.div key="active" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="h-full">
                <PlayfulCard className="bg-white p-10 relative h-full flex flex-col justify-between border-8 border-playful-dark shadow-[16px_16px_0px_0px_rgba(30,41,59,1)]">
                  <div className="flex justify-between items-center pb-6 border-b-8 border-playful-dark">
                    <span className="font-black uppercase text-sm px-4 py-1.5 bg-playful-dark text-white rounded-xl">
                      {QUICK_QUESTIONS[currentIdx].subject}
                    </span>
                    <span className="font-black text-playful-dark tracking-widest text-2xl">{currentIdx + 1}/3</span>
                  </div>
                  <div className="flex-1 flex items-center py-10">
                    <p className="font-black text-3xl md:text-4xl leading-tight text-playful-dark italic">
                      "{QUICK_QUESTIONS[currentIdx].q}"
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {QUICK_QUESTIONS[currentIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="w-full p-5 border-4 border-playful-dark rounded-2xl font-black text-left hover:bg-playful-yellow active:bg-playful-yellow/50 transition-all text-xl shadow-playful-active active:translate-y-1 active:shadow-none"
                      >
                        <span className="inline-block w-10 h-10 bg-slate-100 border-4 border-playful-dark rounded-xl text-center leading-8 mr-4 font-black">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </PlayfulCard>
              </motion.div>
            )}
            {step === 'results' && (
              <motion.div key="results" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                <PlayfulCard className="bg-playful-yellow p-12 relative h-full flex flex-col justify-center items-center text-center space-y-8 border-8 border-playful-dark shadow-[16px_16px_0px_0px_rgba(30,41,59,1)]">
                  <div className="relative">
                    <Trophy className="w-32 h-32 text-playful-red drop-shadow-2xl animate-bounce" strokeWidth={3} />
                    <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-white animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-black uppercase tracking-tighter">HARİKA! 🎯</h3>
                    <div className="text-3xl font-black text-playful-dark">3 SORUDA {correctCount} DOĞRU!</div>
                  </div>
                  <p className="font-bold text-xl leading-snug px-4 opacity-80">
                    Sınav potansiyelin oldukça yüksek! KocFlow ile eksiklerini kapatıp netlerini %40 artırabilirsin.
                  </p>
                  <Link
                    to="/signup?role=öğrenci"
                    className="playful-button w-full bg-playful-red text-white text-3xl py-8 group hover:scale-105 border-4"
                  >
                    Ödülünü Al <ArrowRight className="w-10 h-10 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </PlayfulCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}