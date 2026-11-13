import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";

export const fontSans = localFont({
  variable: "--font-zt-nature",
  display: "swap",
  src: [
    { path: "../../public/fonts/ZTNature-Thin.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/ZTNature-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../../public/fonts/ZTNature-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ZTNature-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/ZTNature-Black.woff2", weight: "900", style: "normal" },
    { path: "../../public/fonts/ZTNature-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
});

export const fontSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
