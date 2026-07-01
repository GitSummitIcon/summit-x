import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-screen background image on the homepage. Upload a high-resolution landscape photo.",
    }),
    defineField({
      name: "featuredChalet",
      title: "Featured Chalet",
      type: "reference",
      to: [{ type: "chalet" }],
      description: "Optional — highlights one chalet as 'this week's pick' on the homepage.",
    }),
    defineField({
      name: "featuredDestination",
      title: "Featured Destination",
      type: "reference",
      to: [{ type: "destination" }],
      description: "Optional — highlights one destination on the homepage hero.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
