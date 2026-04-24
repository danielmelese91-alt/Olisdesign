import Link from "next/link";
import { StorefrontCategory } from "@/sanity/lib/storefront";

type CategoryFilterBarProps = {
  categories: StorefrontCategory[];
  currentCategory?: string;
  path: string;
};

const CategoryFilterBar = ({
  categories,
  currentCategory,
  path,
}: CategoryFilterBarProps) => {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="mb-8 rounded-[28px] border border-[#d8cfbb] bg-[#fbf8f0] px-5 py-5 shadow-[0_20px_50px_rgba(18,18,18,0.06)] sm:px-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8c6a43]">
            Category Filter
          </p>
          <h2 className="mt-1 font-serif text-2xl text-[#121212]">
            Browse by collection story
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={path}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              !currentCategory
                ? "border-[#121212] bg-[#121212] text-white"
                : "border-[#d8cfbb] bg-white text-[#121212] hover:border-[#8c6a43] hover:text-[#8c6a43]"
            }`}
          >
            All Pieces
          </Link>

          {categories.map((category) => {
            const isActive = currentCategory === category.slug;

            return (
              <Link
                key={category.id}
                href={`${path}?category=${category.slug}`}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-[#121212] bg-[#121212] text-white"
                    : "border-[#d8cfbb] bg-white text-[#121212] hover:border-[#8c6a43] hover:text-[#8c6a43]"
                }`}
              >
                {category.title} ({category.productCount})
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;
