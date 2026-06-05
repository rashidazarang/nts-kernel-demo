import { NextResponse } from "next/server";

/**
 * Contact form handler. Validates the payload and delivers it by email via
 * Resend (https://resend.com). Configure:
 *   RESEND_API_KEY  - Resend API key
 *   CONTACT_TO      - recipient (default fagr.79@gmail.com)
 *   CONTACT_FROM    - verified sender (default Resend's shared onboarding domain)
 * Without RESEND_API_KEY it logs the submission so the flow stays testable.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const locale = String(body.locale ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "hello@example.com";
  const from = process.env.CONTACT_FROM || "Acme <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[contact] submission (no RESEND_API_KEY set)", { name, email, phone, locale });
    return NextResponse.json({ ok: true });
  }

  const text =
    `New contact form submission\n\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "(not provided)"}\n` +
    `Language: ${locale || "(unknown)"}\n\nMessage:\n${message}\n`;
  const html =
    `<h2>New contact form submission</h2>` +
    `<p><strong>Name:</strong> ${escapeHtml(name)}<br/>` +
    `<strong>Email:</strong> ${escapeHtml(email)}<br/>` +
    `<strong>Phone:</strong> ${escapeHtml(phone || "(not provided)")}<br/>` +
    `<strong>Language:</strong> ${escapeHtml(locale || "(unknown)")}</p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New website message from ${name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Resend request failed", err);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
