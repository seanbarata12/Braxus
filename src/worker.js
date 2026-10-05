// Braxus Plumbing site Worker.
// Serves the static site from ./public, and handles one route:
//   POST /api/quote  -> emails the quote request to Sean's inbox.
// The recipient is locked in wrangler.jsonc (send_email.destination_address),
// so this code cannot be used to send mail anywhere else.

const FROM = { email: "quotes@braxusplumbing.com", name: "Braxus Website" };

const SERVICES = [
  "Residential emergency plumbing",
  "Emergency drain backup",
  "Residential renovation / installation",
  "Commercial emergency plumbing",
  "Commercial renovation / installation",
  "Commercial maintenance",
  "PRV maintenance",
  "Mixing valve maintenance",
  "Something else",
];
const TIMINGS = ["As soon as possible", "In the next few weeks", "Just planning"];

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function clean(v, max) {
  return String(v ?? "").replace(/\r/g, "").trim().slice(0, max);
}

async function handleQuote(request, env) {
  // Only accept posts from the site itself.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json(403, { ok: false, error: "Not allowed." });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: "Something went wrong reading the form. Please try again." });
  }

  // Spam traps: a hidden field real people never fill in, and a minimum fill time.
  if (clean(data.website, 200)) return json(200, { ok: true });
  const elapsed = Number(data.elapsed) || 0;
  if (elapsed > 0 && elapsed < 2500) return json(200, { ok: true });

  const q = {
    name: clean(data.name, 100),
    phone: clean(data.phone, 40),
    email: clean(data.email, 150),
    area: clean(data.area, 80),
    service: SERVICES.includes(data.service) ? data.service : "Something else",
    timing: TIMINGS.includes(data.timing) ? data.timing : "",
    details: clean(data.details, 3000),
  };

  if (!q.name || !q.phone) {
    return json(400, { ok: false, error: "Please add your name and phone number." });
  }
  if (q.phone.replace(/\D/g, "").length < 7) {
    return json(400, { ok: false, error: "Please check your phone number." });
  }
  if (q.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email)) {
    return json(400, { ok: false, error: "Please check your email address, or leave it blank." });
  }

  const urgent = q.timing === "As soon as possible";
  const subject =
    (urgent ? "URGENT quote request: " : "Quote request: ") +
    q.service +
    (q.area ? " (" + q.area + ")" : "") +
    " - " + q.name;

  const lines = [
    "New quote request from braxusplumbing.com",
    "",
    "Name:     " + q.name,
    "Phone:    " + q.phone,
    "Email:    " + (q.email || "-"),
    "Area:     " + (q.area || "-"),
    "Service:  " + q.service,
    "Timing:   " + (q.timing || "-"),
    "",
    "About the job:",
    q.details || "-",
    "",
    q.email ? "Reply to this email to answer them directly." : "No email given. Call or text them back.",
  ];

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const row = (k, v) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#5C6B73;vertical-align:top">${k}</td><td style="padding:6px 0;color:#0A0A0A;font-weight:600">${v}</td></tr>`;
  const tel = q.phone.replace(/[^\d+]/g, "");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;max-width:560px">
<p style="margin:0 0 12px;color:${urgent ? "#B42318" : "#1489FA"};font-weight:700">${urgent ? "URGENT: " : ""}New quote request from braxusplumbing.com</p>
<table style="border-collapse:collapse">
${row("Name", esc(q.name))}
${row("Phone", `<a href="tel:${esc(tel)}" style="color:#1489FA">${esc(q.phone)}</a>`)}
${row("Email", q.email ? `<a href="mailto:${esc(q.email)}" style="color:#1489FA">${esc(q.email)}</a>` : "-")}
${row("Area", esc(q.area || "-"))}
${row("Service", esc(q.service))}
${row("Timing", esc(q.timing || "-"))}
</table>
<p style="margin:16px 0 4px;color:#5C6B73">About the job</p>
<p style="margin:0;white-space:pre-wrap">${esc(q.details || "-")}</p>
</div>`;

  const message = {
    to: "sean@braxusplumbing.com",
    from: FROM,
    subject,
    text: lines.join("\n"),
    html,
  };
  if (q.email) message.replyTo = { email: q.email, name: q.name };

  try {
    await env.QUOTE_EMAIL.send(message);
  } catch (e) {
    console.error("Quote email failed", e && e.code, e && e.message);
    return json(502, {
      ok: false,
      error: "Sorry, your request didn't go through. Please call or text (647) 468-9696.",
    });
  }
  return json(200, { ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/quote") {
      if (request.method !== "POST") return json(405, { ok: false, error: "Use POST." });
      return handleQuote(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
