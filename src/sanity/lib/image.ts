type SanityImageSource = {
  asset?: {
    _ref?: string;
  };
};

export function imageRefToUrl(image?: SanityImageSource | null) {
  const ref = image?.asset?._ref;

  if (!ref) {
    return null;
  }

  const [, assetId, dimensions, format] = ref.split("-");

  if (!assetId || !dimensions || !format) {
    return null;
  }

  return `https://cdn.sanity.io/images/xqh96b1a/production/${assetId}-${dimensions}.${format}`;
}
