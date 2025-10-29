// pages/api/contact.js

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found');
      return res.status(500).json({ error: 'Configuration email manquante' });
    }

    const hostingerEmail = process.env.HOSTINGER_EMAIL || 'contact@battlesflow.fr';
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `send@${process.env.RESEND_DOMAIN}` 
      : 'onboarding@resend.dev';

    // Email HTML body
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ffd700; font-size: 28px; margin: 0;">🎤 BATTLES FLOW</h1>
          <p style="color: #ccc; margin: 5px 0;">Nouveau message de contact</p>
        </div>
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; border-left: 4px solid #ffd700;">
          <h2 style="color: #ffd700; margin-top: 0;">Détails du contact</h2>
          
          <div style="margin: 15px 0;">
            <strong style="color: #ffd700;">Nom:</strong>
            <span style="color: #fff; margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin: 15px 0;">
            <strong style="color: #ffd700;">Email:</strong>
            <span style="color: #fff; margin-left: 10px;">${email}</span>
          </div>
          
          <div style="margin: 15px 0;">
            <strong style="color: #ffd700;">Sujet:</strong>
            <span style="color: #fff; margin-left: 10px;">${subject}</span>
          </div>
          
          <div style="margin: 15px 0;">
            <strong style="color: #ffd700;">Message:</strong>
            <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin-top: 10px; color: #fff; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #444;">
          <p style="color: #888; font-size: 14px;">
            Message envoyé depuis Battles Flow<br>
            <span style="color: #ffd700;">🎵 La référence des battles hip-hop</span>
          </p>
        </div>
      </div>
    `;

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [hostingerEmail],
        subject: `[Battles Flow] ${subject}`,
        html: emailBody,
        text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
        reply_to: email
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      throw new Error(`Erreur Resend API: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email envoyé avec succès:', result.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès !',
      messageId: result.id 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' 
    });
  }
}
