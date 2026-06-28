"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeProvider";

interface NavbarProps {
  onMenuToggle?: () => void;
  menuExpanded?: boolean;
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
}

export function Navbar({
  onMenuToggle,
  menuExpanded = false,
  menuButtonRef,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <nav
        aria-label="Main navigation"
        className="glass mx-auto flex max-w-4xl items-center justify-between rounded-full px-5 py-2.5 sm:px-6"
      >
        <div className="flex items-center gap-2">
          {onMenuToggle && (
            <button
              ref={menuButtonRef}
              type="button"
              onClick={onMenuToggle}
              aria-label={
                menuExpanded ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuExpanded}
              aria-controls="mobile-topic-nav"
              className="mr-1 rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary lg:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          <Link href="/html" className="flex items-center gap-2">
            <Image src="/logo.webp" alt="" width={30} height={30} aria-hidden />
            <span className="text-base font-bold text-text-primary sm:text-lg">
              Frontend
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <SocialLinks />
        </div>
      </nav>
    </header>
  );
}
