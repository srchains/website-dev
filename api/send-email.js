// Vercel Serverless Function to send email via Resend
// Set RESEND_API_KEY in Vercel Environment Variables

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration: RESEND_API_KEY not set' });
  }

  try {
    const { name, email, phone, service, budget, message, to } = req.body || {};

    const html = `
      <h3>New contact from ${name || 'Anonymous'}</h3>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Service:</strong> ${service || 'N/A'}</p>
      <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
      <p><strong>Message:</strong><br/>${(message || '').replace(/\n/g, '<br/>')}</p>
    `;

    const payload = {
      from: process.env.EMAIL_FROM || 'BuildStack Solutions <hello@buildstack.dev>',
      to: to || process.env.EMAIL_TO || 'buildstacksolution@gmail.com',
      subject: `New contact: ${name || 'Website inquiry'}`,
      html,
    };

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const respText = await resp.text();

    if (!resp.ok) {
      console.error('Resend error status', resp.status, respText);
      return res.status(500).json({ error: 'Failed to send email', details: respText });
    }

    return res.status(200).json({ ok: true, result: respText });
  } catch (err) {
    console.error('send-email error', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
