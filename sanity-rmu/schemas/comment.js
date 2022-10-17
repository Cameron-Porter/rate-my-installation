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
      type: "string",
      validation: (Rule) => Rule.max(1),
    },
    {
      name: "baseLogistics",
      type: "Base Logistics",
      type: "string",
      validation: (Rule) => Rule.max(1),
    },
    {
      name: "housingOptions",
      type: "Housing Options",
      type: "string",
      validation: (Rule) => Rule.max(1),
    },
    {
      name: "localCommunity",
      type: "Local Community",
      type: "string",
      validation: (Rule) => Rule.max(1),
    },
    {
      name: "localRecreation",
      type: "Local Recreation",
      type: "string",
      validation: (Rule) => Rule.max(1),
    },
    {
      name: "schoolDistrict",
      type: "School District",
      type: "string",
      validation: (Rule) => Rule.max(1),
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
