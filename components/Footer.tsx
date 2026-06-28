import { profileLink } from "@/data/links";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Link
            href={profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-primary"
          >
            Hasibul Islam Shanto
            <span className="sr-only"> (opens in new tab)</span>
          </Link>
          <span className="h-3.5 w-px bg-border" aria-hidden="true" />
          <SocialLinks
            iconClassName="h-4 w-4"
            linkClassName="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-accent"
          />
        </div>
      </div>
    </footer>
  );
}
