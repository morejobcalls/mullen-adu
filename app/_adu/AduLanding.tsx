// Mullen Construction ADU landing page. A filled copy of app/lp/_template/page.tsx - same sections,
// same order, same components. The three ad groups (builder, cost, garage conversion) share this body
// and pass their own words in `c`, so the message match changes per ad group and nothing else does.
//
// Every claim here is in context/proof.md (3 Nov 2026). Slots with no proof yet (client videos,
// written reviews, case studies) are visibly empty and labelled with what belongs there.
import "@/app/mainstay.css";
import { SourceCapture } from "@/components/lp/SourceCapture";
import { CalmLeadForm, CalmCallLink } from "@/components/lp/CalmLeadForm";
import { MobileCtaBar } from "@/components/lp/Sections";
import { GoogleTag } from "@/components/lp/GoogleTag";
import { Icon } from "@/components/kit/Icon";
import { City } from "@/components/lp/City";
import { SectionHeading, TrustBar, TestimonialCard, FAQItem, Figure } from "@/components/kit/Mainstay";
import { AvatarCluster, ProcessSteps, CtaBlock } from "@/components/kit/Marketing";

export const BUSINESS = "Mullen Construction";
const MAIN_CITY = "Carlsbad";
const PHONE = "(760) 214-9903";
const LICENSE = "CSLB Lic. #421785";
// No response-time claim is on file in proof.md, so the line under the buttons names the next step instead.
const RESPONSE_TIME = "";
const CTA = "Book my custom design meeting";
// Video testimonials, reviews and case studies stay hidden until Ed's real ones are on file (12 Nov 2026).
const SHOW_PROOF = false;

export type AduContent = {
  slug: string;
  eyebrow: string;
  h1: string;
  sub: string;
  defaultType?: string;
  workTitle: string;
  getTitle: string;
  getLead: string;
  included: { title: string; body: string }[];
  closeTitle: string;
  faq: { question: string; answer: string }[];
};

const IMG = (f: string) => `/img/${f}`;

function Head({ eyebrow, title, lead, aside }: { eyebrow: string; title: string; lead?: string; aside?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-9)", flexWrap: "wrap" }}>
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
      {aside && <div style={{ marginLeft: "auto" }}>{aside}</div>}
    </div>
  );
}

