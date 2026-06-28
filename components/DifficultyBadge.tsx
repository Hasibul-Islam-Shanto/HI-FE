import type { Level } from '@/types/question';
import { LEVEL_CONFIG_MAP } from '@/lib/levelConfig';

export function DifficultyBadge({ level }: { level: Level }) {
  const config = LEVEL_CONFIG_MAP[level];

  return (
    <span
      aria-label={config.ariaLabel}
      className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-medium uppercase ${config.badgeClass}`}
    >
      {level}
    </span>
  );
}
