import nodemailer from "nodemailer";

const generateOTPEmailTemplate = (otpCode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; color: #1e293b; -webkit-font-smoothing: antialiased;">

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 40px 10px;">
        <tr>
          <td align="center">

            <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden; border: 1px solid #e2e8f0;">

              <tr>
                <td align="center" style="background-color: #4f46e5; padding: 32px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">WatchMann News</h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 32px;">
                  <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 20px; font-weight: 600;">Verification Code</h2>
                  <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">
                    You are receiving this email because a request was made to authenticate or reset the password for your Admin account. Use the verification code below to proceed:
                  </p>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                    <tr>
                      <td align="center" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 24px 10px;">
                        <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 700; letter-spacing: 6px; color: #4f46e5;">${otpCode}</span>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 20px; color: #64748b;">
                    💡 <strong>Important Note:</strong> This verification code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
                  </p>
                  <p style="margin: 0; font-size: 13px; line-height: 20px; color: #64748b;">
                    If you did not initiate this request, you can safely ignore this email. Your security settings remain intact.
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px;">
                  <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} WatchMann News.</p>
                  <p style="margin: 0; font-size: 11px; color: #cbd5e1;">Automated transactional email. Please do not reply.</p>
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

export const sendOTPVerificationEmail = async (email, otpCode) => {
  try {
    const mailOptions = {
      from: `"WatchMann News" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🔑 Admin Portal Verification Code',
      text: `Your validation OTP code is: ${otpCode}. Valid for 10 minutes.`, // Fallback for pure text mail clients
      html: generateOTPEmailTemplate(otpCode), // Passing your HTML block directly here
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully dispatched: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer service pipeline failure:', error);
    throw new Error('Email delivery system encountered a terminal fault.');
  }
};