export function AduLanding({ c }: { c: AduContent }) {
  return (
    <>
      <GoogleTag phone={PHONE} />
      <SourceCapture />
      <main className="mainstay" style={{ background: "var(--surface-page)", color: "var(--text-body)" }}>

        {/* Business name, licence and phone as plain content. No nav - this is an ad page. */}
        <div className="gw-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", padding: "var(--space-7) 0" }}>
          <span style={{ display: "grid", gap: "2px" }}>
            <span style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{BUSINESS}</span>
            <span style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>{LICENSE} · Since 1977</span>
          </span>
          <CalmCallLink phone={PHONE} className="ms-btn ms-btn--outline" />
        </div>

        {/* Hero */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container" style={{ display: "grid", gap: "var(--space-8)", justifyItems: "center", textAlign: "center", maxWidth: "880px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", font: "var(--type-body-lg)", color: "var(--text-brand)" }}>
              <Icon name="search" size={18} color="var(--text-brand)" />
              {c.eyebrow}
            </span>
            <h1 style={{ font: "var(--type-display-xl)", letterSpacing: "var(--track-display)", color: "var(--text-strong)", margin: 0, maxWidth: "20ch" }}>
              {c.h1} in <City fallback={MAIN_CITY} />
            </h1>
            <p style={{ font: "var(--type-body-lg)", color: "var(--text-muted)", margin: 0, maxWidth: "52ch" }}>{c.sub}</p>
            <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#lead-form" className="ms-btn ms-btn--primary" data-l>{CTA} <Icon name="arrow-right" size={17} /></a>
              <CalmCallLink phone={PHONE} className="ms-btn ms-btn--outline" />
            </div>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-7)", justifyContent: "center", margin: 0, padding: 0, listStyle: "none" }}>
              {[
                ["shield-check", "10-year warranty, ADUs included"],
                ["clock", "Building in North County since 1977"],
                ["users", "10+ ADUs built in Oceanside, Carlsbad and Encinitas"],
              ].map(([icon, text]) => (
                <li key={text} style={{ display: "inline-flex", alignItems: "center", gap: "8px", font: "var(--type-body-sm)", color: "var(--text-body)" }}>
                  <Icon name={icon} size={17} color="var(--text-brand)" />{text}
                </li>
              ))}
            </ul>
            <AvatarCluster people={["EM"]} label="Ed Mullen, owner. He runs every design meeting himself." style={{ marginTop: "var(--space-2)" }} />
          </div>
          {/* Founder video slot. The poster is a real Mullen home until Ed films his 60 seconds. */}
          <div className="gw-container" style={{ marginTop: "var(--space-9)" }}>
            <Figure ratio="16 / 9" label="Ed on camera · 30-60 seconds (to film)" src={IMG("MULLEN_PROJ_05_front-elevation-white-tuscan.jpg")} alt="A Mullen Construction custom home in Coastal North County" />
          </div>
        </section>

        {/* The record band - credentials anyone can check, in place of client logos (none on file). */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--surface-tint)" }}>
          <div className="gw-container" style={{ display: "grid", gap: "var(--space-5)", justifyItems: "center" }}>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>On the public record</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-9)", alignItems: "center", justifyContent: "center" }}>
              {[["badge-check", "CSLB #421785 · active"], ["shield-check", "Bonded contractor"], ["circle-check", "Workers' comp on file"], ["clock", "Licensed since 1982"]].map(([icon, name]) => (
                <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: "var(--ink-700)" }}>
                  <Icon name={icon} size={22} color="var(--text-brand)" />
                  <span style={{ font: "var(--type-h4)", letterSpacing: "-0.02em" }}>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Selected work - real Mullen projects (custom homes). ADU photos replace these as Ed sends them. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container">
            <Head eyebrow="Selected work" title={c.workTitle} lead="Custom homes and outdoor living by Mullen Construction." />
            <div className="lp-4up" style={{ display: "grid", gap: "var(--space-7)" }}>
              {[
                ["Courtyard and gate", "MULLEN_PROJ_06_courtyard-gate-garden.jpg"],
                ["Covered patio", "MULLEN_PROJ_04_covered-patio-stone-column.jpg"],
                ["Stone arch entry", "MULLEN_PROJ_07_stone-arch-entry.jpg"],
                ["Interior stair", "MULLEN_PROJ_08_interior-stairs.jpg"],
              ].map(([l, f]) => (
                <Figure key={l} ratio="3 / 4" label={l} src={IMG(f)} alt={`${l} by Mullen Construction`} />
              ))}
            </div>
            <CtaBlock label={CTA} responseTime={RESPONSE_TIME} />
          </div>
        </section>

        {/* Video testimonials - slots until past ADU clients record (Ed has clients willing, 19 Oct 2026). */}
        {SHOW_PROOF && (
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container">
            <Head eyebrow="Watch them say it" title="ADU clients, in their own words" />
            <div className="lp-3up" style={{ display: "grid", gap: "var(--space-7)" }}>
              {Array.from({ length: 9 }, (_, i) => (
                <Figure key={i} ratio="4 / 3" label={`Client video ${i + 1} · to collect`} style={{ background: "var(--ink-100)" }} />
              ))}
            </div>
            <CtaBlock label={CTA} responseTime={RESPONSE_TIME} />
          </div>
        </section>
        )}

        {/* Where the record is public - numbers from proof.md only. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container" style={{ display: "grid", gap: "var(--space-6)", justifyItems: "center" }}>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>The record</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-9)", justifyContent: "center" }}>
              {["Since 1977", "200+ homes built and remodeled", "10+ ADUs built"].map((l) => (
                <span key={l} style={{ font: "var(--weight-bold) 17px/1 var(--font-core)", letterSpacing: "-0.02em", color: "var(--ink-600)" }}>{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-media lp-flip" style={{ display: "grid", gap: "var(--space-10)", alignItems: "center" }}>
            <Figure ratio="4 / 5" label="A Mullen build" src={IMG("MULLEN_PROJ_03_patio-stone-chimney-travertine.jpg")} alt="Stone chimney patio by Mullen Construction" />
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
                <span className="ms-sh__eyebrow">How it works</span>
                <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>Four steps, and the first costs nothing</h2>
              </div>
              <ProcessSteps steps={[
                { title: "Custom design meeting with Ed", body: "Ed walks your lot, hears who the ADU is for and gives you a free estimate." },
                { title: "Design, about 30 days", body: "Plans drawn to your lot and to your city's ADU rules, with one fixed price." },
                { title: "City permits, about 60 days", body: "We handle the permit submittals and the city back-and-forth." },
                { title: "The build, about 90 days", body: "Ed is on the project, and it is backed by a 10-year warranty." },
              ]} />
              <CtaBlock label={CTA} responseTime={RESPONSE_TIME} />
            </div>
          </div>
        </section>

        {/* What you get */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-media" style={{ display: "grid", gap: "var(--space-12)", alignItems: "center" }}>
            <Figure ratio="4 / 5" label="A Mullen build" src={IMG("MULLEN_PROJ_09_interior-stairs-alt.jpg")} alt="Interior finish work by Mullen Construction" />
            <div style={{ display: "grid", gap: "var(--space-7)" }}>
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
                <span className="ms-sh__eyebrow">What you get</span>
                <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>{c.getTitle}</h2>
                <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-muted)" }}>{c.getLead}</p>
              </div>
              <div style={{ display: "grid", gap: "var(--space-6)" }}>
                {c.included.map((it) => (
                  <div key={it.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-5)", alignItems: "start" }}>
                    <span style={{ width: 38, height: 38, borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                      <Icon name="circle-check" size={19} color="var(--text-brand)" />
                    </span>
                    <span style={{ display: "grid", gap: "4px" }}>
                      <strong style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{it.title}</strong>
                      <span style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{it.body}</span>
                    </span>
                  </div>
                ))}
              </div>
              <CtaBlock label={CTA} responseTime={RESPONSE_TIME} />
            </div>
          </div>
        </section>

        {/* Kind words - empty until real reviews are on file. No invented quotes, no rating. */}
        {SHOW_PROOF && (<>
        <section style={{ padding: "var(--section-y) 0", background: "var(--surface-sunken)" }}>
          <div className="gw-container">
            <Head eyebrow="Kind words" title="What ADU clients said afterwards" />
            <div className="lp-3up" style={{ display: "grid", gap: "var(--space-7)" }}>
              <TestimonialCard quote="[Review slot 1 - a past ADU client's words, verbatim, with permission]" name="[First name]" meta="[ADU type · city · platform]" />
              <TestimonialCard quote="[Review slot 2]" name="[First name]" meta="[ADU type · city · platform]" />
              <TestimonialCard quote="[Review slot 3]" name="[First name]" meta="[ADU type · city · platform]" />
            </div>
            <CtaBlock label={CTA} responseTime={RESPONSE_TIME} />
          </div>
        </section>

        {/* Case studies - slots. Each needs a real ADU, a city, a timeline and Ed's sign-off. */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--surface-brand)" }}>
          <div className="gw-container">
            <Head eyebrow="Case studies" title="Two ADUs, start to finish" />
            <div className="lp-2up" style={{ display: "grid", gap: "var(--space-7)" }}>
              {["[ADU one - type, city]", "[ADU two - type, city]"].map((who) => (
                <article key={who} style={{ display: "grid", gap: "var(--space-6)", padding: "var(--space-8)", background: "var(--surface-card)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-lg)" }}>
                  <strong style={{ font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-brand)" }}>[ ]</strong>
                  <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-body)" }}>{who}: [who it was for, the timeline, the fixed price held]</p>
                  <Figure ratio="16 / 9" label={`${who} · photos to collect`} />
                </article>
              ))}
            </div>
            <p style={{ margin: "var(--space-7) 0 0", font: "var(--type-body-sm)", color: "var(--blue-100)", maxWidth: "var(--container-text)" }}>
              Real Mullen ADU projects only, shown with the owners&apos; permission. Results vary by lot and city.
            </p>
            <CtaBlock label={CTA} responseTime={RESPONSE_TIME} tone="on-brand" />
          </div>
        </section>
        </>)}

        {/* The close */}
        <section id="lead-form" style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-form" style={{ display: "grid", gap: "var(--space-12)", alignItems: "start" }}>
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              <span className="ms-sh__eyebrow">Free custom design meeting</span>
              <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)", maxWidth: "14ch" }}>{c.closeTitle}</h2>
              <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-muted)", maxWidth: "var(--container-text)" }}>
                Send this and Ed calls you to set up a time to walk your lot. You leave the meeting with a free estimate.
              </p>
              <TrustBar items={["Fixed-price contract", "Design, permits and build in one", "10-year warranty, ADUs included"]} />
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "var(--border-hairline) solid var(--line-hairline)" }}>
                <AvatarCluster people={["EM"]} size={30} label={`Prefer to talk now? Call ${PHONE}`} />
              </div>
            </div>
            <div style={{ padding: "var(--space-9)", background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-hairline)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-md)" }}>
              <CalmLeadForm business={BUSINESS} phone={PHONE} page={c.slug} cta={CTA} defaultType={c.defaultType} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-faq" style={{ display: "grid", gap: "var(--space-10)", alignItems: "start" }}>
            <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
              <span className="ms-sh__eyebrow">Questions</span>
              <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>Before you call</h2>
              <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
                Anything not covered here, ask Ed at the design meeting. You get a straight answer from the owner.
              </p>
            </div>
            <div>
              {c.faq.map((q, i) => <FAQItem key={q.question} {...q} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* The legal line (California B&P 7030.5: licence number in all advertising). */}
        <div className="gw-container" style={{ padding: "var(--space-8) 0 var(--space-12)", borderTop: "var(--border-hairline) solid var(--line-hairline)", display: "flex", gap: "var(--space-5)", flexWrap: "wrap", justifyContent: "space-between" }}>
          <span style={{ font: "var(--type-caption)", color: "var(--text-faint)" }}>
            {BUSINESS} · Edgar H Mullen Construction · {LICENSE} · 2805 Ocean St, Carlsbad, CA 92008
          </span>
          <span style={{ display: "flex", gap: "var(--space-5)" }}>
            <a href="/privacy-policy/" style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>Privacy</a>
            <a href="/terms/" style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>Terms</a>
          </span>
        </div>
      </main>
      <MobileCtaBar phone={PHONE} label="Book a design meeting" />
    </>
  );
}

