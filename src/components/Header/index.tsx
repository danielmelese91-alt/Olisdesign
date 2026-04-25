"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { formatETB } from "@/lib/currency";
import { Menu } from "@/types/Menu";
import { SiteSettings } from "@/sanity/lib/globals";

const searchIcon = (
  <svg
    className="fill-current"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
      fill=""
    />
  </svg>
);

const accountIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const cartIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5433 9.5172C15.829 9.21725 15.8174 8.74252 15.5174 8.45686C15.2175 8.17119 14.7428 8.18277 14.4571 8.48272L12.1431 10.9125L11.5433 10.2827C11.2576 9.98277 10.7829 9.97119 10.483 10.2569C10.183 10.5425 10.1714 11.0173 10.4571 11.3172L11.6 12.5172C11.7415 12.6658 11.9378 12.75 12.1431 12.75C12.3483 12.75 12.5446 12.6658 12.6862 12.5172L15.5433 9.5172Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.29266 2.7512C1.43005 2.36044 1.8582 2.15503 2.24896 2.29242L2.55036 2.39838C3.16689 2.61511 3.69052 2.79919 4.10261 3.00139C4.54324 3.21759 4.92109 3.48393 5.20527 3.89979C5.48725 4.31243 5.60367 4.76515 5.6574 5.26153C5.66124 5.29706 5.6648 5.33321 5.66809 5.36996L17.1203 5.36996C17.9389 5.36995 18.7735 5.36993 19.4606 5.44674C19.8103 5.48584 20.1569 5.54814 20.4634 5.65583C20.7639 5.76141 21.0942 5.93432 21.3292 6.23974C21.711 6.73613 21.7777 7.31414 21.7416 7.90034C21.7071 8.45845 21.5686 9.15234 21.4039 9.97723L21.3935 10.0295L21.3925 10.0341L20.8836 12.5033C20.7339 13.2298 20.6079 13.841 20.4455 14.3231C20.2731 14.8346 20.0341 15.2842 19.6076 15.6318C19.1811 15.9793 18.6925 16.1226 18.1568 16.1882C17.6518 16.25 17.0278 16.25 16.2862 16.25L10.8804 16.25C9.53464 16.25 8.44479 16.25 7.58656 16.1283C6.69032 16.0012 5.93752 15.7285 5.34366 15.1022C4.79742 14.526 4.50529 13.9144 4.35897 13.0601C4.22191 12.2598 4.20828 11.2125 4.20828 9.75996V7.03832C4.20828 6.29837 4.20726 5.80316 4.16611 5.42295C4.12678 5.0596 4.05708 4.87818 3.96682 4.74609C3.87876 4.61723 3.74509 4.4968 3.44186 4.34802C3.11902 4.18961 2.68026 4.03406 2.01266 3.79934L1.75145 3.7075C1.36068 3.57012 1.15527 3.14197 1.29266 2.7512ZM5.70828 6.86996L5.70828 9.75996C5.70828 11.249 5.72628 12.1578 5.83744 12.8068C5.93933 13.4018 6.11202 13.7324 6.43219 14.0701C6.70473 14.3576 7.08235 14.5418 7.79716 14.6432C8.53783 14.7482 9.5209 14.75 10.9377 14.75H16.2406C17.0399 14.75 17.5714 14.7487 17.9746 14.6993C18.3573 14.6525 18.5348 14.571 18.66 14.469C18.7853 14.3669 18.9009 14.2095 19.024 13.8441C19.1537 13.4592 19.2623 12.9389 19.4237 12.156L19.9225 9.73591L19.9229 9.73369C20.1005 8.84376 20.217 8.2515 20.2444 7.80793C20.2704 7.38648 20.2043 7.23927 20.1429 7.15786C20.1367 7.15259 20.0931 7.11565 19.9661 7.07101C19.8107 7.01639 19.5895 6.97049 19.2939 6.93745C18.6991 6.87096 17.9454 6.86996 17.089 6.86996H5.70828Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.2502 19.5C5.2502 20.7426 6.25756 21.75 7.5002 21.75C8.74285 21.75 9.7502 20.7426 9.7502 19.5C9.7502 18.2573 8.74285 17.25 7.5002 17.25C6.25756 17.25 5.2502 18.2573 5.2502 19.5ZM7.5002 20.25C7.08599 20.25 6.7502 19.9142 6.7502 19.5C6.7502 19.0857 7.08599 18.75 7.5002 18.75C7.91442 18.75 8.2502 19.0857 8.2502 19.5C8.2502 19.9142 7.91442 20.25 7.5002 20.25Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.25 19.5001C14.25 20.7427 15.2574 21.7501 16.5 21.7501C17.7426 21.7501 18.75 20.7427 18.75 19.5001C18.75 18.2574 17.7426 17.2501 16.5 17.2501C15.2574 17.2501 14.25 18.2574 14.25 19.5001ZM16.5 20.2501C16.0858 20.2501 15.75 19.9143 15.75 19.5001C15.75 19.0859 16.0858 18.7501 16.5 18.7501C16.9142 18.7501 17.25 19.0859 17.25 19.5001C17.25 19.9143 16.9142 20.2501 16.5 20.2501Z"
      fill="#3C50E0"
    />
  </svg>
);

