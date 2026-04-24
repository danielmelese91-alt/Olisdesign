export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Global Website Settings",
  type: "document",
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "branding", title: "Branding" },
    { name: "announcement", title: "Announcement Bar" },
  ],
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "seo",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    },
    {
      name: "brandName",
      title: "Brand Name",
      type: "string",
      group: "branding",
      initialValue: "Olies Design",
    },
    {
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: { hotspot: true },
      group: "branding",
      description: "Upload a transparent PNG or SVG-style mark for the header and footer.",
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: { hotspot: true },
      group: "branding",
    },
    {
      name: "primaryBrandColor",
      title: "Primary Brand Color",
      type: "string",
      group: "branding",
      description: "Hex value, for example #121212",
      initialValue: "#121212",
    },
    {
      name: "secondaryBrandColor",
      title: "Secondary Brand Color",
      type: "string",
      group: "branding",
      description: "Hex value, for example #C5A55A",
      initialValue: "#C5A55A",
    },
    {
      name: "accentBrandColor",
      title: "Accent Brand Color",
      type: "string",
      group: "branding",
      description: "Hex value, for example #F5F5F1",
      initialValue: "#F5F5F1",
    },
    {
      name: "announcementEnabled",
      title: "Show Announcement Bar",
      type: "boolean",
      group: "announcement",
      initialValue: false,
    },
    {
      name: "announcementText",
      title: "Announcement Text",
      type: "string",
      group: "announcement",
      hidden: ({ document }: { document?: { announcementEnabled?: boolean } }) =>
        !document?.announcementEnabled,
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Global Website Settings",
      };
    },
  },
};
