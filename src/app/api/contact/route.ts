import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Validation helpers ─────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const trim = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// ── Rate-limit ─────────────────────────────────────────────────────────────
// Disabled in development so you can test freely without waiting 60 seconds.
const IS_DEV = process.env.NODE_ENV === "development";
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 1 request per IP per 60 s (production only)

function isRateLimited(ip: string): boolean {
  if (IS_DEV) return false; // skip in dev
  const last = rateLimitMap.get(ip) ?? 0;
  const now = Date.now();
  if (now - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, now);
  return false;
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1 — Rate-limit (production only)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  // 2 — Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = trim((body as Record<string, unknown>).name);
  const email = trim((body as Record<string, unknown>).email);
  const message = trim((body as Record<string, unknown>).message);

  // 3 — Server-side validation
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Message is required.";
  if (message.length > 2000) errors.message = "Message must be under 2000 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // 4 — Check env vars
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  const isPlaceholder = !apiKey || apiKey === "re_your_api_key_here";
  if (isPlaceholder || !toEmail) {
    console.warn(
      "[contact] RESEND_API_KEY is not configured. " +
      "Open .env.local and replace the placeholder with your real key from https://resend.com/api-keys"
    );
    return NextResponse.json(
      {
        error:
          "Email service is not configured yet. " +
          "Add your RESEND_API_KEY to .env.local to enable sending.",
      },
      { status: 503 }
    );
  }

  // 5 — Send via Resend
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Portfolio Contact <${fromEmail}>`,
    to: [toEmail],
    replyTo: email,
    subject: `New message from ${name} — Portfolio`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:12px;">
        <h2 style="color:#818cf8;margin-top:0;">New Contact Form Message</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#94a3b8;width:80px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Email</td>
            <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#818cf8;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Message</td>
            <td style="padding:8px 0;white-space:pre-wrap;">${message}</td>
          </tr>
        </table>
        <hr style="border-color:#1e293b;margin:24px 0;" />
        <p style="color:#475569;font-size:12px;margin:0;">Sent from your portfolio contact form</p>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// Reject non-POST methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
