import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useCoaches } from '@/hooks/use-tyt-api';
import { CoachStudentChat } from '@/components/chat/CoachStudentChat';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, ArrowLeft, Users, Loader2 } from 'lucide-react';
export default function MessagesPage() {
  const userId = useAuth((s) => s.user?.id);
  const assignedCoachId = useAuth((s) => s.user?.assignedCoachId);
  const { data: coaches, isLoading } = useCoaches();
  const assignedCoach = React.useMemo(() => {
    if (!coaches || !assignedCoachId) return null;
    return coaches.find((c) => c.id === assignedCoachId);
  }, [coaches, assignedCoachId]);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-playful-teal" />
        <p className="font-black text-xl text-playful-dark">Mesajlar Yükleniyor...</p>
      </div>
    );
  }
  if (!assignedCoachId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20 flex flex-col items-center text-center space-y-8">
          <div className="w-24 h-24 bg-playful-yellow border-4 border-playful-dark rounded-[2rem] flex items-center justify-center shadow-playful rotate-3">
            <MessageCircle className="w-12 h-12 text-playful-dark" strokeWidth={3} />
          </div>
          <div className="space-y-4 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-black text-playful-dark tracking-tighter uppercase">Henüz Bir Koçun Yok!</h1>
            <p className="text-lg font-bold text-muted-foreground">
              Mesajlaşmaya başlamak için Marketplace üzerinden kendine bir koç seçmelisin.
            </p>
          </div>
          <Link to="/marketplace" className="playful-button bg-playful-teal text-white py-6 px-10 text-xl">
            <ShoppingBag className="w-6 h-6 mr-2" /> Koçları İncele
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-3 border-4 border-playful-dark rounded-xl bg-white shadow-playful-active hover:-translate-x-1 transition-all">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl border-4 border-playful-dark overflow-hidden shadow-playful-active">
                <img src={assignedCoach?.avatarUrl} alt={assignedCoach?.displayName} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-playful-dark leading-tight">{assignedCoach?.displayName}</h1>
                <p className="text-sm font-bold text-playful-teal flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Senin Koçun
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-3">
            <Link to={`/coach/${assignedCoachId}`} className="playful-button bg-white text-sm py-2 px-4">
              <Users className="w-4 h-4 mr-2" /> Profil
            </Link>
          </div>
        </div>
        <div className="h-[600px] md:h-[700px]">
          <CoachStudentChat otherUserId={assignedCoachId} />
        </div>
      </div>
    </div>
  );
}