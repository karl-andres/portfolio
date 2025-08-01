import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "andreskarl129@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // Use Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: "andreskarl129@gmail.com",
      to: "andreskarl129@gmail.com",
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\n\nMessage:\n${message}`,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}