"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Campaign } from "@/sanity/lib/storefront";

interface CounDownProps {
  campaign: Campaign | null;
}

const CounDown = ({ campaign }: CounDownProps) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Use campaign expiry date or default to 7 days from now
  const deadline = campaign?.expiryDate 
    ? new Date(campaign.expiryDate).getTime() 
    : Date.now() + 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    // Calculate time remaining
    const calculateTime = () => {
      const now = Date.now();
      const diff = deadline - now;
      
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

    // Calculate immediately
    calculateTime();

    // Update every second
    const timer = setInterval(calculateTime, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [deadline]);

  // Campaign data with fallbacks
  const title = campaign?.title || "Don't Miss Out!";
  const subtitle = campaign?.subtitle || "Discover our exclusive collection";
  const buttonText = campaign?.buttonText || "Shop Now";

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative overflow-hidden z-1 rounded-lg bg-[#D0E9F3] p-4 sm:p-7.5 lg:p-10 xl:p-15">
          <div className="max-w-[422px] w-full">
            <span className="block font-medium text-custom-1 text-blue mb-2.5">
              Don't Miss!!
            </span>

            <h2 className="font-bold text-dark text-xl lg:text-heading-4 xl:text-heading-3 mb-3">
              {title}
            </h2>

            <p>{subtitle}</p>

            {/* <!-- Countdown timer --> */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
              {/* <!-- timer day --> */}
              <div>
                <span className="min-w-[50px] sm:min-w-[64px] h-12 sm:h-14.5 font-semibold text-lg sm:text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-3 sm:px-4 mb-2">
                  {timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days}
                </span>
                <span className="block text-xs sm:text-custom-sm text-dark text-center">
                  Days
                </span>
              </div>

              {/* <!-- timer hours --> */}
              <div>
                <span className="min-w-[50px] sm:min-w-[64px] h-12 sm:h-14.5 font-semibold text-lg sm:text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-3 sm:px-4 mb-2">
                  {timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours}
                </span>
                <span className="block text-xs sm:text-custom-sm text-dark text-center">
                  Hours
                </span>
              </div>

              {/* <!-- timer minutes --> */}
              <div>
                <span className="min-w-[50px] sm:min-w-[64px] h-12 sm:h-14.5 font-semibold text-lg sm:text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-3 sm:px-4 mb-2">
                  {timeLeft.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes}
                </span>
                <span className="block text-xs sm:text-custom-sm text-dark text-center">
                  Minutes
                </span>
              </div>

              {/* <!-- timer seconds --> */}
              <div>
                <span className="min-w-[50px] sm:min-w-[64px] h-12 sm:h-14.5 font-semibold text-lg sm:text-xl lg:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-2 px-3 sm:px-4 mb-2">
                  {timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds}
                </span>
                <span className="block text-xs sm:text-custom-sm text-dark text-center">
                  Seconds
                </span>
              </div>
            </div>
            {/* <!-- Countdown timer ends --> */}

            <a
              href="#"
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-3 px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              {buttonText}
            </a>
          </div>

          {/* <!-- product image from Sanity --> */}
          {campaign?.productImage && (
            <div className="hidden lg:block absolute right-4 xl:right-33 bottom-4 xl:bottom-10 -z-1">
              <Image
                src={campaign.productImage}
                alt="Campaign product"
                width={411}
                height={376}
                className="object-contain"
              />
            </div>
          )}

          {/* <!-- bg shapes --> */}
          <Image
            src="/images/countdown/countdown-bg.png"
            alt="bg shapes"
            className="hidden sm:block absolute right-0 bottom-0 -z-1"
            width={737}
            height={482}
          />
        </div>
      </div>
    </section>
  );
};

export default CounDown;