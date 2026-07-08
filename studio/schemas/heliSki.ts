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
    // ── Guide sections ────────────────────────────────────────────────────────
    defineField({
      name: "accessAndLogistics",
      title: "Access & Logistics",
      type: "text",
      rows: 4,
      description: "How to get there, transfer options, access conditions.",
    }),
    defineField({
      name: "seasonWindow",
      title: "Season Window & What to Expect",
      type: "text",
      rows: 4,
      description: "Best months, weather, snow conditions, what the experience feels like.",
    }),
    defineField({
      name: "terrain",
      title: "Terrain",
      type: "text",
      rows: 4,
      description: "Character of the landscape and heli-ski terrain.",
    }),
    defineField({
      name: "physicalRequirements",
      title: "Physical Requirements",
      type: "object",
      description: "Honest assessment of fitness and ski ability required.",
      fields: [
        defineField({
          name: "level",
          title: "Level",
          type: "string",
          options: {
            list: [
              { title: "None — suitable for all abilities", value: "None" },
              { title: "Moderate — reasonable fitness required", value: "Moderate" },
              { title: "Demanding — strong fitness and experience required", value: "Demanding" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "descriptor",
          title: "Descriptor",
          type: "text",
          rows: 2,
          description: "One or two sentence honest description of what is required.",
        }),
      ],
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
