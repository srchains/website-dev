// Local development server for email API using Resend
// Run with: npm run server
//
// NOTE: This file uses CommonJS (require) to ensure dotenv loads
// before any other module reads process.env.

const path = require('path');
const dotenv = require('dotenv');

// Load .env first, then .env.local overrides
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env.local'), override: true });

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('❌ RESEND_API_KEY is not set in .env.local');
    return res.status(500).json({ error: 'Server misconfiguration: RESEND_API_KEY not set' });
  }

  const { name, email, phone, service, budget, message } = req.body || {};

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
      <h2 style="color: #0A0F2C; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
        &#128233; New Contact from ${name || 'Anonymous'}
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
        Sent from BuildStack Solutions contact form
      </p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'BuildStack Solutions <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || 'buildstacksolution@gmail.com'],
      subject: `New Contact: ${name || 'Website Inquiry'}`,
      html,
      reply_to: email || undefined,
    });

    if (error) {
      console.error('❌ Resend API error:', JSON.stringify(error));
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    console.log('✅ Email sent! ID:', data?.id);
    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Email API server running at http://localhost:${PORT}`);
  console.log(`📧 Resend API key: ${process.env.RESEND_API_KEY ? '✅ loaded' : '❌ MISSING - check .env.local'}`);
  console.log(`📬 Sending to: ${process.env.EMAIL_TO || 'buildstacksolution@gmail.com (default)'}`);
  console.log(`📤 From: ${process.env.EMAIL_FROM || 'BuildStack Solutions <onboarding@resend.dev> (default)'}\n`);
});
