export const campaignSchema = {
  name: "campaign",
  title: "Campaign",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Main Title",
      type: "string",
      description: "e.g., Enhance Your Music Experience",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "e.g., The Havit H206d is a wired PC headphone.",
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
      description: "e.g., Check it Out!",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "productImage",
    },
  },
};