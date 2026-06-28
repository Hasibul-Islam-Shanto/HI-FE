"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { topics } from "@/data";
import { ListView } from "@/components/ListView";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Home() {
  const [activeTopicSlug, setActiveTopicSlug] = useState(topics[0].slug);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const activeTopic =
    topics.find((t) => t.slug === activeTopicSlug) ?? topics[0];

  const handleTopicSelect = useCallback((slug: string) => {
    setActiveTopicSlug(slug);
    setSidebarOpen(false);
  }, []);

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
      if (e.key === "Escape") {
        closeSidebar();
        return;
      }

      if (e.key !== "Tab" || focusable.length === 0) return;

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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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

      <div className="pt-10 max-w-7xl mx-auto">
        <div className="flex">
          <Sidebar
            activeSlug={activeTopicSlug}
            onSelect={handleTopicSelect}
            mobileOpen={sidebarOpen}
            mobileDrawerRef={mobileDrawerRef}
          />

          <main
            id="main-content"
            className="animate-fade-in min-h-screen flex-1 px-4 pb-6 sm:px-6 lg:pl-8 lg:pr-8"
          >
            <section aria-labelledby={`topic-${activeTopic.slug}-heading`}>
              <ListView key={activeTopic.slug} topic={activeTopic} />
            </section>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
