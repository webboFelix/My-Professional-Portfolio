import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send contact form email with styled HTML
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} message - Message content
 */
export const sendContactEmail = async (name, email, message) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%);
            padding: 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
            border-left: 4px solid #00ff88;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.1), 0 0 40px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            border-radius: 8px;
          }
          
          .header {
            background: linear-gradient(90deg, #0f3460 0%, #16213e 100%);
            padding: 30px 20px;
            border-bottom: 2px solid #00ff88;
            text-align: center;
          }
          
          .header h1 {
            color: #00ff88;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
            letter-spacing: 2px;
            margin: 0;
          }
          
          .header p {
            color: #a8dadc;
            font-size: 12px;
            margin-top: 8px;
            letter-spacing: 1px;
          }
          
          .content {
            padding: 30px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .section-label {
            color: #00ff88;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
            display: block;
          }
          
          .section-content {
            color: #e0e0e0;
            font-size: 14px;
            line-height: 1.6;
            padding: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-left: 3px solid #00ff88;
            border-radius: 4px;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          .section-content.message {
            min-height: 100px;
            white-space: pre-wrap;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #00ff88, transparent);
            margin: 25px 0;
            opacity: 0.3;
          }
          
          .footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-top: 1px solid #00ff88;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
          
          .footer p {
            margin: 5px 0;
          }
          
          .timestamp {
            color: #666;
            font-size: 11px;
          }
          
          @media (max-width: 600px) {
            .container {
              border-radius: 0;
            }
            
            .header h1 {
              font-size: 24px;
            }
            
            .content {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📨 NEW MESSAGE</h1>
            <p>From Your Portfolio Contact Form</p>
          </div>
          
          <div class="content">
            <div class="section">
              <span class="section-label">▸ Sender Name</span>
              <div class="section-content">${name}</div>
            </div>
            
            <div class="section">
              <span class="section-label">▸ Reply To</span>
              <div class="section-content">
                <a href="mailto:${email}" style="color: #00ff88; text-decoration: none;">${email}</a>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="section">
              <span class="section-label">▸ Message</span>
              <div class="section-content message">${message}</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="footer">
              <p>📅 <span class="timestamp">${new Date().toLocaleString()}</span></p>
              <p>This email was sent from your portfolio website</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `💬 New Message from ${name} - Portfolio Contact Form`,
      html: htmlContent,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};
