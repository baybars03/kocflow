import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Loader2 } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useAITutor } from '@/hooks/use-tyt-api';
import { cn } from '@/lib/utils';
export function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: 'Selam! Ben senin TYT koçunum. Bugün sana nasıl yardımcı olabilirim? ✨' }
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const askAI = useAITutor();
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim() || askAI.isPending) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    askAI.mutate(userMsg, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'bot', content: data.content }]);
      }
    });
  };
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px]"
          >
            <PlayfulCard className="bg-white p-0 overflow-hidden flex flex-col h-[500px]">
              <div className="bg-playful-teal p-4 border-b-4 border-playful-dark flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  <span className="font-black text-lg">TYT Kampüs Asistanı</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl border-2 border-playful-dark font-bold text-sm shadow-playful-active",
                      msg.role === 'user' ? "bg-playful-yellow text-playful-dark" : "bg-white text-playful-dark"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {askAI.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl border-2 border-playful-dark shadow-playful-active">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t-4 border-playful-dark bg-white">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Bir soru sor..."
                    className="flex-1 playful-input"
                  />
                  <button onClick={handleSend} className="p-3 bg-playful-red text-white rounded-xl border-2 border-playful-dark shadow-playful-active">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </PlayfulCard>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-playful-red text-white border-4 border-playful-dark rounded-full shadow-playful flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      >
        <Sparkles className="w-8 h-8 fill-current" />
      </button>
    </div>
  );
}