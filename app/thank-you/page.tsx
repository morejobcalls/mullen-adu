import type { Metadata } from "next";
import "@/app/mainstay.css";
import { GoogleTag } from "@/components/lp/GoogleTag";
import { ConversionTag } from "@/components/lp/ConversionTag";

// NEVER let this page be indexed. The form conversion fires here, on page load.
export const metadata: Metadata = {
  title: "Thank you",
  description: "We've got your request.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/" },
};

const PHONE = "(760) 214-9903";

export default function ThankYou() {
  return (
    <main className="mainstay" style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <GoogleTag phone={PHONE} />
      <ConversionTag />
      <div className="gw-container" style={{ maxWidth: "640px", padding: "var(--section-y) 0", display: "grid", gap: "var(--space-6)", textAlign: "center", justifyItems: "center" }}>
        <h1 style={{ margin: 0, font: "var(--type-display)", color: "var(--text-strong)" }}>Got it - thank you.</h1>
        <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-body)" }}>
          Ed Mullen will call you from <strong>{PHONE}</strong> to set up your custom design meeting.
          Save the number so you know it is him.
        </p>
        <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-muted)" }}>Would rather talk now?</p>
        <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="ms-btn ms-btn--primary" data-wcm-number="">Call {PHONE}</a>
        <p style={{ margin: 0, font: "var(--type-caption)", color: "var(--text-faint)" }}>Mullen Construction · CSLB Lic. #421785 · Mon-Fri 7 AM - 4 PM</p>
      </div>
    </main>
  );
}
