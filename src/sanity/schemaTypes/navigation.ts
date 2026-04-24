const parentOptions = [
  { title: "Top Level", value: "root" },
  { title: "Collections", value: "Collections" },
  { title: "Client Services", value: "Client Services" },
  { title: "Journal", value: "Journal" },
  { title: "House", value: "House" },
  { title: "Concierge", value: "Concierge" },
];

export const navigationSchema = {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Global Navigation",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "navItems",
      title: "Nav Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Nav Item",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "url",
              title: "URL Link",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "parent",
              title: "Parent",
              type: "string",
              initialValue: "root",
              options: {
                list: parentOptions,
              },
            },
            {
              name: "placement",
              title: "Placement",
              type: "string",
              initialValue: "header",
              options: {
                list: [
                  { title: "Header", value: "header" },
                  { title: "Footer", value: "footer" },
                  { title: "Both", value: "both" },
                ],
                layout: "radio",
              },
            },
            {
              name: "openInNewTab",
              title: "Open In New Tab",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "parent",
            },
            prepare({
              title,
              subtitle,
            }: {
              title?: string;
              subtitle?: string;
            }) {
              return {
                title,
                subtitle: subtitle === "root" ? "Top Level" : subtitle,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
