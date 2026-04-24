import { productSchema } from "./product";
import { categorySchema } from "./category";
import { heroSlideSchema } from "./heroSlide";
import { siteSettingsSchema } from "./siteSettings";
import { navigationSchema } from "./navigation";
import { bannerSchema } from "./banners";
import { campaignSchema } from "./campaign";

export const schemaTypes = [
  siteSettingsSchema,
  navigationSchema,
  productSchema,
  categorySchema,
  heroSlideSchema,
  bannerSchema,
  campaignSchema,
];
