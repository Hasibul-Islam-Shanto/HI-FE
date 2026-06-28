import { Level } from '@/types/question';

const LEVELS: { label: string; value: Level | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Junior', value: 'junior' },
  { label: 'Middle', value: 'middle' },
  { label: 'Senior', value: 'senior' },
];

interface FilterButtonsProps {
  active: Level | 'all';
  onChange: (value: Level | 'all') => void;
}

export function FilterButtons({ active, onChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by difficulty">
      {LEVELS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={active === value}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            active === value
              ? 'bg-aurora-indigo text-white'
              : 'border border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
