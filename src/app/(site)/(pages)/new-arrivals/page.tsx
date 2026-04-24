import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import {
  getNewArrivalProducts,
  getStorefrontCategories,
} from "@/sanity/lib/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NewArrivalsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; collection?: string }>;
}) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentCategory =
    resolvedSearchParams?.category || resolvedSearchParams?.collection;
  const [products, categories] = await Promise.all([
    getNewArrivalProducts(currentCategory),
    getStorefrontCategories(),
  ]);

  return (
    <main>
      <ShopWithSidebar
        products={products}
        categories={categories}
        currentCategory={currentCategory}
        path="/new-arrivals"
        title="New Arrivals"
      />
    </main>
  );
};

export default NewArrivalsPage;
