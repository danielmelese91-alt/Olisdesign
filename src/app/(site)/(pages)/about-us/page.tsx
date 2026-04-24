import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutUsPage = () => {
  return (
    <main>
      <Breadcrumb title="About Us" pages={["home", "/", "about us"]} />

      <section className="bg-[#f5f0e8] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-[1170px] gap-10 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] xl:px-0">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              Oli&apos;s Design
            </span>
            <h1 className="mt-3 font-serif-display text-4xl font-semibold leading-tight text-navy sm:text-heading-3">
              Exquisite fashion from Addis Ababa.
            </h1>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-dark-3">
            <p>
              Oli&apos;s Design is an Addis Ababa atelier focused on refined
              occasionwear, traditional details, and modern pieces prepared with
              a personal fitting experience.
            </p>
            <p>
              The collection experience is designed around the customer: clear
              browsing, thoughtful styling, secure checkout, and concierge
              support for fittings and delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
