import React from "react";
import Image from "next/image";
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

  return (
    <footer className="overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-15">
          <div className="max-w-[330px] w-full">
            <div className="mb-7.5 text-center lg:text-left">
              <img
                src="/images/logo/Logo.png"
                alt={settings.brandName}
                style={{
                  width: "auto",
                  marginBottom: 16,
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  objectFit: "contain",
                }}
                className="h-[156px] lg:h-[220px] lg:mx-0"
              />
              <p className="mt-2 text-sm">{settings.metaDescription}</p>
            </div>

            <ul className="flex flex-col gap-3">
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
            <div className="w-full sm:w-auto" key={section.title}>
              <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
                {section.title}
              </h2>

              <ul className="flex flex-col gap-3.5">
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

          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark lg:text-right">
              Concierge
            </h2>

            <p className="lg:text-right text-custom-sm mb-4">
              Private fittings, delivery guidance, and bespoke assistance.
            </p>

            <ul className="flex flex-col lg:items-end gap-3">
              <li>
                <a
                  className="inline-flex items-center gap-3 py-[9px] pl-4 pr-7.5 text-white rounded-md bg-dark ease-out duration-200 hover:bg-opacity-95"
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
                  className="inline-flex items-center gap-3 py-[9px] pl-4 pr-8.5 text-white rounded-md bg-blue ease-out duration-200 hover:bg-opacity-95"
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

      <div className="py-5 xl:py-7.5 bg-gray-1">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-5 flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <p className="font-medium">We Accept:</p>

              <div className="flex flex-wrap items-center gap-6">
                {paymentLogos.map((logo) => (
                  <span key={logo.name} aria-label={logo.name}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      style={{ height: 36, width: "auto", objectFit: "contain" }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <p className="text-dark font-medium">
              &copy; {year}. All rights reserved by {settings.brandName}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
