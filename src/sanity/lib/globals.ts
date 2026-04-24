import { unstable_noStore as noStore } from "next/cache";
import { groq } from "next-sanity";
import { Menu } from "@/types/Menu";
import { client } from "./client";
import { imageRefToUrl } from "./image";
import { menuData } from "@/components/Header/menuData";

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

type SiteSettingsResult = {
  siteTitle?: string;
  metaDescription?: string;
  brandName?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  openGraphImage?: SanityImage;
  primaryBrandColor?: string;
  secondaryBrandColor?: string;
  accentBrandColor?: string;
  announcementEnabled?: boolean;
  announcementText?: string;
};

type SanityNavigationItem = {
  label?: string;
  url?: string;
  parent?: string;
  placement?: "header" | "footer" | "both";
  openInNewTab?: boolean;
};

type NavigationResult = {
  navItems?: SanityNavigationItem[];
};

export type SiteSettings = {
  siteTitle: string;
  metaDescription: string;
  brandName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  openGraphImageUrl: string | null;
  primaryBrandColor: string;
  secondaryBrandColor: string;
  accentBrandColor: string;
  announcementEnabled: boolean;
  announcementText: string;
};

export type FooterNavSection = {
  title: string;
  items: {
    label: string;
    url: string;
    openInNewTab: boolean;
  }[];
};

const defaultSettings: SiteSettings = {
  siteTitle: "Oli's Design | Luxury Fashion Addis Ababa",
  metaDescription: "Exquisite fashion from the heart of Addis Ababa.",
  brandName: "Oli's Design",
  logoUrl: null,
  faviconUrl: null,
  openGraphImageUrl: null,
  primaryBrandColor: "#121212",
  secondaryBrandColor: "#C5A55A",
  accentBrandColor: "#F5F5F1",
  announcementEnabled: false,
  announcementText: "",
};

const fallbackFooterSections: FooterNavSection[] = [
  {
    title: "Client Services",
    items: [
      { label: "My Account", url: "/my-account", openInNewTab: false },
      { label: "Saved Pieces", url: "/wishlist", openInNewTab: false },
      { label: "Boutique Checkout", url: "/checkout", openInNewTab: false },
      { label: "Shipping", url: "/contact", openInNewTab: false },
    ],
  },
  {
    title: "House",
    items: [
      { label: "Collections", url: "/shop", openInNewTab: false },
      { label: "Our Story", url: "/blogs/blog-grid", openInNewTab: false },
      { label: "Atelier Journal", url: "/blogs/blog-grid", openInNewTab: false },
      { label: "Contact", url: "/contact", openInNewTab: false },
    ],
  },
];

function buildHeaderMenu(items: SanityNavigationItem[] | undefined) {
  if (!items?.length) {
    return menuData;
  }

  const headerItems = items.filter(
    (item) => item.placement === "header" || item.placement === "both"
  );

  const roots = headerItems.filter(
    (item) => !item.parent || item.parent === "root"
  );

  if (!roots.length) {
    return menuData;
  }

  return roots.map((item, index) => {
    const submenu = headerItems
      .filter((child) => child.parent === item.label)
      .map((child, childIndex) => ({
        id: Number(`${index + 1}${childIndex + 1}`),
        title: child.label || "Navigation Item",
        path: child.url || "/",
        newTab: Boolean(child.openInNewTab),
      }));

    return {
      id: index + 1,
      title: item.label || "Navigation Item",
      path: item.url || "/",
      newTab: Boolean(item.openInNewTab),
      submenu: submenu.length ? submenu : undefined,
    };
  });
}

function buildFooterSections(items: SanityNavigationItem[] | undefined) {
  if (!items?.length) {
    return fallbackFooterSections;
  }

  const footerItems = items.filter(
    (item) => item.placement === "footer" || item.placement === "both"
  );

  const sections = Array.from(
    footerItems.reduce<Map<string, FooterNavSection["items"]>>((acc, item) => {
      const parent = item.parent && item.parent !== "root" ? item.parent : "House";
      const group = acc.get(parent) ?? [];
      if (item.label && item.url) {
        group.push({
          label: item.label,
          url: item.url,
          openInNewTab: Boolean(item.openInNewTab),
        });
      }
      acc.set(parent, group);
      return acc;
    }, new Map())
  ).map(([title, sectionItems]) => ({
    title,
    items: sectionItems,
  }));

  return sections.length ? sections : fallbackFooterSections;
}

export async function getSiteSettings() {
  noStore();

  const settings = await client.fetch<SiteSettingsResult | null>(
    groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
      siteTitle,
      metaDescription,
      brandName,
      logo,
      favicon,
      openGraphImage,
      primaryBrandColor,
      secondaryBrandColor,
      accentBrandColor,
      announcementEnabled,
      announcementText
    }`
  );

  if (!settings) {
    return defaultSettings;
  }

  return {
    siteTitle: settings.siteTitle || defaultSettings.siteTitle,
    metaDescription: settings.metaDescription || defaultSettings.metaDescription,
    brandName: settings.brandName || defaultSettings.brandName,
    logoUrl: imageRefToUrl(settings.logo),
    faviconUrl: imageRefToUrl(settings.favicon),
    openGraphImageUrl: imageRefToUrl(settings.openGraphImage),
    primaryBrandColor:
      settings.primaryBrandColor || defaultSettings.primaryBrandColor,
    secondaryBrandColor:
      settings.secondaryBrandColor || defaultSettings.secondaryBrandColor,
    accentBrandColor:
      settings.accentBrandColor || defaultSettings.accentBrandColor,
    announcementEnabled: Boolean(settings.announcementEnabled),
    announcementText: settings.announcementText || "",
  };
}

export async function getGlobalNavigation() {
  noStore();

  const navigation = await client.fetch<NavigationResult | null>(
    groq`*[_type == "navigation" && _id == "navigation"][0]{
      navItems
    }`
  );

  return {
    headerMenu: buildHeaderMenu(navigation?.navItems),
    footerSections: buildFooterSections(navigation?.navItems),
  };
}
