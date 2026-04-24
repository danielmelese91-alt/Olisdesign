import React from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";

const NewArrival = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden pt-15">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1.5 flex items-center gap-2.5 font-medium text-dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175Z"
                  stroke="#8C6A43"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="#8C6A43"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              This Season's
            </span>
            <h2 className="font-serif-display text-xl font-semibold text-dark xl:text-heading-5">
              Signature Arrivals
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex w-fit rounded-md border border-gray-3 bg-gray-1 px-7 py-2.5 text-custom-sm font-medium text-dark duration-200 ease-out hover:border-transparent hover:bg-dark hover:text-white"
          >
            View The Wardrobe
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
