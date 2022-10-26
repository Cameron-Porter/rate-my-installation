export default {
  name: "unit",
  title: "Unit",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Name of Installation/Base",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "image",
      title: "Cloudinary Image URL",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "branch",
      title: "Branch",
      type: "reference",
      to: { type: "branch" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],

  preview: {
    select: {
      title: "title",
      branch: "branch.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { branch } = selection;
      return Object.assign({}, selection, {
        subtitle: branch && `by ${branch}`,
      });
    },
  },
};
