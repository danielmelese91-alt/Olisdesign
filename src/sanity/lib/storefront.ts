import { unstable_noStore as noStore } from "next/cache";
import { groq } from "next-sanity";
import { Product } from "@/types/product";
import { client } from "./client";
import { imageRefToUrl } from "./image";

type ProductSize = NonNullable<Product["size"]>[number];

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

type SanityCategoryReference = {
  title?: string;
  slug?: string;
};

type SanityProduct = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  category?: SanityCategoryReference;
  price?: number;
  discountedPrice?: number;
  size?: string[];
  material?: string;
  colorVariants?: { hex?: string }[];
  description?: string;
  images?: SanityImage[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isSignatureArrival?: boolean;
  badge?: string;
};

type SanityCategory = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  image?: SanityImage;
  productCount?: number;
};

type SanityHeroSlide = {
  _id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: SanityImage;
  ctaText?: string;
  ctaLink?: string;
  imagePosition?: "left" | "right";
  order?: number;
};

type SanityCampaign = {
  _id: string;
  title?: string;
  subtitle?: string;
  productImage?: SanityImage;
  expiryDate?: string;
  buttonText?: string;
};

export type Campaign = {
  id: string;
  title: string;
  subtitle: string;
  productImage: string;
  expiryDate: string;
  buttonText: string;
};

export type StorefrontCategory = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
};

export type HeroSlide = {
  id: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  imagePosition: "left" | "right";
};

const heroSlideFallback: HeroSlide[] = [
  {
    id: "fallback-bridal",
    image: "/images/hero/slide-bridal.jpg",
    subtitle: "Bridal Collection",
    title: "Where Tradition Meets Timeless Elegance",
    description:
      "Hand-embroidered ceremonial gowns crafted with generations of artisan mastery.",
    cta: "Explore Bridal",
    href: "/shop?collection=bridal",
    imagePosition: "left",
  },
  {
    id: "fallback-modern",
    image: "/images/hero/slide-modern.jpg",
    subtitle: "Modern Ethiopian",
    title: "Rooted in Culture, Designed for Today",
    description:
      "Contemporary silhouettes infused with iconic Ethiopian motifs.",
    cta: "Shop the Edit",
    href: "/shop?collection=traditional",
    imagePosition: "left",
  },
  {
    id: "fallback-evening",
    image: "/images/hero/slide-evening.jpg",
    subtitle: "Evening & Occasion",
    title: "Crafted for Moments That Matter",
    description: "Statement pieces that command attention for grand celebrations.",
    cta: "View Collection",
    href: "/shop?collection=evening",
    imagePosition: "left",
  },
];

function hashStringToNumber(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) || 1;
}

function normalizeSize(size: string) {
  const upper = size.toUpperCase();
  const allowedSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return allowedSizes.includes(upper) ? (upper as ProductSize) : null;
}

