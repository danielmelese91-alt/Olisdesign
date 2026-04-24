import React from "react";
import SingleItem from "./SingleItem";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

const BestSeller = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="mb-1.5 flex items-center gap-2.5 font-medium text-dark">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-serif-display text-xl font-semibold text-dark xl:text-heading-5">
              Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((item, key) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>

        <div className="mt-12.5 text-center">
          <Link
            href="/shop"
            className="inline-flex rounded-md border border-gray-3 bg-gray-1 px-7 py-3 text-custom-sm font-medium text-dark duration-200 ease-out hover:border-transparent hover:bg-dark hover:text-white sm:px-12.5"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
