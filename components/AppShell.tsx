'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import type { TopicSummary } from '@/types/question';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface AppShellProps {
  summaries: TopicSummary[];
  children: ReactNode;
}

export function AppShell({ summaries, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const drawer = mobileDrawerRef.current;
    const focusable = drawer
      ? Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusable[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSidebar();
        return;
      }

      if (e.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [sidebarOpen, closeSidebar]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar
        menuButtonRef={menuButtonRef}
        menuExpanded={sidebarOpen}
        onMenuToggle={() => setSidebarOpen((open) => !open)}
      />

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Sidebar
            summaries={summaries}
            mobileOpen={sidebarOpen}
            mobileDrawerRef={mobileDrawerRef}
            onNavigate={closeSidebar}
          />

          <div className="animate-fade-in min-h-screen flex-1 px-4 pb-6 sm:px-6 lg:pl-8 lg:pr-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
