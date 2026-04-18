import React from 'react';
import { PlayfulCard } from '@/components/ui/PlayfulCard';
import { MOCK_DENEME_SCORES } from '@shared/mock-tyt-data';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
export function ProgressPage() {
  const chartData = MOCK_DENEME_SCORES.map(score => ({
    ...score,
    formattedDate: format(parseISO(score.date), 'd MMM', { locale: tr })
  }));
  const latestScore = MOCK_DENEME_SCORES[MOCK_DENEME_SCORES.length - 1];
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black text-playful-dark">Net Takibi</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Türkçe', value: latestScore.turkce, color: 'text-playful-red' },
          { label: 'Matematik', value: latestScore.matematik, color: 'text-playful-teal' },
          { label: 'Sosyal', value: latestScore.sosyal, color: 'text-playful-yellow' },
          { label: 'Fen', value: latestScore.fen, color: 'text-green-500' },
        ].map((item) => (
          <PlayfulCard key={item.label} className="flex flex-col items-center py-4">
            <span className="text-sm font-black uppercase text-muted-foreground">{item.label}</span>
            <span className={cn("text-3xl font-black", item.color)}>{item.value}</span>
          </PlayfulCard>
        ))}
      </div>
      <PlayfulCard className="p-4 md:p-8 min-h-[450px]">
        <div className="mb-6">
          <h2 className="text-2xl font-black">Net Gelişimi</h2>
          <p className="font-medium text-muted-foreground">Son deneme sınavlarındaki performansın</p>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontWeight: 'bold', fill: '#1e293b' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontWeight: 'bold', fill: '#1e293b' }}
                domain={[0, 120]}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '1rem', 
                  border: '3px solid #1e293b',
                  boxShadow: '4px 4px 0px 0px rgba(30,41,59,1)',
                  fontWeight: 'bold'
                }} 
              />
              <Legend verticalAlign="top" height={36}/>
              <Line 
                name="Toplam Net"
                type="monotone" 
                dataKey="totalNet" 
                stroke="#1e293b" 
                strokeWidth={5} 
                dot={{ r: 8, fill: '#1e293b', strokeWidth: 0 }}
                activeDot={{ r: 10, strokeWidth: 0 }}
              />
              <Line 
                name="Türkçe"
                type="monotone" 
                dataKey="turkce" 
                stroke="#FF6B6B" 
                strokeWidth={3} 
                dot={{ r: 4 }}
              />
              <Line 
                name="Matematik"
                type="monotone" 
                dataKey="matematik" 
                stroke="#4ECDC4" 
                strokeWidth={3} 
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PlayfulCard>
      <PlayfulCard className="bg-playful-dark text-white text-center py-8">
        <h3 className="text-2xl font-black mb-2">Harika Gidiyorsun!</h3>
        <p className="font-medium opacity-80">Ortalama netin son aya göre %12 arttı. Pes etmek yok!</p>
      </PlayfulCard>
    </div>
  );
}
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}