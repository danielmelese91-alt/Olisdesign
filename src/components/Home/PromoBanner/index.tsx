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
    title: "Luxury Fashion, Tailored For Addis",
    subtitle:
      "Discover ceremonial dressing, modern tailoring, and refined accessories designed to move from private fittings to grand occasions.",
    buttonText: "Discover The Collection",
    image: "/images/promo/promo-01.png",
    bgColor: "#F5F0E8",
    categoryPath: "#",
  },
  {
    id: "promo-2",
    title: "Ceremony, Reimagined",
    subtitle: "Hand-finished silhouettes",
    buttonText: "View Traditional Wear",
    image: "/images/promo/promo-02.png",
    bgColor: "#EADFCF",
    categoryPath: "#",
  },
  {
    id: "promo-3",
    title: "Finishing touches with timeless restraint",
    subtitle:
      "Scarves, belts, and occasion pieces crafted to complete the Olies Design wardrobe.",
    buttonText: "Shop Accessories",
    image: "/images/promo/promo-03.png",
    bgColor: "#FFECE1",
    categoryPath: "#",
  },
];

const mapBanners = (items: SanityBanner[]): BannerData[] =>
  items.slice(0, 3).map((item, index) => ({
    id: item._id,
    title: item.title || defaultBanners[index]?.title || "Banner Title",
    subtitle: item.subtitle || defaultBanners[index]?.subtitle || "",
    buttonText:
      item.buttonText || defaultBanners[index]?.buttonText || "Learn More",
    image:
      imageRefToUrl(item.image) || defaultBanners[index]?.image || "/images/promo/promo-01.png",
    bgColor: item.bgColor || defaultBanners[index]?.bgColor,
    categoryPath: item.categoryPath || defaultBanners[index]?.categoryPath || "#",
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
      } catch (error) {
        console.error("Failed to fetch banner data:", error);
      }
    }

    loadBanners();
    return () => {
      active = false;
    };
  }, []);

  const [heroBanner, leftBanner, rightBanner] = banners;

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div
          className="relative z-1 overflow-hidden rounded-lg py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5"
          style={heroBanner.bgColor ? { backgroundColor: heroBanner.bgColor } : undefined}
        >
          <div className="max-w-[550px] w-full relative z-10">
            <span className="block font-medium text-base sm:text-xl text-dark mb-3">
              {heroBanner.title}
            </span>

            <h2 className="font-bold text-lg sm:text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              {heroBanner.title}
            </h2>

            <p className="hidden sm:block text-sm sm:text-base">{heroBanner.subtitle}</p>
            <p className="sm:hidden text-xs sm:text-sm text-dark/80 mb-4">{heroBanner.subtitle}</p>

            <a
              href={heroBanner.categoryPath || "#"}
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
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
            className="absolute inset-0 -z-1 sm:hidden opacity-30"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          <div
            className="relative z-1 overflow-hidden rounded-lg py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10"
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

            <div className="relative z-10">
              <span className="block text-base sm:text-lg text-dark mb-1.5">
                {leftBanner.title}
              </span>

              <h2 className="font-bold text-lg sm:text-xl lg:text-heading-4 text-dark mb-2.5">
                {leftBanner.title}
              </h2>

              <p className="font-semibold text-sm sm:text-custom-1 text-teal hidden sm:block">
                {leftBanner.subtitle}
              </p>
              <p className="font-semibold text-xs sm:text-sm text-teal sm:hidden">
                {leftBanner.subtitle}
              </p>

              <a
                href={leftBanner.categoryPath || "#"}
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                {leftBanner.buttonText}
              </a>
            </div>
          </div>

          <div
            className="relative z-1 overflow-hidden rounded-lg py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10"
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

            <div className="relative z-10">
              <span className="block text-base sm:text-lg text-dark mb-1.5">
                {rightBanner.title}
              </span>

              <h2 className="font-bold text-lg sm:text-xl lg:text-heading-4 text-dark mb-2.5">
                {rightBanner.title}
              </h2>

              <p className="max-w-[285px] text-sm sm:text-custom-sm hidden sm:block">
                {rightBanner.subtitle}
              </p>
              <p className="max-w-[200px] text-xs sm:text-sm text-dark/80 sm:hidden">
                {rightBanner.subtitle}
              </p>

              <a
                href={rightBanner.categoryPath || "#"}
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
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
