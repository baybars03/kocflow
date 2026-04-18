import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Timer, Trophy, ArrowRight, Loader2, Rocket, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { QuizResult } from '@shared/types';
const MOCK_QUESTIONS = [
  { id: '1', subject: 'Matematik', text: "x < x² ve x³ < x şartını sağlayan x değerleri hangi aralıktadır?", options: ["(-1, 0)", "(0, 1)", "(1, 2)", "(-∞, -1)"], correct: 0 },
  { id: '2', subject: 'Türkçe', text: '"Pek çok" kelimesinin yazımı hangisinde doğrudur?', options: ["Pek çok", "Pekçok", "Pek-çok", "Pek çoklar"], correct: 0 },
  { id: '3', subject: 'Matematik', text: "Ardışık 5 çift tam sayının toplamı 60 ise en büyüğü kaçtır?", options: ["14", "16", "18", "12"], correct: 1 },
  { id: '4', subject: 'Türkçe', text: '"Sessiz harf türemesi" hangisinde vardır?', options: ["Geliyor", "Hakkımız", "Gidiyor", "Bilgi"], correct: 1 },
  { id: '5', subject: 'Matematik', text: "30 sayısının %40'ı kaçtır?", options: ["10", "12", "14", "15"], correct: 1 },
];
const INITIAL_TIME = 300;
export function QuizPage() {
  const [step, setStep] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalScore, setFinalScore] = useState<QuizResult | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isFinalizing = useRef(false);
  const userId = useAuth(s => s.user?.id);
  const navigate = useNavigate();
  const handleSubmit = useCallback(async (finalAnswers: number[]) => {
    if (isFinalizing.current) return;
    isFinalizing.current = true;
    setIsSubmitting(true);
    let correctCount = 0;
    MOCK_QUESTIONS.forEach((q, i) => {
      if (finalAnswers[i] === q.correct) correctCount++;
    });
    // Use current timestamp vs start timestamp to calculate duration precisely
    const timeSpent = startTimeRef.current 
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : INITIAL_TIME;
    const results: QuizResult = {
      score: Math.floor((correctCount / MOCK_QUESTIONS.length) * 100),
      nets: Math.max(0, correctCount - (MOCK_QUESTIONS.length - correctCount) * 0.25),
      correctCount,
      totalQuestions: MOCK_QUESTIONS.length,
      timeSpent: Math.min(timeSpent, INITIAL_TIME),
      xpEarned: correctCount * 50 + 100
    };
    if (userId) {
      try {
        await api('/api/quizzes/complete', {
          method: 'POST',
          body: JSON.stringify({ userId, ...results })
        });
        toast.success("Netlerin başarıyla kaydedildi! ✨");
      } catch (e) {
        console.error("Quiz save failed", e);
      }
    }
    setFinalScore(results);
    setStep('results');
    setIsSubmitting(false);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  }, [userId]);
  useEffect(() => {
    let interval: any = null;
    if (step === 'active') {
      startTimeRef.current = Date.now();
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(interval);
            handleSubmit(answers);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, handleSubmit, answers]);
  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };
  if (isSubmitting && step !== 'results') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
        <p className="font-black text-2xl animate-pulse text-playful-dark italic">Sonuçların Hesaplanıyor...</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[60vh] flex flex-col justify-center font-sans">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
            <PlayfulCard className="bg-playful-teal text-white p-12 text-center space-y-8 border-playful-dark shadow-playful">
              <div className="w-24 h-24 bg-white rounded-3xl border-4 border-playful-dark flex items-center justify-center mx-auto rotate-6 shadow-playful">
                <Rocket className="w-12 h-12 text-playful-teal" strokeWidth={3} />
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-black uppercase tracking-tight">Hızlı Deneme #24</h1>
                <p className="text-xl font-bold opacity-80">5 Soru | 5 Dakika | Odaklanma Testi</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-playful-dark font-black">
                <div className="bg-white p-4 rounded-2xl border-2 border-playful-dark shadow-playful-active">
                  +250 XP Kazan
                </div>
                <div className="bg-playful-yellow p-4 rounded-2xl border-2 border-playful-dark shadow-playful-active">
                  Hızlı Net Analizi
                </div>
              </div>
              <button
                onClick={() => setStep('active')}
                className="playful-button bg-playful-red text-white text-2xl w-full py-6 group"
              >
                Başla! <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform ml-2" />
              </button>
            </PlayfulCard>
          </motion.div>
        )}
        {step === 'active' && (
          <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="flex justify-between items-center bg-white border-4 border-playful-dark p-4 rounded-2xl shadow-playful">
              <div className="flex items-center gap-2 font-black text-lg text-playful-dark">
                <Timer className={cn("text-playful-red", timeLeft < 30 && "animate-pulse")} /> {formatTime(timeLeft)}
              </div>
              <div className="flex gap-2">
                {MOCK_QUESTIONS.map((_, i) => (
                  <div key={i} className={cn(
                    "w-3 h-3 rounded-full border-2 border-playful-dark transition-colors",
                    i === currentIdx ? 'bg-playful-yellow' : i < answers.length ? 'bg-playful-teal' : 'bg-slate-100'
                  )} />
                ))}
              </div>
            </div>
            <PlayfulCard className="bg-white p-10 min-h-[400px] flex flex-col justify-between border-playful-dark shadow-playful">
              <div className="space-y-6">
                <span className="bg-playful-teal/10 text-playful-teal border-2 border-playful-teal px-3 py-1 rounded-full font-black text-xs uppercase">
                  {MOCK_QUESTIONS[currentIdx].subject}
                </span>
                <h2 className="text-2xl md:text-3xl font-black leading-tight text-playful-dark">
                  {MOCK_QUESTIONS[currentIdx].text}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
                {MOCK_QUESTIONS[currentIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="p-6 border-4 border-playful-dark rounded-2xl font-black text-lg text-left hover:bg-playful-yellow transition-all hover:-translate-y-1 shadow-playful-active text-playful-dark"
                  >
                    <span className="inline-block w-8 h-8 bg-slate-100 border-2 border-playful-dark rounded-lg text-center leading-7 mr-4">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </PlayfulCard>
          </motion.div>
        )}
        {step === 'results' && finalScore && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <PlayfulCard className="bg-playful-yellow p-12 text-center space-y-8 border-playful-dark shadow-playful">
              <div className="space-y-2">
                <Trophy className="w-20 h-20 text-playful-red mx-auto drop-shadow-lg" strokeWidth={3} />
                <h2 className="text-5xl font-black uppercase tracking-tighter text-playful-dark">MÜKEMMEL! 🏆</h2>
                <p className="font-bold text-xl opacity-70 text-playful-dark">Deneme başarıyla tamamlandı.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Doğru', val: finalScore.correctCount, color: 'bg-playful-teal text-white' },
                  { label: 'Net', val: finalScore.nets.toFixed(2), color: 'bg-white text-playful-dark' },
                  { label: 'XP', val: `+${finalScore.xpEarned}`, color: 'bg-playful-red text-white' },
                  { label: 'Süre', val: `${Math.floor(finalScore.timeSpent / 60)}dk`, color: 'bg-playful-dark text-white' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.color} p-4 rounded-2xl border-4 border-playful-dark shadow-playful-active flex flex-col items-center`}>
                    <span className="text-[10px] font-black uppercase opacity-60">{stat.label}</span>
                    <span className="text-2xl font-black">{stat.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="playful-button bg-playful-dark text-white w-full py-6 text-xl"
                >
                  <Home className="w-6 h-6 mr-2" /> Paneline Dön
                </button>
                <Link to="/progress" className="font-black text-playful-dark/60 hover:text-playful-dark underline">
                  Tüm Analizlerini Gör
                </Link>
              </div>
            </PlayfulCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}