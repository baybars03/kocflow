import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { ArrowLeft, Star, Users, CheckCircle2, TrendingUp, Award, Quote, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { CoachProfile } from '@shared/types';
import { toast } from 'sonner';
export function CoachProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useAuth(s => s.user?.id);
  const userRole = useAuth(s => s.user?.role);
  const assignedCoachId = useAuth(s => s.user?.assignedCoachId);
  const { data: coach, isLoading } = useQuery({
    queryKey: ['coach', id],
    queryFn: () => api<CoachProfile>(`/api/coaches/${id}`),
    enabled: !!id
  });
  const assignMutation = useMutation({
    mutationFn: () => api('/api/coaches/assign', {
      method: 'POST',
      body: JSON.stringify({ userId, coachId: id })
    }),
    onSuccess: () => {
      toast.success("Koç başarıyla atandı! Panele yönlendiriliyorsun.");
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
      // In a real app, we'd update the local user state here
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  });
  const handleStart = () => {
    if (!userId) {
      navigate('/login');
      return;
    }
    if (userRole !== 'öğrenci') {
      toast.error("Sadece öğrenciler koç seçebilir!");
      return;
    }
    assignMutation.mutate();
  };
  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-playful-teal w-12 h-12" /></div>;
  if (!coach) return <div className="text-center py-20 font-black">Koç bulunamadı!</div>;
  const isCurrentCoach = assignedCoachId === id;
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigate('/marketplace')} className="flex items-center gap-2 font-black hover:text-playful-red transition-colors">
        <ArrowLeft className="w-5 h-5" strokeWidth={3} /> Marketplace'e Dön
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <PlayfulCard className="p-0 overflow-hidden border-playful-dark">
            <img src={coach.avatarUrl} alt={coach.displayName} className="w-full aspect-square object-cover" />
            <div className="p-6 text-center space-y-4">
              <h1 className="text-3xl font-black">{coach.displayName}</h1>
              <div className="flex items-center justify-center gap-1 text-2xl font-black">
                <Star className="fill-playful-yellow text-playful-yellow" /> {coach.rating}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {coach.specialties.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-playful-yellow/20 border-2 border-playful-dark rounded text-[10px] font-black uppercase">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </PlayfulCard>
          <PlayfulCard className="bg-white border-playful-dark shadow-playful space-y-4">
            <h3 className="font-black text-xl border-b-4 border-slate-100 pb-2">Başarı İstatistikleri</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                 <span className="font-bold text-muted-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Başarı Oranı</span>
                 <span className="font-black">%{coach.successRate}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="font-bold text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4" /> Öğrenci</span>
                 <span className="font-black">{coach.studentCount}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="font-bold text-muted-foreground flex items-center gap-2"><Award className="w-4 h-4" /> Tecrübe</span>
                 <span className="font-black">10+ Yıl</span>
               </div>
            </div>
          </PlayfulCard>
        </div>
        <div className="md:col-span-2 space-y-8">
          <PlayfulCard className="bg-white border-playful-dark shadow-playful space-y-6 p-10">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-black tracking-tight flex items-center gap-2">Hakkında <Sparkles className="text-playful-yellow" /></h2>
              <div className="text-3xl font-black text-playful-teal">₺{coach.price}<span className="text-sm">/ay</span></div>
            </div>
            <p className="text-xl font-bold text-muted-foreground leading-relaxed">
              {coach.bio}
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
               <h4 className="font-black mb-2 flex items-center gap-2"><CheckCircle2 className="text-playful-teal" /> Neler Sunuyorum?</h4>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-bold text-muted-foreground">
                 <li>• Kişiye Özel Çalışma Programı</li>
                 <li>• Haftalık Birebir Görüntülü Görüşme</li>
                 <li>• 7/24 Sınırsız Mesaj Desteği</li>
                 <li>• Deneme Analizi & Strateji Geliştirme</li>
               </ul>
            </div>
            {isCurrentCoach ? (
              <div className="p-4 bg-playful-teal/10 border-4 border-playful-teal rounded-2xl flex items-center justify-between">
                <p className="font-black text-playful-teal">Bu senin mevcut koçun! ✅</p>
                <Link to="/dashboard" className="playful-button bg-playful-teal text-white py-2 text-sm">Mesaj At</Link>
              </div>
            ) : (
              <button
                onClick={handleStart}
                disabled={assignMutation.isPending}
                className="w-full playful-button bg-playful-red text-white text-3xl py-8 shadow-playful hover:shadow-playful-hover active:translate-y-1"
              >
                {assignMutation.isPending ? <Loader2 className="animate-spin" /> : "Bu Koçla Başla! 🚀"}
              </button>
            )}
          </PlayfulCard>
          <div className="space-y-6">
            <h3 className="text-2xl font-black px-2">Öğrenci Yorumları</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Selin B.", text: "Ahmet hocam sayesinde matematikteki o aşılmaz duvarları yıktım. Kesinlikle tavsiye ederim!" },
                { name: "Mert K.", text: "Süre yönetimini onun taktikleriyle öğrendim. Netlerimdeki artış inanılmaz." }
              ].map((rev, i) => (
                <PlayfulCard key={i} className="bg-white border-playful-dark flex gap-4">
                  <div className="p-3 bg-playful-yellow rounded-xl border-2 border-playful-dark h-fit">
                    <Quote className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-lg leading-tight mb-2">"{rev.text}"</p>
                    <p className="font-black text-sm text-playful-red">{rev.name}</p>
                  </div>
                </PlayfulCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}