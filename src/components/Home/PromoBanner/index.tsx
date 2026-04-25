"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { imageRefToUrl } from "@/sanity/lib/image";

type SanityBanner = {
  _id: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  image?: { asset?: { _ref?: string } };
  bgColor?: string;
  categoryPath?: string;
};

type BannerData = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  bgColor?: string;
  categoryPath?: string;
};

const defaultBanners: BannerData[] = [
  {
    id: "promo-1",
    eyebrow: "Oli's Design Edit",
    title: "Luxury Fashion, Tailored For Addis",
    subtitle:
      "Discover ceremonial dressing, modern tailoring, and refined accessories designed to move from private fittings to grand occasions.",
    buttonText: "Discover The Collection",
    image: "/images/hero/slide-bridal.jpg",
    bgColor: "#F5F0E8",
    categoryPath: "/shop",
  },
  {
    id: "promo-2",
    eyebrow: "Ceremonial Dressing",
    title: "Ceremony, Reimagined",
    subtitle: "Hand-finished silhouettes",
    buttonText: "View Traditional Wear",
    image: "/images/hero/slide-modern.jpg",
    bgColor: "#EADFCF",
    categoryPath: "/shop?category=traditional",
  },
  {
    id: "promo-3",
    eyebrow: "Finishing Details",
    title: "Finishing touches with timeless restraint",
    subtitle:
      "Scarves, belts, and occasion pieces crafted to complete the Olies Design wardrobe.",
    buttonText: "Shop Accessories",
    image: "/images/hero/slide-evening.jpg",
    bgColor: "#FFECE1",
    categoryPath: "/shop?category=accessories",
  },
];

function normalizeBannerHref(value?: string) {
  if (!value || value === "#") {
    return "/shop";
  }

  if (value.startsWith("/shop") || value.startsWith("/products/")) {
    return value;
  }

  if (value.startsWith("http")) {
    return value;
  }

  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `/shop?category=${slug}` : "/shop";
}

const mapBanners = (items: SanityBanner[]): BannerData[] =>
  items.slice(0, 3).map((item, index) => ({
    id: item._id,
    eyebrow: defaultBanners[index]?.eyebrow || "Oli's Design",
    title: item.title || defaultBanners[index]?.title || "Banner Title",
    subtitle: item.subtitle || defaultBanners[index]?.subtitle || "",
    buttonText:
      item.buttonText || defaultBanners[index]?.buttonText || "Learn More",
    image:
      imageRefToUrl(item.image) || defaultBanners[index]?.image || "/images/hero/slide-bridal.jpg",
    bgColor: item.bgColor || defaultBanners[index]?.bgColor,
    categoryPath: normalizeBannerHref(
      item.categoryPath || defaultBanners[index]?.categoryPath
    ),
  }));

