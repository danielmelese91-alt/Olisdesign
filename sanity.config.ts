import { defineConfig } from "sanity";
import { deskTool, type StructureResolver } from "sanity/desk";
import { schemaTypes } from "./src/sanity/schemaTypes";

const singletonTypes = new Set(["siteSettings", "navigation"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Global Settings")
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.listItem()
                .title("Global Website Settings")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                    .title("Global Website Settings")
                ),
              S.listItem()
                .title("Global Navigation")
                .child(
                  S.document()
                    .schemaType("navigation")
                    .documentId("navigation")
                    .title("Global Navigation")
                ),
            ])
        ),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("heroSlide").title("Hero Slides"),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !singletonTypes.has(listItem.getId() ?? "") &&
          !["product", "category", "heroSlide"].includes(listItem.getId() ?? "")
      ),
    ]);

export default defineConfig({
  name: "default",
  title: "Olies Design Studio",
  projectId: "xqh96b1a",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(
            (action) => action.action && singletonActions.has(action.action)
          )
        : prev,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
  },
});
