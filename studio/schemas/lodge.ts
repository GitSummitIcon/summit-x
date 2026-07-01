import { defineField, defineType } from "sanity";

export const lodge = defineType({
  name: "lodge",
  title: "Lodge",
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
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
    }),
    defineField({
      name: "sleeps",
      title: "Sleeps",
      type: "number",
    }),
    defineField({
      name: "priceOnRequest",
      title: "Price on Request",
      type: "boolean",
      description: "When enabled, displays 'Price on request' instead of the price range.",
      initialValue: false,
    }),
    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "object",
      hidden: ({ document }) => !!document?.priceOnRequest,
      fields: [
        defineField({ name: "min", title: "Minimum", type: "number" }),
        defineField({ name: "max", title: "Maximum", type: "number" }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          initialValue: "GBP",
        }),
      ],
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      description: 'e.g. "Backcountry cabin", "Alpine chalet", "Tented camp"',
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Free-form tags — be consistent with spelling (e.g. always 'Hot tub', not 'Hottub').",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "On Google Maps: right-click the property location → click the coordinates that appear. Enter latitude and longitude here.",
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
