"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { Menu } from "@/types/Menu";
import { FooterNavSection, SiteSettings } from "@/sanity/lib/globals";

export default function SiteShell({
  children,
  headerMenu,
  footerSections,
  settings,
}: {
  children: React.ReactNode;
  headerMenu: Menu[];
  footerSections: FooterNavSection[];
  settings: SiteSettings;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <ReduxProvider>
            <CartModalProvider>
              <ModalProvider>
                <PreviewSliderProvider>
                  <Header menuItems={headerMenu} settings={settings} />
                  {children}

                  <QuickViewModal />
                  <CartSidebarModal />
                  <PreviewSliderModal />
                </PreviewSliderProvider>
              </ModalProvider>
            </CartModalProvider>
          </ReduxProvider>
          <ScrollToTop />
          <Footer footerSections={footerSections} settings={settings} />
        </>
      )}
    </>
  );
}
