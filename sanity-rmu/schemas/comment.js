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
      title: "comment",
      unit: "unit.name",
    },
    prepare(selection) {
      const { unit } = selection;
      return Object.assign({}, selection, {
        subtitle: unit && `by ${unit}`,
      });
    },
  },
};