const Header = ({
  menuItems,
  settings,
}: {
  menuItems: Menu[];
  settings: SiteSettings;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [cartNeedsAttention, setCartNeedsAttention] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const cartItemCount = product.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const brandName =
    settings.brandName?.trim().toLowerCase() === "olies design"
      ? "Oli's Design"
      : settings.brandName || "Oli's Design";

  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  useEffect(() => {
    if (navigationOpen || mobileSearchOpen) {
      document.body.classList.add("overflow-hidden");
      return () => document.body.classList.remove("overflow-hidden");
    }

    document.body.classList.remove("overflow-hidden");
  }, [mobileSearchOpen, navigationOpen]);

  useEffect(() => {
    if (cartItemCount > previousCartCount) {
      setCartNeedsAttention(true);
    }

    setPreviousCartCount(cartItemCount);
  }, [cartItemCount, previousCartCount]);

  const closeNavigation = () => setNavigationOpen(false);
  const closeMobileSearch = () => setMobileSearchOpen(false);
  const handleCartOpen = () => {
    setCartNeedsAttention(false);
    openCartModal();
  };
  const toggleNavigation = () => {
    setMobileSearchOpen(false);
    setNavigationOpen((open) => !open);
  };
  const toggleMobileSearch = () => {
    setNavigationOpen(false);
    setMobileSearchOpen((open) => !open);
  };

  return (
    <>
      {settings.announcementEnabled && settings.announcementText && (
        <div
          className="px-4 py-2 text-center text-xs font-medium tracking-[0.18em] uppercase"
          style={{
            backgroundColor: settings.secondaryBrandColor,
            color: settings.primaryBrandColor,
          }}
        >
          {settings.announcementText}
        </div>
      )}

      <header
        className={`sticky top-0 z-9999 w-full bg-navy text-white transition-all duration-300 ease-in-out ${
          stickyMenu ? "shadow-lg" : ""
        }`}
      >
        <div className="mx-auto max-w-[1360px] px-4 sm:px-7.5 xl:px-6">
          <div
            className={`duration-200 ease-out ${
              stickyMenu ? "py-2" : "py-2.5"
            }`}
          >
            <div className="xl:hidden">
              <Link href="/" className="block">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/logo/Logo-mark.png"
                      alt={brandName}
                      className="h-8 w-auto object-contain opacity-95"
                    />
                    <span className="font-serif-display text-base font-semibold leading-none text-gold">
                      {brandName}
                    </span>
                  </div>
                  <span className="mt-1 block text-[7px] uppercase tracking-[0.24em] text-white/45 sm:text-[10px]">
                    Exquisite fashion from Addis Ababa
                  </span>
                </div>
              </Link>

              <div className="mt-3 flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  aria-label="Open search"
                  className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-200 hover:text-white/80"
                  onClick={toggleMobileSearch}
                >
                  {searchIcon}
                </button>

                <Link href="/signin" className="flex min-w-0 items-center gap-2">
                  <span className="text-gold" aria-hidden="true">
                    {accountIcon}
                  </span>
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.14em] text-white/40">
                      account
                    </span>
                    <p className="text-[16px] font-medium leading-none text-white">
                      Sign In
                    </p>
                  </div>
                </Link>

                <button onClick={handleCartOpen} className="flex min-w-0 items-center gap-2">
                  <span
                    className={`relative inline-block text-[#4a5dff] ${
                      cartNeedsAttention && cartItemCount > 0 ? "cart-heartbeat" : ""
                    }`}
                  >
                    {cartIcon}

                    <span className="absolute -right-2 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-navy-900">
                      {cartItemCount}
                    </span>
                  </span>

                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.14em] text-white/40">
                      cart
                    </span>
                    <p className="text-[15px] font-medium leading-none text-white">
                      {formatETB(totalPrice)}
                    </p>
                  </div>
                </button>

                <button
                  id="Toggle"
                  aria-label="Toggler"
                  className="block"
                  onClick={toggleNavigation}
                >
                  <span className="relative block h-7 w-7 cursor-pointer">
                    <span className="du-block absolute right-0 h-full w-full">
                      <span
                        className={`my-1.5 ml-auto block h-0.5 w-0 rounded-sm bg-white delay-[0] duration-200 ease-in-out ${
                          !navigationOpen ? "!w-full delay-300" : ""
                        }`}
                      ></span>
                      <span
                        className={`my-1.5 ml-auto block h-0.5 w-0 rounded-sm bg-white delay-150 duration-200 ease-in-out ${
                          !navigationOpen ? "!w-full delay-400" : ""
                        }`}
                      ></span>
                      <span
                        className={`my-1.5 ml-auto block h-0.5 w-0 rounded-sm bg-white delay-200 duration-200 ease-in-out ${
                          !navigationOpen ? "!w-full delay-500" : ""
                        }`}
                      ></span>
                    </span>

                    <span className="absolute right-0 block h-full w-full rotate-45">
                      <span
                        className={`absolute left-[13px] top-0 block h-full w-0.5 rounded-sm bg-white delay-300 duration-200 ease-in-out ${
                          !navigationOpen ? "!h-0 delay-[0]" : ""
                        }`}
                      ></span>
                      <span
                        className={`absolute left-0 top-[13px] block h-0.5 w-full rounded-sm bg-white delay-400 duration-200 ease-in-out ${
                          !navigationOpen ? "!h-0 dealy-200" : ""
                        }`}
                      ></span>
                    </span>
                  </span>
                </button>
              </div>
            </div>

            <div className="hidden xl:flex xl:flex-row xl:items-center xl:justify-between xl:gap-8">
              <div className="flex items-center justify-between gap-4 xl:w-[34%]">
                <Link href="/" className="flex min-w-0 items-center gap-4 lg:gap-5">
                  <div className="flex-shrink-0 rounded-[14px] bg-white/4 px-3 py-2 ring-1 ring-white/10 backdrop-blur-[2px]">
                    <img
                      src="/images/logo/Logo-mark.png"
                      alt={brandName}
                      className="h-12 w-auto object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-serif-display text-xl font-semibold tracking-[0.03em] text-white sm:text-2xl">
                      {brandName}
                    </p>
                    <span className="mt-1 block max-w-[220px] text-[11px] uppercase tracking-[0.22em] text-white/45 sm:max-w-[280px]">
                      Exquisite fashion from Addis Ababa
                    </span>
                  </div>
                </Link>
              </div>

              <div className="hidden xl:block xl:w-[32%]">
                <form>
                  <label className="sr-only" htmlFor="desktop-search">
                    Search the collection
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      type="search"
                      name="search"
                      id="desktop-search"
                      placeholder="Search collections, tailoring, or accessories..."
                      autoComplete="off"
                      className="w-full rounded-full border border-gold/30 bg-white/5 py-3 pl-5 pr-11 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/45 focus:border-gold focus:bg-white/[0.08]"
                    />

                    <button
                      type="submit"
                      aria-label="Search"
                      className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gold transition-colors duration-200 hover:text-gold-100"
                    >
                      {searchIcon}
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-4 xl:w-[34%] xl:justify-end">
                <div className="hidden items-center gap-3 2xl:flex">
                  <div className="text-gold">{accountIcon}</div>

                  <div>
                    <span className="block text-2xs uppercase text-white/40">
                      {brandName}
                    </span>
                    <p className="text-custom-sm font-medium text-white">
                      Addis Ababa Atelier
                    </p>
                  </div>
                </div>

                <span className="hidden h-8 w-px bg-white/15 2xl:block"></span>

                <div className="ml-auto flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    aria-label="Open search"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-200 hover:border-gold hover:bg-white/5 xl:hidden"
                    onClick={toggleMobileSearch}
                  >
                    {searchIcon}
                  </button>

                  <Link
                    href="/signin"
                    className="hidden items-center gap-2.5 md:flex"
                  >
                    <span className="text-gold" aria-hidden="true">
                      {accountIcon}
                    </span>
                    <div>
                      <span className="block text-2xs uppercase text-white/40">
                        account
                      </span>
                      <p className="text-custom-sm font-medium text-white">
                        Sign In
                      </p>
                    </div>
                  </Link>

                  <button onClick={handleCartOpen} className="flex items-center gap-2.5">
                    <span
                      className={`relative inline-block ${
                        cartNeedsAttention && cartItemCount > 0 ? "cart-heartbeat" : ""
                      }`}
                    >
                      {cartIcon}

                      <span className="absolute -right-2 -top-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gold text-2xs font-medium text-navy-900">
                        {cartItemCount}
                      </span>
                    </span>

                    <div className="hidden sm:block">
                      <span className="block text-2xs uppercase text-white/40">
                        cart
                      </span>
                      <p className="text-custom-sm font-medium text-white">
                        {formatETB(totalPrice)}
                      </p>
                    </div>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-7.5 xl:px-6">
            <div className="flex items-center justify-between">
              {navigationOpen && (
                <button
                  type="button"
                  aria-label="Close mobile menu"
                  className="fixed inset-0 z-[60] bg-navy/70 backdrop-blur-[2px] xl:hidden"
                  onClick={closeNavigation}
                />
              )}

              <div
                className={`invisible absolute right-4 top-full z-[70] h-0 w-[288px] xl:static xl:visible xl:flex xl:h-auto xl:w-auto xl:items-center xl:justify-between ${
                  navigationOpen
                    ? "!visible max-h-[400px] !h-auto overflow-y-scroll rounded-md border border-navy-400 bg-navy-700 p-5 shadow-lg"
                    : ""
                }`}
              >
                <nav>
                  <ul className="flex flex-col gap-5 xl:flex-row xl:flex-wrap xl:items-center xl:gap-x-7 xl:gap-y-0.5">
                    {menuItems.map((menuItem, i) =>
                      menuItem.submenu ? (
                        <Dropdown
                          key={i}
                          menuItem={menuItem}
                          stickyMenu={stickyMenu}
                        />
                      ) : (
                        <li
                          key={i}
                          className="group relative before:absolute before:left-0 before:top-0 before:h-[3px] before:w-0 before:rounded-b-[3px] before:bg-gold before:duration-200 before:ease-out hover:before:w-full"
                        >
                          <Link
                            href={menuItem.path || "/"}
                            onClick={closeNavigation}
                            className={`flex text-custom-sm font-medium text-white/80 hover:text-gold ${
                              stickyMenu ? "xl:py-4" : "xl:py-5"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>

              <div className="hidden xl:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[10000] bg-navy/95 px-5 py-6 lg:hidden">
          <div className="mx-auto flex h-full w-full max-w-lg flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-serif-display text-2xl text-gold">
                  Search {brandName}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  Find collections, tailoring, and signature details.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close search"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-200 hover:border-gold hover:text-gold"
                onClick={closeMobileSearch}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <form className="relative">
              <label className="sr-only" htmlFor="mobile-search">
                Search the collection
              </label>
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                type="search"
                name="mobile-search"
                id="mobile-search"
                placeholder="Search the collection"
                autoComplete="off"
                className="w-full rounded-[28px] border border-gold/25 bg-white/6 py-4 pl-5 pr-14 text-base text-white outline-none transition-colors duration-200 placeholder:text-white/45 focus:border-gold focus:bg-white/[0.08]"
              />
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gold">
                {searchIcon}
              </span>
            </form>

            <div className="mt-8 space-y-4 text-sm text-white/60">
              <p>
                Try: men&apos;s suits, traditional wear, evening edit,
                accessories
              </p>
              <button
                type="button"
                className="text-gold underline underline-offset-4"
                onClick={closeMobileSearch}
              >
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
