"use client";

import Link from "next/link";
import { useState } from "react";
import { StorefrontCategory } from "@/sanity/lib/storefront";

type CategoryDropdownProps = {
  categories: StorefrontCategory[];
  currentCategory?: string;
  path: string;
};

const CategoryItem = ({
  category,
  currentCategory,
  path,
}: {
  category: StorefrontCategory;
  currentCategory?: string;
  path: string;
}) => {
  const selected = currentCategory === category.slug;

  return (
    <Link
      href={`${path}?category=${category.slug}`}
      className={`group flex items-center justify-between ease-out duration-200 hover:text-blue ${
        selected ? "text-blue" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-4 w-4 items-center justify-center rounded border ${
            selected ? "border-blue bg-blue" : "border-gray-3 bg-white"
          }`}
        >
          <svg
            className={selected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span>{category.title}</span>
      </div>

      <span
        className={`inline-flex rounded-[30px] px-2 text-custom-xs ease-out duration-200 group-hover:bg-blue group-hover:text-white ${
          selected ? "bg-blue text-white" : "bg-gray-2"
        }`}
      >
        {category.productCount}
      </span>
    </Link>
  );
};

const CategoryDropdown = ({
  categories,
  currentCategory,
  path,
}: CategoryDropdownProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={(event) => {
          event.preventDefault();
          setToggleDropdown(!toggleDropdown);
        }}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className="text-dark">Category</p>
        <button
          aria-label="button for category dropdown"
          className={`text-dark ease-out duration-200 ${
            toggleDropdown && "rotate-180"
          }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        <Link
          href={path}
          className={`group flex items-center justify-between ease-out duration-200 hover:text-blue ${
            !currentCategory ? "text-blue" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border ${
                !currentCategory ? "border-blue bg-blue" : "border-gray-3 bg-white"
              }`}
            >
              <svg
                className={!currentCategory ? "block" : "hidden"}
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                  stroke="white"
                  strokeWidth="1.94437"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span>All Pieces</span>
          </div>
        </Link>

        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            currentCategory={currentCategory}
            path={path}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
