import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopDetails from "@/components/ShopDetails";
import { getStorefrontProductBySlug } from "@/sanity/lib/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Olies Design",
    };
  }

  return {
    title: `${product.title} | Olies Design`,
    description:
      product.description ||
      `${product.title} from the Olies Design collection.`,
    openGraph: {
      title: `${product.title} | Olies Design`,
      description:
        product.description ||
        `${product.title} from the Olies Design collection.`,
      images: product.imgs?.previews?.[0] ? [product.imgs.previews[0]] : [],
    },
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await getStorefrontProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ShopDetails product={product} />
    </main>
  );
};

export default ProductPage;
