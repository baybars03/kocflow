export interface TYTTask {
  id: string;
  subject: 'Matematik' | 'Türkçe' | 'Sosyal' | 'Fen';
  topic: string;
  done: boolean;
}
export interface DenemeScore {
  date: string;
  turkce: number;
  matematik: number;
  sosyal: number;
  fen: number;
  totalNet: number;
}
export const TARGET_DATE = new Date('2025-06-14');
export const MOCK_TYT_TASKS: TYTTask[] = [
  { id: '1', subject: 'Matematik', topic: 'Rasyonel Sayılar', done: true },
  { id: '2', subject: 'Türkçe', topic: 'Paragrafta Anlam', done: false },
  { id: '3', subject: 'Matematik', topic: 'Temel Kavramlar', done: true },
  { id: '4', subject: 'Fen', topic: 'Hücre Bölünmeleri', done: false },
  { id: '5', subject: 'Sosyal', topic: 'Tarih ve Zaman', done: false },
];
export const MOCK_DENEME_SCORES: DenemeScore[] = [
  { date: '2024-01-10', turkce: 32, matematik: 24, sosyal: 15, fen: 12, totalNet: 83 },
  { date: '2024-01-24', turkce: 34, matematik: 26, sosyal: 14, fen: 13, totalNet: 87 },
  { date: '2024-02-07', turkce: 31, matematik: 29, sosyal: 16, fen: 14, totalNet: 90 },
  { date: '2024-02-21', turkce: 35, matematik: 32, sosyal: 17, fen: 15, totalNet: 99 },
];
export const MOCK_QUOTE = "Başarı, her gün tekrarlanan küçük çabaların toplamıdır. 🚀";
export const SUBJECT_COLORS = {
  Matematik: 'bg-playful-teal text-white',
  Türkçe: 'bg-playful-red text-white',
  Sosyal: 'bg-playful-yellow text-playful-dark',
  Fen: 'bg-green-400 text-playful-dark',
  İngilizce: 'bg-purple-400 text-white',
  'Din Kültürü': 'bg-orange-400 text-white',
  Geometri: 'bg-blue-400 text-white',
  'LGS-Matematik': 'bg-playful-teal text-white',
  'LGS-Fen': 'bg-green-400 text-playful-dark',
  'LGS-Türkçe': 'bg-playful-red text-white',
  'LGS-Sosyal': 'bg-playful-yellow text-playful-dark',
};