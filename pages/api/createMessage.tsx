// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, subject, message } = JSON.parse(req.body);
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
    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_TO_EMAIL,
      subject: `RMI: ${subject}`,
      html: `<p>You have a new message from <strong>${email}</strong></p><br>
        <p><strong>Message: </strong> ${message}</p><br>`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Couldn't submit contact form`, err });
  }
  res.status(200).json({ name: `Form Submitted` });
}
