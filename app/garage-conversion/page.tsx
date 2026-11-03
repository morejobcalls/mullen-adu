import type { Metadata } from "next";
import { AduLanding, GARAGE } from "@/app/_adu/AduLanding";

export const metadata: Metadata = {
  title: { absolute: "Garage to ADU Conversion in Carlsbad | Mullen Construction" },
  description: "Mullen Construction converts garages into full ADUs in Coastal North San Diego County. Design, permits and build, fixed price, 10-year warranty. CSLB #421785.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AduLanding c={GARAGE} />;
}
