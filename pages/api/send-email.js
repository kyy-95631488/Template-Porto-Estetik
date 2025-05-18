import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #e9f7ff; margin: 0; padding: 0; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
            h1 { color: #007bff; font-size: 28px; text-align: center; margin-bottom: 20px; }
            p { font-size: 16px; line-height: 1.6; }
            .message-box { background: #f1faff; border-left: 4px solid #007bff; padding: 10px 20px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; font-size: 14px; color: #777; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${subject}</h1>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out! Here's a copy of your message:</p>
            <div class="message-box">
              <p>${message}</p>
            </div>
            <p>We will get back to you at <strong>${email}</strong> as soon as possible.</p>
            <div class="footer">&copy; 2025 Hendriansyah-Portofolio. All rights reserved.</div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: `hendriansyahrizkysetiawan@gmail.com, ${email}`,
      subject,
      replyTo: email,
      html,
    });

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ error: err.message });
  }
}