function normalizeSlug(value?: string) {
  return value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toStorefrontProduct(product: SanityProduct): Product {
  const imageUrls = (product.images ?? [])
    .map((image) => imageRefToUrl(image))
    .filter((image): image is string => Boolean(image));
  const normalizedSizes = (product.size ?? [])
    .map((size) => normalizeSize(size))
    .filter((size): size is ProductSize => Boolean(size));
  const colorSwatches =
    product.colorVariants
      ?.map((variant) => variant.hex)
      .filter((hex): hex is string => Boolean(hex)) ?? [];

  return {
    id: hashStringToNumber(product._id),
    slug: product.slug?.current,
    title: product.title || "Untitled Product",
    reviews: 0,
    price: product.price ?? 0,
    discountedPrice: product.discountedPrice ?? product.price ?? 0,
    category: product.category?.title || "Uncategorized",
    categorySlug:
      product.category?.slug ||
      normalizeSlug(product.category?.title) ||
      "uncategorized",
    size: normalizedSizes.length ? normalizedSizes : undefined,
    material: product.material,
    colorSwatches: colorSwatches.length ? colorSwatches : undefined,
    description: product.description,
    imgs: {
      previews: imageUrls.length ? imageUrls : [],
      thumbnails: imageUrls.length ? imageUrls : [],
    },
    isFeatured: product.isFeatured ?? false,
    isBestSeller: product.isBestSeller ?? false,
    isSignatureArrival: product.isSignatureArrival ?? false,
    badge: product.badge,
  };
}

function toHeroSlide(slide: SanityHeroSlide, index: number): HeroSlide {
  const fallbackSlide = heroSlideFallback[index % heroSlideFallback.length];

  return {
    id: slide._id,
    image: imageRefToUrl(slide.image) || fallbackSlide.image,
    subtitle: slide.subtitle || fallbackSlide.subtitle,
    title: slide.title || fallbackSlide.title,
    description: slide.description || fallbackSlide.description,
    cta: slide.ctaText || fallbackSlide.cta,
    href: slide.ctaLink || fallbackSlide.href,
    imagePosition: slide.imagePosition || fallbackSlide.imagePosition,
  };
}

function toStorefrontCategory(category: SanityCategory): StorefrontCategory {
  return {
    id: category._id,
    title: category.title || "Untitled Category",
    slug: category.slug || normalizeSlug(category.title) || category._id,
    description: category.description,
    image: imageRefToUrl(category.image),
    productCount: category.productCount ?? 0,
  };
}

function toCampaign(campaign: SanityCampaign): Campaign {
  return {
    id: campaign._id,
    title: campaign.title || "Don't Miss Out!",
    subtitle: campaign.subtitle || "Shop our latest collection",
    productImage: imageRefToUrl(campaign.productImage) || "",
    expiryDate: campaign.expiryDate || "",
    buttonText: campaign.buttonText || "Shop Now",
  };
}

export async function getStorefrontCategories() {
  noStore();

  const categories = await client.fetch<SanityCategory[]>(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      image,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  );

  if (!categories?.length) {
    return [];
  }

  return categories.map(toStorefrontCategory);
}

export async function getStorefrontProducts(categorySlug?: string) {
  noStore();

  const products = await client.fetch<SanityProduct[]>(
    groq`*[
      _type == "product" &&
      (!defined($categorySlug) || category->slug.current == $categorySlug)
    ] | order(_createdAt desc) {
      _id,
      title,
      slug,
      "category": category->{
        title,
        "slug": slug.current
      },
      price,
      discountedPrice,
      size,
      material,
      colorVariants,
      description,
      images
    }`,
    { categorySlug: categorySlug ?? null }
  );

  if (!products?.length) {
    return [];
  }

  return products.map((product) => toStorefrontProduct(product));
}

export async function getFeaturedProducts() {
  noStore();

  const products = await client.fetch<SanityProduct[]>(
    groq`*[_type == "product" && isFeatured == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      "category": category->{
        title,
        "slug": slug.current
      },
      price,
      discountedPrice,
      size,
      material,
      colorVariants,
      description,
      images,
      isFeatured,
      isBestSeller,
      isSignatureArrival,
      badge
    }`
  );

  if (!products?.length) {
    return [];
  }

  return products.map((product) => toStorefrontProduct(product));
}

export async function getBestSellers() {
  noStore();

  const products = await client.fetch<SanityProduct[]>(
    groq`*[_type == "product" && isBestSeller == true] | order(_createdAt desc) [0...6] {
      _id,
      title,
      slug,
      "category": category->{
        title,
        "slug": slug.current
      },
      price,
      discountedPrice,
      size,
      material,
      colorVariants,
      description,
      images,
      isFeatured,
      isBestSeller,
      isSignatureArrival,
      badge
    }`
  );

  if (!products?.length) {
    return [];
  }

  return products.map((product) => toStorefrontProduct(product));
}

export async function getSignatureArrivals() {
  noStore();

  const products = await client.fetch<SanityProduct[]>(
    groq`*[_type == "product" && isSignatureArrival == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      "category": category->{
        title,
        "slug": slug.current
      },
      price,
      discountedPrice,
      size,
      material,
      colorVariants,
      description,
      images,
      isFeatured,
      isBestSeller,
      isSignatureArrival,
      badge
    }`
  );

  if (!products?.length) {
    return [];
  }

  return products.map((product) => toStorefrontProduct(product));
}

export async function getHeroSlides() {
  noStore();

  const slides = await client.fetch<SanityHeroSlide[]>(
    groq`*[_type == "heroSlide"] | order(order asc, _createdAt asc) {
      _id,
      title,
      subtitle,
      description,
      image,
      ctaText,
      ctaLink,
      imagePosition,
      order
    }`
  );

  if (!slides?.length) {
    return heroSlideFallback;
  }

  return slides.map((slide, index) => toHeroSlide(slide, index));
}

export async function getCampaign() {
  noStore();

  const campaigns = await client.fetch<SanityCampaign[]>(
    groq`*[_type == "campaign"] | order(_createdAt desc) [0...1] {
      _id,
      title,
      subtitle,
      productImage,
      expiryDate,
      buttonText
    }`
  );

  if (!campaigns?.length) {
    return null;
  }

  return toCampaign(campaigns[0]);
}
