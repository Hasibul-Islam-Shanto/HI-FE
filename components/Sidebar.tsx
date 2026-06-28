'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { RefObject } from 'react';
import type { TopicSummary } from '@/types/question';
import { useKnownCount } from '@/store/useProgressStore';

interface SidebarProps {
  summaries: TopicSummary[];
  mobileOpen: boolean;
  mobileDrawerRef?: RefObject<HTMLElement | null>;
  onNavigate?: () => void;
}

function SidebarContent({
  summaries,
  activeSlug,
  onNavigate,
}: {
  summaries: TopicSummary[];
  activeSlug: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1 p-3">
      {summaries.map((topic) => (
        <li key={topic.slug}>
          <TopicItem
            topic={topic}
            isActive={topic.slug === activeSlug}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}

function TopicItem({
  topic,
  isActive,
  onNavigate,
}: {
  topic: TopicSummary;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const knownCount = useKnownCount(topic.slug);

  return (
    <Link
      href={`/${topic.slug}`}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
        isActive
          ? 'glass text-text-primary'
          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
      }`}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: topic.color }}
        aria-hidden="true"
      />
      <span className="flex-1 truncate">{topic.title}</span>
      <span className="shrink-0 rounded-md bg-surface-hover px-1.5 py-0.5 text-xs text-text-secondary">
        {knownCount}/{topic.questionCount}
      </span>
    </Link>
  );
}

export function Sidebar({
  summaries,
  mobileOpen,
  mobileDrawerRef,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const activeSlug = pathname.split('/').filter(Boolean)[0] ?? summaries[0]?.slug ?? '';

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block" aria-label="Topics">
        <nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <SidebarContent
            summaries={summaries}
            activeSlug={activeSlug}
          />
        </nav>
      </aside>

      <aside
        ref={mobileDrawerRef}
        id="mobile-topic-nav"
        inert={!mobileOpen}
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-label="Topics"
        className={`sidebar-drawer fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] w-72 border-r border-border bg-background-elevated lg:hidden ${
          mobileOpen ? 'sidebar-drawer-open' : ''
        }`}
      >
        <nav className="h-full overflow-y-auto">
          <SidebarContent
            summaries={summaries}
            activeSlug={activeSlug}
            onNavigate={onNavigate}
          />
        </nav>
      </aside>
    </>
  );
}
