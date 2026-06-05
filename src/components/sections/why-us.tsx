import { Layers, Users, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/i18n";

const icons = [Layers, Users, ShieldCheck];

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={dict.why.eyebrow}
          title={dict.why.title}
          subtitle={dict.why.subtitle}
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {dict.why.items.map((item, i) => {
            const Icon = icons[i] ?? Layers;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
