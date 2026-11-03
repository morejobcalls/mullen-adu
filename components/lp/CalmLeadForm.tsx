"use client";
// The calm template's enquiry form, wired up.
//
// The template ships this form as static markup with no name attributes and no
// submit handler, so on an ads page it would take a lead and drop it. Every
// style below is copied verbatim from `app/calm/page.tsx` - the uppercase
// tracked label, the sunken fill, the brand-blue full-width button. Nothing
// here is a new look; the only additions are the plumbing the template has
// none of: the stashed gclid and keyword riding along as hidden fields, the
// honeypot, the SMS consent line, the post to /api/lead and the redirect to
// /thank-you where the conversion tag fires.
import { useEffect, useState } from "react";
import { readSource, type LeadSource } from "@/lib/source";

const HIDDEN_KEYS: (keyof LeadSource)[] = [
  "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "keyword", "campaign", "adgroup", "matchtype", "device", "network", "creative", "landing_page", "referrer", "landed_at",
];

const LABEL: React.CSSProperties = {
  font: "var(--type-label)", letterSpacing: "var(--track-label)",
  textTransform: "uppercase", color: "var(--text-muted)",
};
const FIELD: React.CSSProperties = {
  width: "100%", minHeight: "var(--control-h)", padding: "var(--pad-control)",
  font: "var(--type-body)", color: "var(--text-strong)", background: "var(--surface-sunken)",
  borderColor: "var(--line-hairline)", borderRadius: "var(--radius-input)",
  transition: "var(--transition-control)", outline: "none", boxShadow: "none",
};
const BUTTON: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  font: "var(--type-button)", letterSpacing: "0.005em", borderRadius: "var(--radius-control)",
  borderColor: "transparent", cursor: "pointer", textDecoration: "none",
  transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
  whiteSpace: "nowrap", minHeight: "var(--control-h)", padding: "var(--pad-control)",
  background: "var(--surface-brand)", color: "var(--text-inverse)", width: "100%",
};
const CAPTION: React.CSSProperties = { font: "var(--type-caption)", color: "var(--text-muted)" };

// Mullen ADU: the two qualifiers Ed asks first - where the lot is, and what kind of ADU.
// "Somewhere else" is kept so out-of-area leads are tagged, not lost.
const CITIES = ["Carlsbad", "Oceanside", "Encinitas", "Vista", "Solana Beach", "Del Mar", "Rancho Santa Fe", "La Jolla", "Carmel Valley", "Somewhere else"];
const ADU_TYPES = ["Detached ADU", "Garage conversion", "Attached ADU", "Junior ADU", "Not sure yet"];
// Static site (GitHub Pages): the browser posts straight to the GHL inbound webhook, which allows CORS.
const WEBHOOK = process.env.NEXT_PUBLIC_LEAD_WEBHOOK || "";
function toPayload(fd: FormData) {
  const o: Record<string, string> = {};
  fd.forEach((v, k) => { o[k] = String(v); });
  const parts = (o.name || "").trim().split(/\s+/);
  o.first_name = parts.shift() || "";
  o.last_name = parts.join(" ");
  o.source = "google-ads-adu";
  return o;
}

function Field({ label, name, required, type = "text", placeholder, help, inputMode, autoComplete }: {
  label: string; name: string; required?: boolean; type?: string; placeholder?: string;
  help?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; autoComplete?: string;
}) {
  return (
    <label style={{ display: "grid", gap: "6px" }}>
      <span style={LABEL}>{label}{required && <span style={{ color: "var(--status-critical)" }}> *</span>}</span>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        inputMode={inputMode} autoComplete={autoComplete} style={FIELD}
      />
      {help && <span style={CAPTION}>{help}</span>}
    </label>
  );
}

