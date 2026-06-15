// Vercel Serverless Function — sends email via Resend SDK
// Set RESEND_API_KEY, EMAIL_TO, EMAIL_FROM in Vercel Environment Variables

import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration: RESEND_API_KEY not set' });
  }

  const { name, email, phone, service, budget, message } = req.body || {};

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
      <h2 style="color: #0A0F2C; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
        📩 New Contact from ${name || 'Anonymous'}
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #374151; width: 140px;">Name:</td>
          <td style="padding: 10px; color: #1f2937;">${name || 'N/A'}</td>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 10px; font-weight: bold; color: #374151;">Email:</td>
          <td style="padding: 10px; color: #1f2937;">
            <a href="mailto:${email}" style="color: #3b82f6;">${email || 'N/A'}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #374151;">Phone:</td>
          <td style="padding: 10px; color: #1f2937;">${phone || 'N/A'}</td>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 10px; font-weight: bold; color: #374151;">Service:</td>
          <td style="padding: 10px; color: #1f2937;">${service || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #374151;">Budget:</td>
          <td style="padding: 10px; color: #1f2937;">${budget || 'Not specified'}</td>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 10px; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
          <td style="padding: 10px; color: #1f2937; white-space: pre-wrap;">${(message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
        Sent from BuildStack Solution contact form
      </p>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'BuildStack Solution <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || 'buildstacksolution@gmail.com'],
      subject: `New Contact: ${name || 'Website Inquiry'}`,
      html,
      reply_to: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('send-email error', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
