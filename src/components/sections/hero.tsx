import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { localePath, type Locale, type Dictionary } from "@/lib/i18n";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
      {/* Decorative brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-200/40 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-inset ring-brand-100">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {dict.hero.eyebrow}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {dict.hero.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            {dict.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={localePath(locale, "/contact")} size="lg">
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={localePath(locale, "/services")}
              size="lg"
              variant="secondary"
            >
              {dict.hero.ctaSecondary}
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {dict.stats.items.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-ink sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-slate-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-900/5">
              <Image
                src="/images/hero.jpg"
                alt={dict.hero.eyebrow}
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            {/* Floating proof badge */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-900/5 sm:block">
              <p className="text-3xl font-bold text-brand-600">
                {dict.stats.items[0].value}
              </p>
              <p className="text-xs text-slate-500">{dict.stats.items[0].label}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
