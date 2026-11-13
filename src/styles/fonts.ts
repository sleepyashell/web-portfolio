import localFont from "next/font/local";

export const fontSans = localFont({
  variable: "--font-zt-nature",
  display: "swap",
  src: [
    { path: "../../public/fonts/ZTNature-Thin.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/ZTNature-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../../public/fonts/ZTNature-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/ZTNature-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../../public/fonts/ZTNature-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ZTNature-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/ZTNature-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ZTNature-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/ZTNature-Black.woff2", weight: "900", style: "normal" },
    { path: "../../public/fonts/ZTNature-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
});

// Self-hosted (SIL Open Font License 1.1, see public/fonts/OFL-InstrumentSerif.txt).
export const fontSerif = localFont({
  variable: "--font-instrument-serif",
  display: "swap",
  src: [
    { path: "../../public/fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
});
