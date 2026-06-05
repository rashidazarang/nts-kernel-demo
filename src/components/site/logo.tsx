import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * The site logo: an SVG mark (always brand-colored) + the wordmark (inherits
 * the current text color, so it works on light and dark backgrounds). Swap the
 * mark and `siteConfig.name` to rebrand.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" aria-hidden="true">
        <rect width="28" height="28" rx="8" className="fill-brand-600" />
        <path d="M14 7 L21 21 H7 Z" fill="#fff" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight">
        {siteConfig.name}
      </span>
    </span>
  );
}
