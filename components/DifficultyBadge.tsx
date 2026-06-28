import { Level } from '@/types/question';

const levelColors: Record<Level, string> = {
  junior: 'bg-junior/15 text-junior',
  middle: 'bg-middle/15 text-middle',
  senior: 'bg-senior/15 text-senior',
};

export function DifficultyBadge({ level }: { level: Level }) {
  return (
    <span
      className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-medium uppercase ${levelColors[level]}`}
    >
      {level}
    </span>
  );
}
