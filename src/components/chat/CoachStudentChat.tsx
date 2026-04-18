import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, CheckCheck } from 'lucide-react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { useChat } from '@/hooks/use-tyt-api';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
interface CoachStudentChatProps {
  otherUserId: string;
}
export function CoachStudentChat({ otherUserId }: CoachStudentChatProps) {
  const currentUserId = useAuth(s => s.user?.id);
  const { data: messages, isLoading, sendMessage } = useChat(otherUserId, currentUserId);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = () => {
    if (!input.trim() || !currentUserId || sendMessage.isPending) return;
    sendMessage.mutate({
      senderId: currentUserId,
      receiverId: otherUserId,
      text: input.trim()
    }, {
      onSuccess: () => setInput('')
    });
  };
  return (
    <PlayfulCard className="p-0 overflow-hidden flex flex-col h-[600px] bg-white border-4 border-playful-dark shadow-playful">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-playful-teal" /></div>
        ) : messages?.length === 0 ? (
          <div className="text-center py-20 text-slate-300 font-bold">Mesajlaşma başlatılmadı. Merhaba de! 👋</div>
        ) : (
          messages?.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.senderId === currentUserId ? "justify-end" : "justify-start")}>
              <div className="max-w-[70%]">
                <div className={cn(
                  "p-3 rounded-2xl border-2 border-playful-dark font-bold shadow-playful-active",
                  msg.senderId === currentUserId ? "bg-playful-teal text-white" : "bg-white text-playful-dark"
                )}>
                  <p>{msg.text}</p>
                </div>
                <div className={cn("flex items-center gap-1 mt-1 text-[10px] font-black uppercase text-muted-foreground", msg.senderId === currentUserId ? "justify-end" : "justify-start")}>
                  {format(msg.timestamp, 'HH:mm')}
                  {msg.senderId === currentUserId && <CheckCheck className="w-3 h-3 text-playful-teal" />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 bg-white border-t-4 border-playful-dark">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mesajınızı yazın..."
            className="flex-1 playful-input"
          />
          <button
            onClick={handleSend}
            disabled={sendMessage.isPending}
            className="px-6 bg-playful-teal text-white font-black rounded-xl border-2 border-playful-dark shadow-playful-active active:translate-y-0.5"
          >
            {sendMessage.isPending ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </PlayfulCard>
  );
}