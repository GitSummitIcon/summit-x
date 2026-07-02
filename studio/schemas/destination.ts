import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      description: 'e.g. "Antarctica", "British Columbia", "The Alps"',
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      description: "Select multiple images at once by holding Cmd (Mac) or Ctrl (Windows) in the file picker.",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      description: "Short intro copy shown in listings and hub pages.",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
