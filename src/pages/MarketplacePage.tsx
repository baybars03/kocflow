import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '@/lib/api-client';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Search, Star, Users, ArrowRight, Loader2, CheckCircle, GraduationCap } from 'lucide-react';
import type { CoachProfile } from '@shared/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
export function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const assignedCoachId = useAuth((s) => s.user?.assignedCoachId);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  // Initialize search from URL params
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) setSearch(query);
  }, [searchParams]);
  const { data: coaches, isLoading } = useQuery({
    queryKey: ['coaches'],
    queryFn: () => api<CoachProfile[]>('/api/coaches'),
  });
  const specialties = Array.from(new Set(coaches?.flatMap(c => c.specialties) || []));
  const filteredCoaches = coaches?.filter(c => {
    const matchesSearch = c.displayName.toLowerCase().includes(search.toLowerCase()) ||
                         c.specialties.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
                         c.bio.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || c.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight">KocFlow Marketplace 🏢</h1>
        <p className="text-lg font-bold text-muted-foreground">Başarıya giden yolda sana rehberlik edecek en iyi akışı ve koçu bul.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-playful-teal transition-colors" />
          <input
            type="text"
            placeholder="Koç ismi, branş veya uzmanlık ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="playful-input w-full pl-12 h-14 text-lg"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedSpecialty(null)}
            className={cn(
              "playful-button py-2 px-6 whitespace-nowrap text-sm",
              !selectedSpecialty ? "bg-playful-dark text-white" : "bg-white"
            )}
          >
            Hepsi
          </button>
          {specialties.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSpecialty(s)}
              className={cn(
                "playful-button py-2 px-6 whitespace-nowrap text-sm",
                selectedSpecialty === s ? "bg-playful-red text-white" : "bg-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-playful-teal w-12 h-12" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoaches?.map((coach) => (
            <PlayfulCard key={coach.id} className="p-0 overflow-hidden flex flex-col group h-full hover:scale-[1.02] transition-transform">
              <div className="aspect-square relative overflow-hidden border-b-4 border-playful-dark">
                <img src={coach.avatarUrl} alt={coach.displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge variant="warning" className="text-sm px-3 py-1 bg-white/90 backdrop-blur">
                    ₺{coach.price}/ay
                  </Badge>
                </div>
                {coach.isVerified && (
                  <div className="absolute bottom-4 right-4 bg-playful-teal text-white p-2 rounded-xl border-2 border-playful-dark shadow-playful-active">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black group-hover:text-playful-red transition-colors">{coach.displayName}</h3>
                  <div className="flex items-center gap-1 font-black">
                    <Star className="w-4 h-4 fill-playful-yellow text-playful-yellow" /> {coach.rating}
                  </div>
                </div>
                <p className="text-sm font-bold text-muted-foreground line-clamp-3">
                  {coach.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {coach.specialties.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 border-2 border-playful-dark rounded text-[10px] font-black uppercase">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pt-4 mt-auto border-t-2 border-dashed border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-muted-foreground text-sm">
                    <Users className="w-4 h-4" /> {coach.studentCount} Öğrenci
                  </div>
                  {assignedCoachId === coach.id ? (
                    <Link to="/messages" className="playful-button bg-playful-teal text-white py-2 px-4 text-xs">
                      Senin Koçun
                    </Link>
                  ) : (
                    <Link to={`/coach/${coach.id}`} className="playful-button bg-white text-playful-dark py-2 px-4 text-sm group-hover:-translate-x-1">
                      İncele <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </PlayfulCard>
          ))}
          {filteredCoaches?.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
               <GraduationCap className="w-20 h-20 mx-auto text-slate-200" />
               <p className="text-2xl font-black text-slate-400">Aradığın kriterlerde koç bulunamadı.</p>
               <button onClick={() => { setSearch(''); setSelectedSpecialty(null); }} className="text-playful-teal font-black underline">Aramayı temizle</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}