import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/i18n";

export function WhoWeAre({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-900/5">
            <Image
              src="/images/about.jpg"
              alt={dict.whoWeAre.eyebrow}
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-square h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
            {dict.whoWeAre.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {dict.whoWeAre.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {dict.whoWeAre.body}
          </p>

          <ul className="mt-8 space-y-4">
            {dict.whoWeAre.bullets.map((bullet) => (
              <li key={bullet.title} className="flex gap-3.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[0.975rem] leading-relaxed text-slate-700">
                  <span className="font-semibold text-ink">{bullet.title}:</span>{" "}
                  {bullet.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
