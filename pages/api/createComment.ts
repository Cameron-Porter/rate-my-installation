// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    _id,
    email,
    baseAmenities,
    baseLogistics,
    housingOptions,
    localCommunity,
    localRecreation,
    schoolDistrict,
    comment,
  } = JSON.parse(req.body, function (key, value) {
    for (key of req.body) {
      if (
        key in
        [
          "baseAmenities",
          "baseLogistics",
          "housingOptions",
          "localCommunity",
          "localRecreation",
          "schoolDistrict",
        ]
      ) {
        value = Number(value);
      }
    }
  });

  try {
    await client.create({
      _type: "comment",
      unit: {
        _type: "reference",
        _ref: _id,
      },
      email,
      baseAmenities,
      baseLogistics,
      housingOptions,
      localCommunity,
      localRecreation,
      schoolDistrict,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
  res.status(200).json({ name: `Comment Submitted` });
}
