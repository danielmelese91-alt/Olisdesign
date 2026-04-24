import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import { HeroSlide, Campaign } from "@/sanity/lib/storefront";
import { Product } from "@/types/product";

const Home = ({
  heroSlides,
  bestSellers,
  signatureArrivals,
  campaign,
}: {
  heroSlides: HeroSlide[];
  bestSellers: Product[];
  signatureArrivals: Product[];
  campaign: Campaign | null;
}) => {
  return (
    <main>
      <Hero slides={heroSlides} />
      <Categories />
      <NewArrival products={signatureArrivals} />
      <PromoBanner />
      <BestSeller products={bestSellers} />
      <CounDown campaign={campaign} />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
