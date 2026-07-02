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
    defineField({
      name: "pressLogos",
      title: "Press Logos",
      type: "array",
      description: "5–8 press logos shown in the 'As Seen In' bar on the homepage. Upload light (reversed) variants for use on the dark background.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "publication", title: "Publication", type: "string", validation: (r) => r.required() }),
            defineField({ name: "logoLight", title: "Logo — Light (for dark backgrounds)", type: "image", options: { hotspot: false } }),
            defineField({ name: "logoDark", title: "Logo — Dark (for light backgrounds)", type: "image", options: { hotspot: false } }),
            defineField({ name: "articleUrl", title: "Article URL (optional)", type: "url" }),
          ],
          preview: { select: { title: "publication" } },
        },
      ],
      validation: (r) => r.max(8),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
