export const heroSlideSchema = {
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  actions: ["create", "update", "delete", "publish"],
  fields: [
    {
      name: "title",
      title: "Headline",
      type: "string",
      description: "Main heading displayed on the slide",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small label above the headline (e.g. 'Bridal Collection')",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Short paragraph below the headline",
    },
    {
      name: "image",
      title: "Slide Image",
      type: "image",
      options: { hotspot: true },
      description: "High-resolution fashion image. Use the hotspot to set the focal point.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "ctaText",
      title: "Button Text",
      type: "string",
      description: "e.g. 'Explore Bridal'",
    },
    {
      name: "ctaLink",
      title: "Button Link",
      type: "string",
      description: "e.g. /shop?collection=bridal",
    },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      description: "Which side the image appears on desktop (left or right)",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
    },
  },
};
