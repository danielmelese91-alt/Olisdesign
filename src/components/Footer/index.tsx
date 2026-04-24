import React from "react";
import Link from "next/link";
import { FooterNavSection, SiteSettings } from "@/sanity/lib/globals";

const paymentLogos = [
  {
    name: "Commercial Bank of Ethiopia",
    src: "/images/payment/CBE.png",
    alt: "CBE",
  },
  {
    name: "Bank of Abyssinia",
    src: "/images/payment/Abisinia.png",
    alt: "Bank of Abyssinia",
  },
  {
    name: "Awash Bank",
    src: "/images/payment/Awash.png",
    alt: "Awash Bank",
  },
  {
    name: "Telebirr",
    src: "/images/payment/Telebirr%20logo.png",
    alt: "Telebirr",
  },
];

const Footer = ({
  footerSections,
  settings,
}: {
  footerSections: FooterNavSection[];
  settings: SiteSettings;
}) => {
  const year = new Date().getFullYear();
  const brandName =
    settings.brandName?.trim().toLowerCase() === "olies design"
      ? "Oli's Design"
      : settings.brandName || "Oli's Design";

  return (
    <footer className="overflow-hidden">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-10 pb-10 pt-14 sm:pt-17.5 xl:flex-nowrap xl:justify-between xl:gap-19 xl:pb-15 xl:pt-22.5">
          <div className="mx-auto max-w-[330px] w-full lg:mx-0">
            <div className="mb-7.5 text-center lg:text-left">
              <img
                src="/images/logo/Logo-mark.png"
                alt={brandName}
                className="mx-auto mb-4 h-16 w-auto object-contain lg:mx-0 lg:h-[72px]"
              />
              <h2 className="font-serif-display text-2xl font-semibold text-dark">
                {brandName}
              </h2>
              <p className="mt-2 text-sm">{settings.metaDescription}</p>
            </div>

            <ul className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <li>Bole Road, Addis Ababa, Ethiopia.</li>
              <li>
                <a href="#" className="ease-out duration-200 hover:text-blue">
                  +251 91 532 7869
                </a>
              </li>
              <li>
                <a href="#" className="ease-out duration-200 hover:text-blue">
                  concierge@oliesdesign.com
                </a>
              </li>
            </ul>
          </div>

          {footerSections.map((section) => (
            <div className="w-full text-center sm:w-auto lg:text-left" key={section.title}>
              <h2 className="mb-5 text-custom-1 font-medium text-dark lg:mb-7.5">
                {section.title}
              </h2>

              <ul className="flex flex-col items-center gap-3 lg:items-start lg:gap-3.5">
                {section.items.map((item) => (
                  <li key={`${section.title}-${item.label}`}>
                    <Link
                      className="ease-out duration-200 hover:text-blue"
                      href={item.url}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noreferrer" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="w-full text-center sm:w-auto lg:text-right">
            <h2 className="mb-5 text-custom-1 font-medium text-dark lg:mb-7.5">
              Concierge
            </h2>

            <p className="mb-4 max-w-[300px] text-custom-sm mx-auto lg:mx-0">
              Private fittings, delivery guidance, and bespoke assistance.
            </p>

            <ul className="flex flex-col items-center gap-3 lg:items-end">
              <li>
                <a
                  className="inline-flex w-[260px] items-center justify-center gap-3 rounded-md bg-dark px-4 py-[10px] text-white duration-200 ease-out hover:bg-opacity-95"
                  href="#"
                >
                  <div>
                    <span className="block text-custom-xs">Book your</span>
                    <p className="font-medium">Private Fitting</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  className="inline-flex w-[260px] items-center justify-center gap-3 rounded-md bg-gold px-4 py-[10px] text-white duration-200 ease-out hover:bg-opacity-95"
                  href="#"
                >
                  <div>
                    <span className="block text-custom-xs">Arrange</span>
                    <p className="font-medium">Delivery Support</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-1 py-5 pb-14 xl:py-7.5">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-between">
            <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row">
              <p className="font-medium">We Accept:</p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {paymentLogos.map((logo) => (
                  <span
                    key={logo.name}
                    aria-label={logo.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[#f8f3ea] shadow-sm sm:h-14 sm:w-14"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-5 max-w-8 object-contain sm:max-h-7 sm:max-w-10"
                    />
                  </span>
                ))}
              </div>
            </div>

            <p className="w-full text-center text-dark font-medium lg:w-auto lg:text-left">
              &copy; {year}. All rights reserved by {brandName}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
