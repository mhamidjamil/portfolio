/**
 * Cloudflare Pages worker for the portfolio.
 *
 * The portfolio is plain static files, so this handles the contact form and
 * hands everything else to the static assets. Pages picks up _worker.js from
 * the uploaded directory, so it needs no build step and no wrangler.
 *
 * Delivery is deliberately belt and braces:
 *   - ntfy always fires. It is self-hosted, needs no key, and is what makes a
 *     submission impossible to lose quietly.
 *   - Resend also fires when RESEND_API_KEY is set, for a real email trail.
 * A submission is reported as received if either one succeeds.
 *
 * Everything here runs on the Workers free allowance. Nothing calls a paid
 * Cloudflare product.
 */

const NTFY_DEFAULT = "https://ntfy.innovorix.com/cloudflare"
const TO_DEFAULT = "admin@innovorix.com"

const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000
const RATE_LIMIT_MAX = 5
const seen = new Map()

function allowed(ip) {
  const now = Date.now()
  for (const [key, entry] of seen) if (entry.resetAt <= now) seen.delete(key)
  const entry = seen.get(ip)
  if (!entry || entry.resetAt <= now) {
    seen.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count += 1
  return true
}

const clean = value => (typeof value === "string" ? value.trim() : "")
const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

async function notifyNtfy(env, title, lines) {
  const url = env.NTFY_URL || NTFY_DEFAULT
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Title: title, Priority: "high", Tags: "envelope" },
      body: lines.join("\n"),
    })
    return response.ok
  } catch {
    return false
  }
}

async function sendEmail(env, subject, text, replyTo) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return false
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: env.RESEND_TO_EMAIL || TO_DEFAULT,
        reply_to: replyTo,
        subject,
        text,
      }),
    })
    return response.ok
  } catch {
    return false
  }
}

/** The short contact form. */
async function handleContact(request, env) {
  const body = await request.json().catch(() => null)
  if (!body) return json({ status: "error", message: "Send the form as JSON.", fieldErrors: {} }, 400)

  const name = clean(body.name)
  const email = clean(body.email)
  const message = clean(body.message)

  const fieldErrors = {}
  if (name.length < 2) fieldErrors.name = "Enter your name."
  if (!isEmail(email)) fieldErrors.email = "Enter a valid email address."
  if (message.length < 8) fieldErrors.message = "Add a short message."
  if (Object.keys(fieldErrors).length) {
    return json({ status: "error", message: "Review the highlighted fields and try again.", fieldErrors }, 400)
  }

  const ip = request.headers.get("cf-connecting-ip") || "unknown"
  if (!allowed(ip)) {
    return json(
      { status: "error", message: `Too many messages from this connection. Please email ${env.RESEND_TO_EMAIL || TO_DEFAULT} instead.`, fieldErrors: {} },
      429
    )
  }

  const lines = [`From: ${name} <${email}>`, "", message]
  const [pushed, mailed] = await Promise.all([
    notifyNtfy(env, `New message from ${name}`, lines),
    sendEmail(env, `New portfolio message from ${name}`, lines.join("\n"), email),
  ])

  if (!pushed && !mailed) {
    return json(
      { status: "error", message: `Could not send that message. Please email ${env.RESEND_TO_EMAIL || TO_DEFAULT} directly.`, fieldErrors: {} },
      502
    )
  }
  return json({ status: "success", message: "Message sent. I will get back to you.", fieldErrors: {} }, 200)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === "POST") {
      if (url.pathname === "/api/contact") return handleContact(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
