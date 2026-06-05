import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/i18n";

export function TrustBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="border-y border-slate-200 bg-white">
      <Container className="py-5">
        <p className="text-center text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
          {dict.trustBar.text}
        </p>
      </Container>
    </div>
  );
}
