import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import {
  getStorefrontCategories,
  getStorefrontProducts,
} from "@/sanity/lib/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ShopWithoutSidebarPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentCategory = resolvedSearchParams?.category;
  const [products, categories] = await Promise.all([
    getStorefrontProducts(currentCategory),
    getStorefrontCategories(),
  ]);

  return (
    <main>
      <ShopWithoutSidebar
        products={products}
        categories={categories}
        currentCategory={currentCategory}
        path="/shop-without-sidebar"
      />
    </main>
  );
};

export default ShopWithoutSidebarPage;
