import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents auto-zoom on input focus on iOS
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "PokéFusion Web - Fan Made Pokémon Fusion Generator",
  description: "A production-grade Pokémon fusion generator. Fuse your favorite Pokémon, discover new typings, and view custom community sprites for free.",
  keywords: ["pokemon fusion", "pokemon generator", "infinite fusion", "custom sprites", "fakemon", "pokedex"],
  authors: [{ name: "PokéFusion Web" }],
  openGraph: {
    title: "PokéFusion Web - Ultimate Fusion Generator",
    description: "Create limitless Pokémon fusions with our advanced stat and typing engine.",
    url: "https://eccandc.org",
    siteName: "PokéFusion Web",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéFusion Web",
    description: "Generate and discover infinite Pokémon fusions instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
