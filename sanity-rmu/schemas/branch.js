export default {
  name: "branch",
  title: "Branch",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "logoImg",
      title: "Cloudinary Logo URL",
      type: "string",
    },
    {
      name: "image",
      title: "Cloudinary Image URL",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
};
