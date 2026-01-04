import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7 Days of Brain Rot | Track Your Internet Descent",
  description: "Experience the ultimate brain rot journey. From Skibidi Toilet to full sigma grindset - track your 7-day descent into internet madness. No cap, this is fr fr bussin.",
  keywords: ["brain rot", "skibidi", "sigma", "rizz", "memes", "gen alpha", "internet culture"],
  openGraph: {
    title: "7 Days of Brain Rot",
    description: "Track your descent into internet madness",
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
