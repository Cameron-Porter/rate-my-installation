import { create } from "domain";
import { createCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: "07k2mc8t",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

// Fetch data in getProps page functions
export const sanityClient = createClient(config);

// Helps to provide image URLs with only asset ref in doc
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Helps with using current logged in user account
// export const useCurrentUser = createCurrentUserHook(config)
