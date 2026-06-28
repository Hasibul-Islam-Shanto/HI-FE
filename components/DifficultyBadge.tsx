import { Level } from '@/types/question';

const levelColors: Record<Level, string> = {
  junior: 'bg-junior/15 text-junior',
  middle: 'bg-middle/15 text-middle',
  senior: 'bg-senior/15 text-senior',
};

const levelLabels: Record<Level, string> = {
  junior: 'Junior difficulty',
  middle: 'Middle difficulty',
  senior: 'Senior difficulty',
};

export function DifficultyBadge({ level }: { level: Level }) {
  return (
    <span
      aria-label={levelLabels[level]}
      className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-medium uppercase ${levelColors[level]}`}
    >
      {level}
    </span>
  );
}
