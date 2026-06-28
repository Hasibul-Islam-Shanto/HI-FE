"use client";

import { useState, useEffect, useCallback } from "react";
import { topics } from "@/data";
import { ListView } from "@/components/ListView";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeTopicSlug, setActiveTopicSlug] = useState(topics[0].slug);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTopic =
    topics.find((t) => t.slug === activeTopicSlug) ?? topics[0];

  const handleTopicSelect = useCallback((slug: string) => {
    setActiveTopicSlug(slug);
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [sidebarOpen]);

  return (
    <>
      <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="pt-10 max-w-7xl mx-auto">
        <div className="flex">
          <Sidebar
            activeSlug={activeTopicSlug}
            onSelect={handleTopicSelect}
            mobileOpen={sidebarOpen}
          />

          <main className="animate-fade-in min-h-screen flex-1 px-4 pb-6 sm:px-6 lg:pl-8 lg:pr-8">
            <div role="tabpanel" aria-label={`${activeTopic.title} questions`}>
              <ListView key={activeTopic.slug} topic={activeTopic} />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
