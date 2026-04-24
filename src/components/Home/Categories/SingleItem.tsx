import React from "react";
import Image from "next/image";
import Link from "next/link";

type CategoryItem = {
  id: string;
  title: string;
  slug: string;
  img: string;
};

const SingleItem = ({ item }: { item: CategoryItem }) => {
  return (
    <Link href={`/shop?category=${item.slug}`} className="group flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <div
          className="rounded-full overflow-hidden border border-gray-200 shadow-sm"
          style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F3F8' }}
        >
          <Image
            src={item.img}
            alt={item.title}
            width={80}
            height={80}
            style={{ objectFit: 'cover', width: 80, height: 80, borderRadius: '50%' }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark mt-2 bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;
