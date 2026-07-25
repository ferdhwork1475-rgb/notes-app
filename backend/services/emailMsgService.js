import nodemailer from "nodemailer";

const contactEmailTemplate = ({ email, name, subject, message }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Message</title>
  </head>

  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;background:#f1f5f9;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0"
            style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">

            <!-- Header -->

            <tr>
              <td align="center" style="background:#dc2626;padding:30px;">

                <h1 style="margin:0;color:#fff;font-size:26px;">
                  WatchMann News
                </h1>

                <p style="margin-top:8px;color:#fecaca;font-size:14px;">
                  New Contact Form Submission
                </p>

              </td>
            </tr>

            <!-- Body -->

            <tr>
              <td style="padding:35px;">

                <h2 style="margin-top:0;color:#0f172a;">
                  You've received a new message
                </h2>

                <p style="color:#475569;font-size:15px;line-height:24px;">
                  Someone submitted a message through the WatchMann News
                  contact form.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0"
                  style="margin-top:25px;border-collapse:collapse;">

                  <tr>
                    <td style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;">
                      <strong>Name</strong><br>
                      ${name}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:14px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
                      <strong>Email Address</strong><br>
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;">
                      <strong>Subject</strong><br>
                      ${subject}
                    </td>
                  </tr>

                </table>

                <div style="margin-top:30px;">
                  <h3 style="margin-bottom:10px;color:#0f172a;">
                    Message
                  </h3>

                  <div style="background:#f8fafc;
                              border:1px solid #e2e8f0;
                              border-radius:8px;
                              padding:20px;
                              line-height:28px;
                              white-space:pre-wrap;
                              color:#334155;">

                    ${message}

                  </div>
                </div>

              </td>
            </tr>

            <!-- Footer -->

            <tr>
              <td align="center"
                  style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:25px;">

                <p style="margin:0;color:#64748b;font-size:13px;">
                  This email was generated automatically from the
                  <strong>WatchMann News Contact Form</strong>.
                </p>

                <p style="margin-top:8px;font-size:12px;color:#94a3b8;">
                  © ${new Date().getFullYear()} WatchMann News. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmail = async (email, name, subject, message) => {
  try {
    const mailOptions = {
      from: `"WatchMann News Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `📩 New Contact Form: ${subject}`,
      text: ` New Contact Form Submission
            Name: ${name}
            Email: ${email}
            Subject: ${subject}

    Message: ${message} `,
        html: contactEmailTemplate({
            email,
            name,
            subject,
            message,
        }),
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send contact email.");
  }
};
