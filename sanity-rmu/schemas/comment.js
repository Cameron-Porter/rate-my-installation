export default {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    {
      name: "unit",
      title: "Unit",
      type: "reference",
      to: { type: "unit" },
    },
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "Comments won't show on site without approval",
    },
    {
      title: "Email",
      name: "email",
      type: "string",
    },
    {
      name: "baseAmenities",
      title: "Base Amenities",
      type: "number",
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "baseLogistics",
      type: "Base Logistics",
      type: "number",
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "housingOptions",
      type: "Housing Options",
      type: "number",
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "localCommunity",
      type: "Local Community",
      type: "number",
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "localRecreation",
      type: "Local Recreation",
      type: "number",
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "schoolDistrict",
      type: "School District",
      type: "number",
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
    },
  ],
  preview: {
    select: {
      approved: "approved",
      title: "unit.title",
      media: "unit.mainImage",
    },
    prepare(selection) {
      const { title, approved } = selection;
      return Object.assign({}, selection, {
        subtitle: title && `is approved: ${approved}`,
      });
    },
  },
  orderings: [
    {
      title: "Newest Comments",
      name: "commentsDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "To Be Approved Comments",
      name: "toApproveDesc",
      by: [{ field: "approved", direction: "desc" }],
    },
    {
      title: "By Unit A-Z",
      name: "unitsAsc",
      by: [{ field: "unit.title", direction: "asc" }],
    },
    {
      title: "By Unit Z-A",
      name: "unitsDesc",
      by: [{ field: "unit.title", direction: "desc" }],
    },
  ],
};
