import type { Metadata } from "next";
import { AduLanding, COST } from "@/app/_adu/AduLanding";

export const metadata: Metadata = {
  title: { absolute: "ADU Cost in Carlsbad and Coastal North County | Mullen Construction" },
  description: "What an ADU costs with Mullen Construction: from $400 a square foot, fixed price, design, permits and build in one contract. CSLB #421785.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AduLanding c={COST} />;
}