const SHARED_FAQ = [
  { question: "Do you work outside Carlsbad?", answer: "Yes, across Coastal North San Diego County: Oceanside, Carlsbad, Vista, Encinitas, Solana Beach, Del Mar, Rancho Santa Fe, La Jolla and Carmel Valley. We do not take work in Temecula or Escondido." },
  { question: "Is the price fixed?", answer: "Yes. You get a fixed-price contract for the design, permits and build before work starts. Pricing starts at $400 a square foot and depends on your lot and finishes." },
  { question: "Who will I actually deal with?", answer: "Ed Mullen, the owner. He runs the design meeting and stays involved on your project from start to finish." },
  { question: "Does the warranty cover ADUs?", answer: "Yes. Every ADU we build carries our 10-year craftsmanship warranty." },
];

export const BUILDER: AduContent = {
  slug: "/",
  eyebrow: "Looking for an ADU builder you can actually reach?",
  h1: "ADU builder",
  sub: "Mullen Construction designs, permits and builds your ADU under one fixed-price contract, backed by a 10-year warranty.",
  workTitle: "Built by Mullen, since 1977",
  getTitle: "One builder, design to final inspection",
  getLead: "Nothing is handed off between a designer, an expediter and a contractor. It is one contract with one price.",
  included: [
    { title: "Design to your lot and your city's rules", body: "Setbacks, height, utilities and the most square footage your lot allows." },
    { title: "Permits and inspections handled", body: "We do the submittals and coordinate every inspection stage." },
    { title: "The full build, every type", body: "Detached, attached, garage conversion or junior ADU." },
  ],
  closeTitle: "Book your custom design meeting with Ed",
  faq: [
    { question: "How long does an ADU take?", answer: "About 30 days of design, about 60 days with the city for permits, then the build, usually 90 days at most." },
    { question: "What does an ADU cost?", answer: "Pricing starts at $400 a square foot, on a fixed-price contract. Ed gives you a free estimate at the custom design meeting." },
    ...SHARED_FAQ.slice(0, 1), ...SHARED_FAQ.slice(2),
  ],
};

