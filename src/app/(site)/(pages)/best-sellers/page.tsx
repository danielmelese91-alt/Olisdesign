import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import {
  getBestSellerProducts,
  getStorefrontCategories,
} from "@/sanity/lib/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BestSellersPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; collection?: string }>;
}) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentCategory =
    resolvedSearchParams?.category || resolvedSearchParams?.collection;
  const [products, categories] = await Promise.all([
    getBestSellerProducts(currentCategory),
    getStorefrontCategories(),
  ]);

  return (
    <main>
      <ShopWithSidebar
        products={products}
        categories={categories}
        currentCategory={currentCategory}
        path="/best-sellers"
        title="Best Sellers"
      />
    </main>
  );
};

export default BestSellersPage;
