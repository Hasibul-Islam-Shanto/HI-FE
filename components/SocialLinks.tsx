import { gitHubLink, linkedin } from '@/data/links';
import Link from 'next/link';
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons';

interface SocialLinksProps {
  iconClassName?: string;
  linkClassName?: string;
}

export function SocialLinks({
  iconClassName = 'h-4 w-4',
  linkClassName = 'rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-hover hover:text-accent',
}: SocialLinksProps) {
  return (
    <>
      <Link
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in new tab)"
        className={linkClassName}
      >
        <LinkedInIcon className={iconClassName} />
      </Link>
      <Link
        href={gitHubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub (opens in new tab)"
        className={linkClassName}
      >
        <GitHubIcon className={iconClassName} />
      </Link>
    </>
  );
}
