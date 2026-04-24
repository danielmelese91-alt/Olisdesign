import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import { HeroSlide } from "@/sanity/lib/storefront";

const Hero = ({ slides }: { slides: HeroSlide[] }) => {
  return (
    <>
      <section className="bg-navy">
        <HeroCarousel slides={slides} />
      </section>

      <HeroFeature />
    </>
  );
};

export default Hero;
