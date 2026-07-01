import { defineField, defineType } from "sanity";

export const theEdit = defineType({
  name: "theEdit",
  title: "The Edit",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Feature", value: "feature" },
          { title: "Guide", value: "guide" },
          { title: "Interview", value: "interview" },
          { title: "News", value: "news" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "relatedDestination",
      title: "Related Destination",
      type: "reference",
      to: [{ type: "destination" }],
      description: "When set, this article surfaces on that destination's page.",
    }),
  ],
});
