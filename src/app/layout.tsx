import type { Metadata } from "next";
import "./css/euclid-circular-a-font.css";
import "./css/style.css";
import { getSiteSettings } from "@/sanity/lib/globals";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.siteTitle,
    description: settings.metaDescription,
    openGraph: {
      title: settings.siteTitle,
      description: settings.metaDescription,
      images: settings.openGraphImageUrl ? [settings.openGraphImageUrl] : [],
    },
    icons: settings.faviconUrl
      ? {
          icon: settings.faviconUrl,
          shortcut: settings.faviconUrl,
        }
      : undefined,
    themeColor: settings.primaryBrandColor,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