export const COST: AduContent = {
  slug: "/cost/",
  eyebrow: "What will an ADU actually cost on your lot?",
  h1: "What an ADU costs",
  sub: "Pricing starts at $400 a square foot, on a fixed-price contract that covers the design, permits and build. Ed gives you a free estimate for your lot.",
  workTitle: "The standard you are paying for",
  getTitle: "What the fixed price covers",
  getLead: "One number for the whole job, set before work starts, so you can plan around it.",
  included: [
    { title: "Design", body: "About 30 days of plans drawn to your lot and your city's ADU rules." },
    { title: "City permits", body: "About 60 days. We handle the submittals and the inspections." },
    { title: "The build, with a 10-year warranty", body: "Usually 90 days at most, with Ed involved from start to finish." },
  ],
  closeTitle: "Get your fixed-price ADU estimate",
  faq: [
    { question: "How much does an ADU cost per square foot?", answer: "Our pricing starts at $400 a square foot. Your number depends on the size, the type of ADU, your lot and your finishes, and you get it in writing as a fixed price." },
    { question: "What is included in the price?", answer: "The design, the city permits and the build, under one contract." },
    { question: "How long until it is built?", answer: "About 30 days of design, about 60 days with the city, then usually 90 days at most to build." },
    ...SHARED_FAQ.filter((q) => q.question !== "Is the price fixed?"),
  ],
};

