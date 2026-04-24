import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xqh96b1a",
  dataset: "production",
  apiVersion: "2026-04-21",
  useCdn: false,
});
