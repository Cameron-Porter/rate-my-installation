// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
import nodemailer from "nodemailer";

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
  } = JSON.parse(req.body);
  const approved = false;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_FROM_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await client.create({
      _type: "comment",
      unit: {
        _type: "reference",
        _ref: _id,
      },
      approved,
      email,
      baseAmenities,
      baseLogistics,
      housingOptions,
      localCommunity,
      localRecreation,
      schoolDistrict,
      comment,
    });
    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_TO_EMAIL,
      subject: `New Review on RMI`,
      html: `<p>You have a new review from <strong>${email}</strong></p><br>
      <p><strong>Unit _ref: </strong> ${_id}</p><br>
        <p><strong>Base Amenities: </strong> ${baseAmenities}</p><br>
        <p><strong>Base Logistics: </strong> ${baseLogistics}</p><br>
        <p><strong>Housing Options: </strong> ${housingOptions}</p><br>
        <p><strong>Local Community: </strong> ${localCommunity}</p><br>
        <p><strong>Local Recreation: </strong> ${localRecreation}</p><br>
        <p><strong>School District: </strong> ${schoolDistrict}</p><br>
        <p><strong>Comment: </strong> ${comment}</p><br>`,
    });
  } catch (err) {
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
  res.status(200).json({ name: `Comment Submitted` });
}
