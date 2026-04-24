const collections = [
  { title: "Knitwear", value: "knitwear" },
  { title: "Accessories", value: "accessories" },
  { title: "Tailored", value: "tailored" },
  { title: "Evening", value: "evening" },
  { title: "Traditional", value: "traditional" },
  { title: "Bridal", value: "bridal" },
  { title: "Seasonal", value: "seasonal" },
];

export const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  actions: ["create", "update", "delete", "publish"],
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "variants", title: "Variants & Sizing" },
    { name: "media", title: "Media" },
    { name: "details", title: "Details" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      group: "basic",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "collection",
      title: "Collection",
      type: "string",
      group: "basic",
      description: "Assign this product to a collection (e.g. Knitwear, Accessories)",
      options: {
        list: collections,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      group: "basic",
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "discountedPrice",
      title: "Discounted Price",
      type: "number",
      group: "basic",
      validation: (Rule: any) => Rule.min(0),
    },

    // ── Variants & Sizing ──────────────────────────
    {
      name: "size",
      title: "Available Sizes",
      type: "array",
      group: "variants",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "xs" },
          { title: "S", value: "s" },
          { title: "M", value: "m" },
          { title: "L", value: "l" },
          { title: "XL", value: "xl" },
          { title: "XXL", value: "xxl" },
        ],
      },
    },
    {
      name: "colorVariants",
      title: "Color Variants",
      type: "array",
      group: "variants",
      description: "Add each available color with a label and hex code",
      of: [
        {
          type: "object",
          name: "colorVariant",
          title: "Color Variant",
          fields: [
            {
              name: "label",
              title: "Color Name",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "hex",
              title: "Hex Code",
              type: "string",
              description: "e.g. #1A2640",
              validation: (Rule: any) =>
                Rule.required().regex(/^#([0-9A-Fa-f]{6})$/, {
                  name: "hex color",
                  invert: false,
                }),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "hex" },
          },
        },
      ],
    },
    {
      name: "material",
      title: "Material / Fabric",
      type: "string",
      group: "variants",
      description: "e.g. 100% Ethiopian Cotton, Merino Wool Blend",
    },

    // ── Media ──────────────────────────────────────
    {
      name: "images",
      title: "Product Images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },

    // ── Details ────────────────────────────────────
    {
      name: "description",
      title: "Description",
      type: "text",
      group: "details",
      rows: 4,
    },
    {
      name: "careInstructions",
      title: "Care Instructions",
      type: "text",
      group: "details",
      rows: 3,
      description: "e.g. Dry clean only, Hand wash cold",
    },
    {
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      group: "basic",
      description: "Show this product in the hero or featured sections",
      initialValue: false,
    },
    {
      name: "isBestSeller",
      title: "Best Seller",
      type: "boolean",
      group: "basic",
      description: "Show this product in the Best Sellers section on homepage",
      initialValue: false,
    },
    {
      name: "isSignatureArrival",
      title: "Signature Arrival",
      type: "boolean",
      group: "basic",
      description: "Show this product in the Signature Arrivals section on homepage",
      initialValue: false,
    },
    {
      name: "badge",
      title: "Badge Label",
      type: "string",
      group: "basic",
      description: "Display a badge on product cards (e.g., New, Sale, Sold Out)",
      options: {
        list: [
          { title: "None", value: "" },
          { title: "New", value: "new" },
          { title: "Sale", value: "sale" },
          { title: "Sold Out", value: "sold-out" },
          { title: "Best Seller", value: "best-seller" },
          { title: "Limited", value: "limited" },
        ],
      },
    },
  ],
};
