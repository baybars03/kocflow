import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Zap, Timer, Brain, GraduationCap, ArrowRight, Sparkles, Check, X, Trophy } from 'lucide-react';
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
export function PracticeQuizPreview() {
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
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black leading-tight uppercase">
              Sınırlarını <br />
              <span className="text-playful-red underline decoration-playful-dark decoration-8 underline-offset-8">Test Et! ⚡</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed">
              KocFlow'un akıllı soru sistemini hemen dene. 3 soruda TYT potansiyelini gör!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Timer, text: "60 Saniye Hızlı Test", color: "text-playful-teal" },
              { icon: Brain, text: "AI Destekli Analiz", color: "text-playful-red" },
              { icon: Zap, text: "Anında Geri Bildirim", color: "text-playful-yellow" },
              { icon: GraduationCap, text: "Sürpriz Başlangıç XP", color: "text-playful-dark" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-2 border-playful-dark rounded-2xl bg-white font-bold">
                <item.icon className={`w-6 h-6 ${item.color}`} strokeWidth={3} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[500px]">
          <div className="absolute -inset-4 bg-playful-teal/20 rounded-[3rem] -rotate-3 border-4 border-playful-dark border-dashed" />
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="h-full">
                <PlayfulCard className="bg-white p-8 relative h-full flex flex-col justify-center items-center text-center space-y-8">
                  <div className="w-20 h-20 bg-playful-yellow rounded-2xl border-4 border-playful-dark flex items-center justify-center rotate-6 shadow-playful">
                    <Sparkles className="w-10 h-10 text-playful-dark" />
                  </div>
                  <h3 className="text-4xl font-black uppercase italic">Mini Deneme</h3>
                  <p className="font-bold text-muted-foreground">3 Soruyla hemen başla, sıralamanı öğren.</p>
                  <button onClick={() => setStep('active')} className="playful-button w-full bg-playful-teal text-white text-2xl py-6">
                    Hemen Başla!
                  </button>
                </PlayfulCard>
              </motion.div>
            )}
            {step === 'active' && (
              <motion.div key="active" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                <PlayfulCard className="bg-white p-8 relative h-full flex flex-col justify-between border-playful-dark shadow-playful">
                  <div className="flex justify-between items-center pb-4 border-b-4 border-playful-dark">
                    <span className="font-black uppercase text-xs px-3 py-1 bg-playful-dark text-white rounded-lg">
                      {QUICK_QUESTIONS[currentIdx].subject}
                    </span>
                    <span className="font-black text-playful-dark">{currentIdx + 1}/3</span>
                  </div>
                  <p className="font-black text-2xl leading-tight py-4">
                    "{QUICK_QUESTIONS[currentIdx].q}"
                  </p>
                  <div className="space-y-3">
                    {QUICK_QUESTIONS[currentIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="w-full p-4 border-2 border-playful-dark rounded-xl font-bold text-left hover:bg-playful-yellow transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </PlayfulCard>
              </motion.div>
            )}
            {step === 'results' && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                <PlayfulCard className="bg-playful-yellow p-8 relative h-full flex flex-col justify-center items-center text-center space-y-6">
                  <Trophy className="w-20 h-20 text-playful-red drop-shadow-lg" strokeWidth={3} />
                  <h3 className="text-4xl font-black uppercase">Harika! 🎯</h3>
                  <div className="text-2xl font-black">3 Soruda {correctCount} Doğru!</div>
                  <p className="font-bold">Potansiyelini tam kullanmak için KocFlow'a katıl.</p>
                  <Link to="/signup?role=öğrenci" className="playful-button w-full bg-playful-red text-white text-xl py-6 group">
                    Sonuçları Kaydet & Katıl <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
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