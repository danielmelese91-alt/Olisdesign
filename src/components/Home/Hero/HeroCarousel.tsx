"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { HeroSlide } from "@/sanity/lib/storefront";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import Image from "next/image";

const HeroCarousel = ({ slides }: { slides: HeroSlide[] }) => {
  return (
    <div className="bg-[linear-gradient(180deg,#f5f5f1_0%,#f7f1e4_52%,#f5f5f1_100%)] py-8 sm:py-10 lg:py-12">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          speed={800}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          grabCursor={true}
          touchEventsTarget="container"
          modules={[Autoplay, Pagination, EffectCoverflow]}
          className="hero-slider"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="hidden lg:block">
                <div className="rounded-[24px] border border-[#d9cfbe] bg-[#f8f2e7] p-4 pb-20 shadow-[0_26px_80px_rgba(18,18,18,0.08)]">
                  <div
                    className={`flex items-stretch gap-0 overflow-hidden rounded-[18px] ${
                      slide.imagePosition === "right" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="relative w-[58%] bg-[#eadfce]">
                      <div className="relative aspect-[4/5] min-h-[560px] w-full">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover object-center"
                          priority={index === 0}
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          quality={90}
                        />
                      </div>
                    </div>

                    <div className="flex w-[42%] items-center border-l border-[#e1d6c5] bg-[linear-gradient(180deg,#fbf7ef_0%,#f3ebde_100%)]">
                      <div className="w-full px-10 py-12 xl:px-14">
                        <div className="mb-6 flex items-center gap-3">
                          <span className="block h-px w-10 bg-gold" />
                          <span className="text-custom-sm font-medium uppercase tracking-[0.25em] text-gold">
                            {slide.subtitle}
                          </span>
                        </div>

                        <h1 className="mb-6 font-serif-display text-custom-4xl font-bold leading-tight text-[#121212] xl:text-heading-2">
                          {slide.title}
                        </h1>

                        <div className="mb-6 h-px w-14 bg-gold/40" />

                        <p className="mb-10 max-w-[380px] text-base leading-relaxed text-[#4f4a43]">
                          {slide.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <a href={slide.href} className="btn-gold">
                            {slide.cta}
                          </a>
                          <a
                            href="/shop"
                            className="btn-outline-gold !border-gold/50 !text-[#7f6331] hover:!bg-gold hover:!text-navy-900"
                          >
                            View All
                          </a>
                        </div>

                        <p className="mt-14 select-none font-serif-display text-base italic tracking-wider text-[#7f6331]/20">
                          You knit me together
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <div className="relative w-full overflow-hidden bg-[#f8f2e7]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover object-center"
                      priority={index === 0}
                      sizes="100vw"
                      quality={85}
                    />
                  </div>
                </div>

                <div className="px-4 pt-6 pb-8">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="block h-px w-6 bg-gold" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="mb-2.5 font-serif-display text-2xl font-bold leading-snug text-[#121212]">
                    {slide.title}
                  </h1>

                  <p className="mb-5 max-w-[340px] text-sm leading-relaxed text-[#4f4a43]">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <a
                      href={slide.href}
                      className="btn-gold !px-5 !py-2.5 !text-xs"
                    >
                      {slide.cta}
                    </a>
                    <a
                      href="/shop"
                      className="btn-outline-gold !border-gold/50 !px-5 !py-2.5 !text-xs !text-[#7f6331] hover:!bg-gold hover:!text-navy-900"
                    >
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;
