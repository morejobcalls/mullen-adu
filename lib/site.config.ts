// THE ONE FILE TO EDIT FIRST.
// Every page reads from here - /api-setup asks the questions and fills it in.

export const site = {
  name: "Mullen Construction",
  tagline: "ADU builder in Coastal North San Diego County since 1977. Design, permits and build under one fixed-price contract.",
  // GHL inbound webhook - /service-page collects this and writes it here.
  leadWebhook: null as string | null,
  phone: "(760) 214-9903",
  email: "ed@mullenconstruction.com",
  address: "2805 Ocean St, Carlsbad, CA 92008",
  city: "Carlsbad",
  url: "https://adu.mullenconstruction.com", // your live domain - used by sitemap + metadata

  // ⛔ THE GOOGLE ADS API REVIEWER OPENS YOUR SITE AND LOOKS FOR THREE THINGS:
  // an About page with real background, a physical address, and a privacy policy with
  // real detail. These fields are what fill them. Every page shows a red NOT READY
  // banner until they hold real values - a site with the banner up fails the review.
  founded: "1977",            // "2011" - the year the business started trading
  owner: "Ed Mullen",              // "Dana Whitfield" - who runs it, named on the About page
  story: "Ed Mullen has built and remodeled homes in Coastal North County since 1977, from ADUs to custom estates over 22,000 square feet. He is still personally involved in every project.",              // 2-3 plain sentences: why it started, who it serves, what is different
  credentials: ["California CSLB License #421785, B General Building", "Bonded contractor"] as string[],  // "Licensed electrician, EC-44821", "Fully insured to $5M"
  legalEntity: "Edgar H Mullen Construction",        // "Whitfield Electrical Ltd" - the registered name, for the footer
  // "bold" for trades and home services, "calm" for professional services.
  // /api-setup asks which one and writes it here.
  style: "bold" as "bold" | "calm",
  legalName: "Edgar H Mullen Construction",          // alias used by the footer and /accessibility
  bookingUrl: "",  // GHL calendar embed, shown on /thank-you when set

  // Your services - each becomes a card on the homepage.
  // The SEO Blueprint's /build-website turns these into full service pages.
  services: [
    { name: "Service One", slug: "service-one", blurb: "One line on what this is." },
    { name: "Service Two", slug: "service-two", blurb: "One line on what this is." },
    { name: "Service Three", slug: "service-three", blurb: "One line on what this is." },
  ],

  // Google Ads sitelinks. Written here at build time, while the value of each
  // page is fresh - /write-ads reads them rather than inventing them months later.
  // Titles max 25 characters, each description line max 35.
  sitelinks: [
    { title: "Get a Quote",  url: "/quote",    lines: ["Reply in 30 minutes", "No obligation"] },
    { title: "Our Services", url: "/services", lines: ["Everything we do", "Fixed pricing"] },
    { title: "Reviews",      url: "/reviews",  lines: ["Real customer reviews", "See what they say"] },
    { title: "Pricing",      url: "/pricing",  lines: ["What jobs cost", "No surprise fees"] },
    { title: "About Us",     url: "/about",    lines: ["Family owned", "Licensed + insured"] },
    { title: "Contact",      url: "/contact",  lines: ["Call or email us", "Open 7 days"] },
  ],
};
