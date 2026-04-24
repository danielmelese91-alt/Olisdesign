import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import {
  getStorefrontCategories,
  getStorefrontProducts,
} from "@/sanity/lib/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ShopWithSidebarPage = async ({
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
      <ShopWithSidebar
        products={products}
        categories={categories}
        currentCategory={currentCategory}
        path="/shop-with-sidebar"
      />
    </main>
  );
};

export default ShopWithSidebarPage;
