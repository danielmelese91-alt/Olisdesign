import React from "react";

const featureData = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Atelier Delivery",
    description: "Complimentary in Addis",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Fitting Revisions",
    description: "Perfect drape, guaranteed",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Protected checkout",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Concierge Support",
    description: "Styling help, anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="bg-navy border-t border-gold/20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gold/10">
          {featureData.map((item, key) => (
            <div
              className="flex items-center gap-3 py-4 lg:py-6 px-3 lg:px-6 group"
              key={key}
            >
              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-900 transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-xs lg:text-sm text-white">
                  {item.title}
                </h3>
                <p className="text-[10px] lg:text-xs text-gray-5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFeature;