export const GARAGE: AduContent = {
  slug: "/garage-conversion/",
  eyebrow: "Thinking about turning your garage into an ADU?",
  h1: "Garage to ADU conversions",
  sub: "Mullen Construction turns your garage into a full ADU, with design, permits and build under one fixed-price contract and a 10-year warranty.",
  defaultType: "Garage conversion",
  workTitle: "Built by Mullen, since 1977",
  getTitle: "Your garage, a full ADU",
  getLead: "A complete living space, designed to your city's ADU rules and built under one contract.",
  included: [
    { title: "Design for the space you already have", body: "Plans drawn around your garage, your lot and your city's ADU rules." },
    { title: "Permits and inspections handled", body: "We do the submittals and coordinate every inspection stage." },
    { title: "The full conversion", body: "Framing, mechanical systems and finishes, backed by a 10-year warranty." },
  ],
  closeTitle: "Book your garage conversion design meeting",
  faq: [
    { question: "Can my garage become a legal ADU?", answer: "It depends on your garage, your lot and your city's ADU rules. Ed checks all three at the custom design meeting, at no charge." },
    { question: "What does a garage conversion cost?", answer: "Pricing starts at $400 a square foot, on a fixed-price contract. Ed gives you a free estimate for your garage." },
    { question: "How long does it take?", answer: "About 30 days of design, about 60 days with the city, then usually 90 days at most to build." },
    ...SHARED_FAQ.slice(0, 1), ...SHARED_FAQ.slice(2),
  ],
};
