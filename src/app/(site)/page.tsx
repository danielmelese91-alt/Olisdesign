import Home from "@/components/Home";
import {
  getBestSellers,
  getCampaign,
  getHeroSlides,
  getSignatureArrivals,
} from "@/sanity/lib/storefront";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [heroSlides, bestSellers, signatureArrivals, campaign] = await Promise.all([
    getHeroSlides(),
    getBestSellers(),
    getSignatureArrivals(),
    getCampaign(),
  ]);

  return (
    <>
      <Home
        heroSlides={heroSlides}
        bestSellers={bestSellers}
        signatureArrivals={signatureArrivals}
        campaign={campaign}
      />
    </>
  );
}