const PromoBanner = () => {
  const [banners, setBanners] = useState<BannerData[]>(defaultBanners);

  useEffect(() => {
    let active = true;

    async function loadBanners() {
      try {
        const fetched = await client.fetch<SanityBanner[]>(
          groq`*[_type == "banner"] {
            _id,
            title,
            subtitle,
            buttonText,
            image,
            bgColor,
            categoryPath
          }`
        );

        if (!active || !fetched?.length) {
          return;
        }

        setBanners(mapBanners(fetched));
      } catch {
        if (active) {
          setBanners(defaultBanners);
        }
      }
    }

    loadBanners();
    return () => {
      active = false;
    };
  }, []);

  const [heroBanner, leftBanner, rightBanner] = banners;

  return (
    <section className="overflow-hidden py-14 sm:py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div
          className="relative z-1 mb-7.5 overflow-hidden rounded-[6px] px-5 py-12.5 sm:px-7.5 lg:px-14 lg:py-17.5 xl:px-19 xl:py-22.5"
          style={heroBanner.bgColor ? { backgroundColor: heroBanner.bgColor } : undefined}
        >
          <div className="max-w-[550px] w-full relative z-10">
            <span className="mb-3 block text-[11px] font-medium uppercase tracking-[0.24em] text-gold sm:text-xs">
              {heroBanner.eyebrow}
            </span>

            <h2 className="mb-5 max-w-[520px] font-serif-display text-3xl font-semibold leading-tight text-navy sm:text-4xl lg:text-heading-4 xl:text-heading-3">
              {heroBanner.title}
            </h2>

            <p className="max-w-[510px] text-sm leading-relaxed text-dark-3 sm:text-base">
              {heroBanner.subtitle}
            </p>

            <a
              href={heroBanner.categoryPath || "#"}
              className="mt-7.5 inline-flex rounded-[4px] bg-navy px-9.5 py-[11px] text-custom-sm font-medium text-white duration-200 ease-out hover:bg-gold hover:text-navy"
            >
              {heroBanner.buttonText}
            </a>
          </div>

          <Image
            src={heroBanner.image}
            alt={heroBanner.title}
            className="absolute bottom-0 right-0 top-0 w-[40%] -z-1 hidden sm:block"
            fill
            style={{ objectFit: 'cover', objectPosition: 'right bottom' }}
          />
          <Image
            src={heroBanner.image}
            alt={heroBanner.title}
            className="absolute inset-0 -z-1 opacity-25 sm:hidden"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          <div
            className="relative z-1 overflow-hidden rounded-[6px] px-5 py-10 sm:px-7.5 xl:px-10 xl:py-16"
            style={leftBanner.bgColor ? { backgroundColor: leftBanner.bgColor } : undefined}
          >
            <Image
              src={leftBanner.image}
              alt={leftBanner.title}
              className="absolute top-0 right-0 w-[40%] h-full -z-1 hidden sm:block"
              fill
              style={{ objectFit: 'cover', objectPosition: 'right center' }}
            />
            <Image
              src={leftBanner.image}
              alt={leftBanner.title}
              className="absolute inset-0 -z-1 sm:hidden opacity-40"
              fill
              style={{ objectFit: 'cover' }}
            />

            <div className="relative z-10 max-w-[340px]">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                {leftBanner.eyebrow}
              </span>

              <h2 className="mb-3 font-serif-display text-2xl font-semibold leading-tight text-navy sm:text-3xl lg:text-heading-4">
                {leftBanner.title}
              </h2>

              <p className="text-sm leading-relaxed text-dark-3 sm:text-base">
                {leftBanner.subtitle}
              </p>

              <a
                href={leftBanner.categoryPath || "#"}
                className="mt-8 inline-flex rounded-[4px] bg-navy px-8.5 py-2.5 text-custom-sm font-medium text-white duration-200 ease-out hover:bg-gold hover:text-navy"
              >
                {leftBanner.buttonText}
              </a>
            </div>
          </div>

          <div
            className="relative z-1 overflow-hidden rounded-[6px] px-5 py-10 sm:px-7.5 xl:px-10 xl:py-16"
            style={rightBanner.bgColor ? { backgroundColor: rightBanner.bgColor } : undefined}
          >
            <Image
              src={rightBanner.image}
              alt={rightBanner.title}
              className="absolute top-0 right-0 w-[40%] h-full -z-1 hidden sm:block"
              fill
              style={{ objectFit: 'cover', objectPosition: 'right center' }}
            />
            <Image
              src={rightBanner.image}
              alt={rightBanner.title}
              className="absolute inset-0 -z-1 sm:hidden opacity-40"
              fill
              style={{ objectFit: 'cover' }}
            />

            <div className="relative z-10 max-w-[340px]">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
                {rightBanner.eyebrow}
              </span>

              <h2 className="mb-3 font-serif-display text-2xl font-semibold leading-tight text-navy sm:text-3xl lg:text-heading-4">
                {rightBanner.title}
              </h2>

              <p className="text-sm leading-relaxed text-dark-3 sm:text-base">
                {rightBanner.subtitle}
              </p>

              <a
                href={rightBanner.categoryPath || "#"}
                className="mt-8 inline-flex rounded-[4px] bg-navy px-8.5 py-2.5 text-custom-sm font-medium text-white duration-200 ease-out hover:bg-gold hover:text-navy"
              >
                {rightBanner.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
