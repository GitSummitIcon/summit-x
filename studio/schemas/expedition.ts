import { defineField, defineType } from "sanity";
import { GalleryInput } from "../components/GalleryInput";

export const expedition = defineType({
  name: "expedition",
  title: "Expedition",
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
      name: "lodgeType",
      title: "Lodge Type",
      type: "string",
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "7 nights", "10–14 days"',
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Page title for search engines. Max 60 characters.",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "string",
      description: "Max 155 characters. Used by search engines and social sharing.",
      validation: (r) => r.max(155),
    }),

    // ── Short copy ────────────────────────────────────────────────────────────
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short hero tagline — 6–10 words, no full stop.",
    }),
    defineField({
      name: "editorialIntro",
      title: "Editorial Intro",
      type: "text",
      rows: 8,
      description: "150–200 words written to create desire for this expedition.",
    }),

    // ── Expedition guide ──────────────────────────────────────────────────────
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
      description: "Character of the landscape and skiing/adventure terrain.",
    }),
    defineField({
      name: "physicalRequirements",
      title: "Physical Requirements",
      type: "object",
      description: "Honest assessment of fitness level required.",
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

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      description: "Up to 6 questions targeting experiential and logistical queries.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      validation: (r) => r.max(6),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "On Google Maps: right-click the base camp or meeting point → click the coordinates that appear. Enter latitude and longitude here.",
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
