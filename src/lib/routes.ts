import { Product } from "@/types/product";

export function getProductPath(product: Pick<Product, "slug">) {
  return product.slug ? `/products/${encodeURIComponent(product.slug)}` : "/shop-details";
}
