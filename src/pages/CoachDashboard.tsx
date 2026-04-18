import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { User, TrendingUp, ChevronRight, GraduationCap, Loader2, Users } from 'lucide-react';
import { LevelProgress } from '@/components/ui/LevelProgress';
import type { User as UserType } from '@shared/types';
export function CoachDashboard() {
  const { data: students, isLoading } = useQuery({
    queryKey: ['coach-students'],
    queryFn: () => api<UserType[]>('/api/coach/students'),
  });
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-playful-dark">
            Öğrencilerim 👨‍🏫
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            Rehberlik ettiğin öğrencilerin gelişimini buradan takip edebilirsin.
          </p>
        </div>
        <PlayfulCard className="bg-playful-teal text-white flex items-center gap-4 py-4 px-8 border-playful-dark shadow-playful">
          <Users className="w-10 h-10" strokeWidth={3} />
          <div className="flex flex-col">
            <span className="text-3xl font-black leading-none">{students?.length || 0}</span>
            <span className="text-sm font-bold uppercase tracking-widest">Öğrenci</span>
          </div>
        </PlayfulCard>
      </div>
      {isLoading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="w-12 h-12 animate-spin text-playful-red" />
        </div>
      ) : students && students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <PlayfulCard key={student.id} className="group flex flex-col gap-6 hover:border-playful-teal">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-playful-yellow border-4 border-playful-dark rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-playful-dark" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg truncate w-32">{student.email.split('@')[0]}</h3>
                    <p className="text-xs font-bold text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-playful-dark text-white rounded text-[10px] font-black uppercase">
                  Lvl 4
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Son Net</span>
                  <span className="text-playful-red">84.50</span>
                </div>
                <LevelProgress value={65} label="Hedefe İlerleme" className="!space-y-1" />
              </div>
              <button className="playful-button bg-white w-full text-sm py-2 mt-2 group-hover:bg-playful-teal group-hover:text-white transition-colors">
                Gelişimi Gör <ChevronRight className="w-4 h-4" />
              </button>
            </PlayfulCard>
          ))}
        </div>
      ) : (
        <PlayfulCard className="bg-white text-center py-20 border-dashed border-4 border-slate-200 shadow-none">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-slate-400">Henüz Öğrenci Yok</h3>
          <p className="text-slate-400 font-bold mt-2">Atanmış bir öğrencin bulunduğunda burada görünecek.</p>
        </PlayfulCard>
      )}
    </div>
  );
}