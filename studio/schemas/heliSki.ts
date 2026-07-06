import { defineField, defineType } from "sanity";
import { GalleryInput } from "../components/GalleryInput";

export const heliSki = defineType({
  name: "heliSki",
  title: "Heli-Ski",
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
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
    }),
    defineField({
      name: "terrainType",
      title: "Terrain Type",
      type: "string",
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "string",
    }),
    defineField({
      name: "groupSize",
      title: "Group Size",
      type: "string",
      description: 'e.g. "2–6 guests"',
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      components: { input: GalleryInput },
      description: "Use 'Add multiple images from library' to select many at once. Drag to reorder.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
