import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCoaches } from '@/hooks/use-tyt-api';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { Star, ArrowRight, Loader2, Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';
export function PopularCoaches() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: coaches, isLoading } = useCoaches();
  const topCoaches = coaches?.slice(0, 3) || [];
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };
  return (
    <section className="space-y-16 py-20 bg-slate-50 border-y-8 border-playful-dark -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Search Funnel */}
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">İdeal Koçunu Bul 🔍</h2>
            <p className="font-bold text-muted-foreground text-lg">Binlerce uzman arasından sana en uygun olanı saniyeler içinde filtrele.</p>
          </div>
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Branş, isim veya konu ara... (Örn: Matematik)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-16 md:h-20 playful-input pl-14 pr-32 md:pr-48 text-lg md:text-xl font-bold"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-playful-dark/40 group-focus-within:text-playful-teal transition-colors" />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-playful-teal text-white border-2 border-playful-dark rounded-xl px-4 md:px-8 font-black text-sm md:text-lg shadow-playful-active hover:-translate-y-0.5 transition-all"
            >
              Koç Ara
            </button>
          </form>
        </div>
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Öne Çıkan Uzmanlar ⭐️</h3>
              <p className="font-bold text-muted-foreground">KocFlow topluluğunun en sevdiği rehberler.</p>
            </div>
            <Link to="/marketplace" className="playful-button bg-playful-yellow text-lg py-4 px-8 hidden md:inline-flex">
              Tüm Koçları Gör <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-playful-red w-12 h-12" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topCoaches.map((coach, i) => (
                <motion.div
                  key={coach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full"
                >
                  <PlayfulCard className="p-0 overflow-hidden flex flex-col h-full bg-white group border-playful-dark shadow-playful hover:-translate-y-2 transition-all">
                    <div className="aspect-[4/3] relative overflow-hidden border-b-4 border-playful-dark">
                      <img src={coach.avatarUrl} alt={coach.displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <div className="bg-playful-yellow border-2 border-playful-dark px-3 py-1 rounded-full font-black text-xs shadow-playful-active">
                          NEW STAR
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h4 className="text-2xl font-black">{coach.displayName}</h4>
                        <div className="flex items-center gap-1 font-black bg-slate-100 px-2 py-1 rounded-lg border-2 border-playful-dark">
                          <Star className="w-4 h-4 fill-playful-yellow text-playful-yellow" /> {coach.rating}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialties.slice(0, 2).map(s => (
                          <span key={s} className="px-2 py-0.5 bg-playful-teal/20 border-2 border-playful-dark rounded text-[10px] font-black uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 mt-auto border-t-2 border-dashed border-slate-100 font-bold text-muted-foreground text-sm">
                         <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {coach.studentCount} Öğrenci</span>
                         <Link to={`/coach/${coach.id}`} className="text-playful-red hover:underline flex items-center gap-1 font-black">
                           Şimdi Seç <ArrowRight className="w-4 h-4" />
                         </Link>
                      </div>
                    </div>
                  </PlayfulCard>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center md:hidden pt-4">
            <Link to="/marketplace" className="playful-button bg-playful-yellow w-full text-lg py-5 px-8">
              Tüm Koçları Gör <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}