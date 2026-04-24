import React from "react";

const featureData = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Atelier Delivery",
    description: "In Addis",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Fitting Revisions",
    description: "Guaranteed",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Checkout",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Concierge Support",
    description: "Anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="bg-navy border-t border-gold/20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gold/10">
          {featureData.map((item, key) => (
            <div
              className="group flex items-center gap-2 px-2 py-3 sm:gap-3 sm:px-3 sm:py-4 lg:px-6 lg:py-6"
              key={key}
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-navy-900 sm:h-8 sm:w-8 lg:h-10 lg:w-10">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[11px] font-medium leading-tight text-white sm:text-xs lg:text-sm">
                  {item.title}
                </h3>
                <p className="text-[9px] text-gray-5 sm:text-[10px] lg:text-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFeature;