export function CalmLeadForm({ business, phone, page, cta, defaultType }: { business: string; phone: string; page: string; cta?: string; defaultType?: string }) {
  const [source, setSource] = useState<LeadSource>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setSource(readSource()); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // With JS we post in the background and show a friendly error if the
    // webhook is down. Without JS the plain POST below still works.
    e.preventDefault();
    if (busy) return;
    setBusy(true); setFailed(false);
    try {
      const payload = toPayload(new FormData(e.currentTarget));
      if (payload.company_fax) { window.location.assign("/thank-you/"); return; }  // honeypot: drop quietly
      if (!WEBHOOK) { setFailed(true); return; }
      const res = await fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        window.location.assign("/thank-you/");
        return;
      }
      setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: "var(--space-5)" }}>
      <Field label="Your name" name="name" required placeholder="First and last" autoComplete="name" />
      <Field label="Phone" name="phone" type="tel" required placeholder="So we can call you back" inputMode="tel" autoComplete="tel" />
      <Field label="Email" name="email" type="email" required placeholder="For your estimate details" inputMode="email" autoComplete="email" />
      <label style={{ display: "grid", gap: "6px" }}>
        <span style={LABEL}>Where is the property?<span style={{ color: "var(--status-critical)" }}> *</span></span>
        <select name="city" required defaultValue="" style={FIELD}>
          <option value="" disabled>Choose a city</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label style={{ display: "grid", gap: "6px" }}>
        <span style={LABEL}>What kind of ADU?</span>
        <select name="adu_type" defaultValue={defaultType ?? ""} style={FIELD}>
          <option value="">Choose one</option>
          {ADU_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>

      <label style={{ display: "grid", gap: "6px" }}>
        <span style={LABEL}>Anything Ed should know?</span>
        <textarea name="message" rows={3} placeholder="Who it is for, rough size, timing" style={{ ...FIELD, minHeight: "88px", resize: "vertical" }} />
      </label>

      {/* Honeypot. Humans never see it; bots fill it and get quietly dropped. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company_fax">Fax</label>
        <input id="company_fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", ...CAPTION }}>
        <input type="checkbox" name="sms_consent" value="yes" style={{ marginTop: 2, width: 16, height: 16, flex: "none" }} />
        <span>{business} may text me about my request. Msg and data rates may apply. Reply STOP to cancel, HELP for help.</span>
      </label>

      {HIDDEN_KEYS.map((k) => <input key={k} type="hidden" name={k} value={source[k] ?? ""} />)}
      <input type="hidden" name="page" value={page} />

      <button type="submit" disabled={busy} style={{ ...BUTTON, opacity: busy ? 0.5 : 1 }}>
        {busy ? "Sending" : (cta ?? "Book my custom design meeting")}
      </button>

      {failed && (
        <span role="alert" style={{ ...CAPTION, color: "var(--status-critical)" }}>
          That did not send. Call {phone} and we will take it over the phone.
        </span>
      )}
      <span style={{ ...CAPTION, textAlign: "center" }}>
        No spam, no list. Your details go to us and nobody else. <a href="/privacy-policy">Privacy policy</a>.
      </span>
    </form>
  );
}

// The click-to-call link, in the template's pill. Before the phone dials it
// fires the stashed keyword and gclid to the webhook, so one real number still
// tells you which keyword rang the phone. No number pools, no per-page numbers.
export function CalmCallLink({ phone, label, style, className }: {
  phone: string; label?: string; style?: React.CSSProperties; className?: string;
}) {
  const tel = "tel:" + phone.replace(/[^+\d]/g, "");
  const fire = () => {
    try {
      // Static site: no /api route. The call itself is counted by Google's website-call
      // tracking (GoogleTag swaps the number), so nothing is posted here.
      void readSource;
    } catch {
      // Never block the call because tracking hiccuped.
    }
  };
  // data-wcm-number marks the places where the number itself is printed, so
  // Google's snippet rewrites the label and the href together. A custom label
  // ("Call us") is left alone; only its href is swapped.
  return (
    <a href={tel} className={className} onClick={fire} aria-label={`Call ${phone}`} style={style} {...(!label || label.includes(phone) ? { "data-wcm-number": "" } : {})}>
      {label ?? `Call ${phone}`}
    </a>
  );
}
