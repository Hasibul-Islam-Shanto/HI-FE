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
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="sr-only">Filter by difficulty</legend>
      <div className="flex flex-wrap gap-1.5">
        {LEVELS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
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
    </fieldset>
  );
}
