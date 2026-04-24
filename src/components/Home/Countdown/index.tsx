"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Campaign } from "@/sanity/lib/storefront";

interface CounDownProps {
  campaign: Campaign | null;
}

const CounDown = ({ campaign }: CounDownProps) => {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const campaignDeadline = campaign?.expiryDate
      ? new Date(campaign.expiryDate).getTime()
      : Number.NaN;

    setDeadline(
      Number.isFinite(campaignDeadline) && campaignDeadline > Date.now()
        ? campaignDeadline
        : Date.now() + 7 * 24 * 60 * 60 * 1000
    );
  }, [campaign?.expiryDate]);

  useEffect(() => {
    if (!deadline) {
      return;
    }

    const calculateTime = () => {
      const diff = deadline - Date.now();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const title = campaign?.title || "A Curated Moment from the Atelier";
  const subtitle =
    campaign?.subtitle ||
    "Limited pieces, private fittings, and refined occasionwear selected for this season.";
  const buttonText = campaign?.buttonText || "Explore The Collection";
  const timerItems = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  return (
    <section className="overflow-hidden py-10 sm:py-18">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="relative overflow-hidden rounded-[6px] border border-gold/25 bg-[#f8f3ea]">
          <div className="grid items-stretch md:grid-cols-[1.08fr_0.92fr]">
            <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-9 lg:px-12 xl:px-15">
              <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.24em] text-gold sm:mb-3 sm:text-[11px] sm:tracking-[0.28em]">
                Atelier Campaign
              </span>

              <h2 className="max-w-[560px] font-serif-display text-2xl font-semibold leading-tight text-navy sm:text-4xl lg:text-heading-3">
                {title}
              </h2>

              <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-dark-3 sm:mt-4 sm:text-base">
                {subtitle}
              </p>

              <div className="mt-5 border-t border-navy/10 pt-4 sm:mt-7 sm:pt-5">
                <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-dark/55 sm:mb-3 sm:text-[11px] sm:tracking-[0.22em]">
                  Available for
                </span>

                <div className="grid max-w-[430px] grid-cols-4 gap-2 sm:gap-4">
                  {timerItems.map(([label, value]) => (
                    <div key={label} className="text-center">
                      <span className="flex h-10 items-center justify-center rounded-[4px] border border-navy/10 bg-white text-base font-semibold text-navy shadow-[0_12px_28px_rgba(20,31,57,0.08)] sm:h-14 sm:text-2xl">
                        {Number(value) < 10 ? `0${value}` : value}
                      </span>
                      <span className="mt-1.5 block text-[10px] text-dark/65 sm:mt-2 sm:text-xs">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/shop"
                className="mt-5 inline-flex rounded-[4px] bg-navy px-7 py-2.5 text-sm font-medium text-white duration-200 ease-out hover:bg-gold hover:text-navy sm:mt-8 sm:px-8 sm:py-3"
              >
                {buttonText}
              </Link>
            </div>

            <div className="relative hidden min-h-[220px] overflow-hidden bg-navy md:block lg:min-h-full">
              {campaign?.productImage ? (
                <Image
                  src={campaign.productImage}
                  alt="Campaign product"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[250px] items-center justify-center px-8 text-center">
                  <div>
                    <p className="font-serif-display text-5xl text-gold/90">
                      Oli&apos;s
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.36em] text-white/45">
                      Design Atelier
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounDown;
