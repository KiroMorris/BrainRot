import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "7 Days to Clear Brain Rot | Digital Detox Program",
  description: "Evidence-based 7-day recovery program to cure brain rot. Reclaim your focus, break doom-scrolling habits, and rebuild your attention span through proven neuroscience methods.",
  keywords: ["brain rot cure", "digital detox", "screen addiction", "focus", "dopamine detox", "mental clarity", "productivity"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Brain Rot Cure",
  },
  openGraph: {
    title: "7 Days to Clear Brain Rot",
    description: "Evidence-based recovery program to reclaim your focus and mental clarity",
    type: "website",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
