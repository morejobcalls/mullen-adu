import type { Metadata } from "next";
import { AduLanding, BUILDER } from "@/app/_adu/AduLanding";

export const metadata: Metadata = {
  title: { absolute: "ADU Builder in Carlsbad and Coastal North County | Mullen Construction" },
  description: "Mullen Construction designs, permits and builds ADUs in Coastal North San Diego County under one fixed-price contract, with a 10-year warranty. CSLB #421785.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AduLanding c={BUILDER} />;
}
