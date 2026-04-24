import SiteShell from "./SiteShell";
import { getGlobalNavigation, getSiteSettings } from "@/sanity/lib/globals";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navigation] = await Promise.all([
    getSiteSettings(),
    getGlobalNavigation(),
  ]);

  return (
    <SiteShell
      headerMenu={navigation.headerMenu}
      footerSections={navigation.footerSections}
      settings={settings}
    >
      {children}
    </SiteShell>
  );
}
