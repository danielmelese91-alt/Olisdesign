export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  slug?: string;
  description?: string;
  category?: string;
  categorySlug?: string;
  size?: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  material?: string;
  colorSwatches?: string[];
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isSignatureArrival?: boolean;
  badge?: string;
};
