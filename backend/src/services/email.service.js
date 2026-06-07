/**
 * Sends contact notifications via Resend (https://resend.com) when configured.
 * Falls back to logging only if RESEND_API_KEY is not set.
 */
export async function sendContactEmail({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !to) {
    console.log('[contact] stored locally (set RESEND_API_KEY + CONTACT_TO_EMAIL to email)');
    return { sent: false, reason: 'email_not_configured' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Portfolio] Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error: ${res.status} ${body}`);
  }

  return { sent: true };
}
