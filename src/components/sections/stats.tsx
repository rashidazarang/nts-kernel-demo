import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/i18n";

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-ink py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {dict.stats.title}
          </h2>
          <p className="mt-3 text-brand-100/70">{dict.stats.subtitle}</p>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
          {dict.stats.items.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <dt className="text-4xl font-bold tracking-tight text-brand-300 sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm font-medium text-slate-300">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
