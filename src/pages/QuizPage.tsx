import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Timer, Trophy, ArrowRight, Loader2, Sparkles, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { QuizResult } from '@shared/types';
const MOCK_QUESTIONS = [
  { id: '1', subject: 'Matematik', text: "x < x² ve x³ < x şartını sağlayan x değerleri hangi aralıktadır?", options: ["(-1, 0)", "(0, 1)", "(1, 2)", "(-∞, -1)"], correct: 0 },
  { id: '2', subject: 'Türkçe', text: '"Pek çok" kelimesinin yazımı hangisinde doğrudur?', options: ["Pekçok", "Pek çok", "Pek-çok", "Pek çoklar"], correct: 1 },
  { id: '3', subject: 'Matematik', text: "Ardışık 5 çift tam sayının toplamı 60 ise en büyüğü kaçtır?", options: ["14", "16", "18", "12"], correct: 1 },
  { id: '4', subject: 'Türkçe', text: '"Sessiz harf türemesi" hangisinde vardır?', options: ["Geliyor", "Hakkımız", "Gidiyor", "Bilgi"], correct: 1 },
  { id: '5', subject: 'Matematik', text: "30 sayısının %40'ı kaçtır?", options: ["10", "12", "14", "15"], correct: 1 },
];
const INITIAL_TIME = 300; // 5 mins
export function QuizPage() {
  const [step, setStep] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalScore, setFinalScore] = useState<QuizResult | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const userId = useAuth(s => s.user?.id);
  const navigate = useNavigate();
  const handleSubmit = useCallback(async (finalAnswers: number[]) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    let correctCount = 0;
    finalAnswers.forEach((ans, i) => {
      if (ans === MOCK_QUESTIONS[i].correct) correctCount++;
    });
    const timeSpent = startTimeRef.current
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : INITIAL_TIME - timeLeft;
    const results: QuizResult = {
      score: Math.floor((correctCount / MOCK_QUESTIONS.length) * 100),
      nets: correctCount - (MOCK_QUESTIONS.length - correctCount) * 0.25,
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
        console.error("Save failed", e);
      }
    }
    setFinalScore(results);
    setStep('results');
    setIsSubmitting(false);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  }, [isSubmitting, timeLeft, userId]);
  useEffect(() => {
    if (step === 'active' && !startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, [step]);
  useEffect(() => {
    let timer: any;
    if (step === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);
  useEffect(() => {
    if (timeLeft === 0 && step === 'active' && !isSubmitting) {
      handleSubmit(answers);
    }
  }, [timeLeft, step, answers, handleSubmit, isSubmitting]);
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
  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
        <p className="font-black text-2xl animate-pulse">Sonuçların Hesaplanıyor...</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[60vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
            <PlayfulCard className="bg-playful-teal text-white p-12 text-center space-y-8 border-playful-dark shadow-playful">
              <div className="w-24 h-24 bg-white rounded-3xl border-4 border-playful-dark flex items-center justify-center mx-auto rotate-6 shadow-playful">
                <Rocket className="w-12 h-12 text-playful-teal" strokeWidth={3} />
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-black uppercase tracking-tight">Mini Deneme #24</h1>
                <p className="text-xl font-bold opacity-80">5 Soru | 5 Dakika | Hızlı Net Hesabı</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-playful-dark font-black">
                <div className="bg-white p-4 rounded-2xl border-2 border-playful-dark shadow-playful-active text-sm md:text-base">
                  +250 XP Kazan
                </div>
                <div className="bg-playful-yellow p-4 rounded-2xl border-2 border-playful-dark shadow-playful-active text-sm md:text-base">
                  Sürpriz Badge
                </div>
              </div>
              <button
                onClick={() => setStep('active')}
                className="playful-button bg-playful-red text-white text-2xl w-full py-6 group"
              >
                Savaşa Başla! <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
            </PlayfulCard>
          </motion.div>
        )}
        {step === 'active' && (
          <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="flex justify-between items-center bg-white border-4 border-playful-dark p-4 rounded-2xl shadow-playful">
              <div className="flex items-center gap-2 font-black">
                <Timer className={cn("text-playful-red", timeLeft < 30 && "animate-pulse")} /> {formatTime(timeLeft)}
              </div>
              <div className="flex gap-2">
                {MOCK_QUESTIONS.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full border-2 border-playful-dark ${i === currentIdx ? 'bg-playful-yellow' : i < answers.length ? 'bg-playful-teal' : 'bg-slate-100'}`} />
                ))}
              </div>
            </div>
            <PlayfulCard className="bg-white p-10 min-h-[400px] flex flex-col justify-between border-playful-dark shadow-playful">
              <div className="space-y-6">
                <span className="bg-playful-teal/10 text-playful-teal border-2 border-playful-teal px-3 py-1 rounded-full font-black text-[10px] md:text-xs uppercase">
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
                    className="p-6 border-4 border-playful-dark rounded-2xl font-black text-lg text-left hover:bg-playful-yellow transition-all hover:-translate-y-1 shadow-playful-active active:translate-y-0"
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
                <h2 className="text-5xl font-black uppercase">Harika İş! 🏆</h2>
                <p className="font-bold text-xl opacity-70">Denemeyi başarıyla tamamladın.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Doğru', val: finalScore.correctCount, color: 'bg-playful-teal text-white' },
                  { label: 'Net', val: finalScore.nets.toFixed(2), color: 'bg-white text-playful-dark' },
                  { label: 'Kazanılan XP', val: `+${finalScore.xpEarned}`, color: 'bg-playful-red text-white' },
                  { label: 'Süre', val: `${Math.floor(finalScore.timeSpent / 60)}dk`, color: 'bg-playful-dark text-white' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.color} p-4 rounded-2xl border-4 border-playful-dark shadow-playful-active flex flex-col items-center`}>
                    <span className="text-[10px] font-black uppercase opacity-60">{stat.label}</span>
                    <span className="text-2xl font-black">{stat.val}</span>
                  </div>
                ))}
              </div>
              {!userId ? (
                <div className="bg-white p-8 rounded-3xl border-4 border-playful-dark space-y-6">
                   <div className="flex items-center justify-center gap-2 font-black text-xl">
                      <Sparkles className="text-playful-red" />
                      Puanlarını ve Gelişimini Kaydet!
                   </div>
                   <Link to="/signup" className="playful-button bg-playful-red text-white w-full py-6 text-2xl">
                     Hemen Ücretsiz Katıl!
                   </Link>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="playful-button bg-playful-dark text-white w-full py-6"
                >
                  Dashboard'a Dön
                </button>
              )}
            </PlayfulCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}