import type { Metadata } from "next";
import { Inter, Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import AppLayoutContent from "@/components/AppLayoutContent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portofolio-nine-opal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rifal Azhar | Data Analyst & Web Developer",
  description: "Portfolio of Rifal Azhar Permana — Data Analyst skilled in SQL, Python (Pandas), Tableau, Power BI, and data visualization. Also builds modern web apps with React & Next.js.",
  keywords: ["Rifal Azhar", "Data Analyst", "SQL", "Python", "Pandas", "Tableau", "Power BI", "Web Developer", "Data Visualization", "Portfolio"],
  authors: [{ name: "Rifal Azhar Permana" }],
  themeColor: "#000000",
  robots: "index, follow, max-image-preview:large",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Rifal Azhar | Creative Developer",
    description: "Exploring the intersection of Code, Design, and Data.",
    images: ["/p.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rifal Azhar | Creative Developer",
    description: "Exploring the intersection of Code, Design, and Data.",
    images: ["/p.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable} font-sans`}>
        <Providers>
          <AppLayoutContent>
            {children}
          </AppLayoutContent>
        </Providers>
      </body>
    </html>
  );
}
