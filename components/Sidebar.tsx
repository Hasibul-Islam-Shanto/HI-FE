'use client';

import { topics } from '@/data';
import { useProgressStore } from '@/store/useProgressStore';

interface SidebarProps {
  activeSlug: string;
  onSelect: (slug: string) => void;
  mobileOpen: boolean;
}

function SidebarContent({ activeSlug, onSelect }: Omit<SidebarProps, 'mobileOpen'>) {
  return (
    <nav aria-label="Topics" className="space-y-1 p-3">
      {topics.map((topic) => {
        const isActive = topic.slug === activeSlug;
        return (
          <TopicItem
            key={topic.slug}
            slug={topic.slug}
            title={topic.title}
            color={topic.color}
            count={topic.questions.length}
            isActive={isActive}
            onSelect={onSelect}
          />
        );
      })}
    </nav>
  );
}

function TopicItem({
  slug,
  title,
  color,
  count,
  isActive,
  onSelect,
}: {
  slug: string;
  title: string;
  color: string;
  count: number;
  isActive: boolean;
  onSelect: (slug: string) => void;
}) {
  const knownCount = useProgressStore((s) => (s.known[slug] ?? []).length);

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onSelect(slug)}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
        isActive
          ? 'glass text-text-primary'
          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
      }`}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="flex-1 truncate">{title}</span>
      <span className="shrink-0 rounded-md bg-surface-hover px-1.5 py-0.5 text-xs text-text-secondary">
        {knownCount}/{count}
      </span>
    </button>
  );
}

export function Sidebar({ activeSlug, onSelect, mobileOpen }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block" role="tablist" aria-label="Topic navigation">
        <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <SidebarContent activeSlug={activeSlug} onSelect={onSelect} />
        </div>
      </aside>

      <aside
        className={`sidebar-drawer fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] w-72 border-r border-border bg-background-elevated lg:hidden ${
          mobileOpen ? 'sidebar-drawer-open' : ''
        }`}
        role="tablist"
        aria-label="Topic navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="h-full overflow-y-auto">
          <SidebarContent activeSlug={activeSlug} onSelect={onSelect} />
        </div>
      </aside>
    </>
  );
}
