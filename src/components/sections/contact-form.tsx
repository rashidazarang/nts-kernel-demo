"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

type FormLabels = Dictionary["contact"]["form"];

export function ContactForm({
  labels,
  locale,
  tone = "light",
}: {
  labels: FormLabels;
  locale: Locale;
  tone?: "light" | "onDark";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldBase =
    "w-full rounded-xl border px-4 py-3 text-[0.95rem] outline-none transition focus:ring-2 focus:ring-brand-500/40";
  const fieldTone =
    tone === "onDark"
      ? "border-white/15 bg-white/5 text-white placeholder:text-slate-400 focus:border-brand-400"
      : "border-slate-200 bg-white text-ink placeholder:text-slate-400 focus:border-brand-500";

  if (status === "sent") {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl p-10 text-center ${
          tone === "onDark" ? "bg-white/5 text-white" : "bg-brand-50 text-ink"
        }`}
        role="status"
      >
        <CheckCircle2 className="h-12 w-12 text-brand-600" />
        <p className="mt-4 text-lg font-semibold">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={labels.name}
            className={`${fieldBase} ${fieldTone}`}
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            {labels.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={labels.phone}
            className={`${fieldBase} ${fieldTone}`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={labels.email}
          className={`${fieldBase} ${fieldTone}`}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={labels.message}
          className={`${fieldBase} ${fieldTone} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-500">{labels.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? labels.sending : labels.submit}
        {status !== "sending" && <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}
