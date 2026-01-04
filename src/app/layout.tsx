import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7 Days to Clear Brain Rot | Digital Detox Program",
  description: "Evidence-based 7-day recovery program to cure brain rot. Reclaim your focus, break doom-scrolling habits, and rebuild your attention span through proven neuroscience methods.",
  keywords: ["brain rot cure", "digital detox", "screen addiction", "focus", "dopamine detox", "mental clarity", "productivity"],
  openGraph: {
    title: "7 Days to Clear Brain Rot",
    description: "Evidence-based recovery program to reclaim your focus and mental clarity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
