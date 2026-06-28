import type { Level } from '@/types/question';

export const LEVEL_CONFIG: {
  value: Level;
  label: string;
  badgeClass: string;
  ariaLabel: string;
}[] = [
  {
    value: 'junior',
    label: 'Junior',
    badgeClass: 'bg-junior/15 text-junior',
    ariaLabel: 'Junior difficulty',
  },
  {
    value: 'middle',
    label: 'Middle',
    badgeClass: 'bg-middle/15 text-middle',
    ariaLabel: 'Middle difficulty',
  },
  {
    value: 'senior',
    label: 'Senior',
    badgeClass: 'bg-senior/15 text-senior',
    ariaLabel: 'Senior difficulty',
  },
];

export const LEVEL_CONFIG_MAP = Object.fromEntries(
  LEVEL_CONFIG.map((config) => [config.value, config])
) as Record<Level, (typeof LEVEL_CONFIG)[number]>;

export const FILTER_LEVELS: { label: string; value: Level | 'all' }[] = [
  { label: 'All', value: 'all' },
  ...LEVEL_CONFIG.map(({ label, value }) => ({ label, value })),
];
