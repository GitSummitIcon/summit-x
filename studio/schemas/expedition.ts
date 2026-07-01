import { defineField, defineType } from "sanity";

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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
