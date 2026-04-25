export const campaignSchema = {
  name: "campaign",
  title: "Campaign",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Main Title",
      type: "string",
      description: "e.g., Atelier Campaign",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "e.g., Hand-finished occasion wear for refined evenings.",
    },
    {
      name: "productImage",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "expiryDate",
      title: "Expiry Date",
      type: "datetime",
      description: "Set the end date for the countdown",
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "e.g., Shop The Edit",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "productImage",
    },
  },
};
