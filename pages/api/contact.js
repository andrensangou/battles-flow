// pages/api/contact.js - VERSION DEBUG SIMPLIFIÉE
export default async function handler(req, res) {
  // IMPORTANT : Définir les headers AVANT tout
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  console.log('=== API CONTACT - START ===');
  console.log('Method:', req.method);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request');
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    console.log('Wrong method:', req.method);
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    console.log('Body:', req.body);

    // Récupérer les données
    const { name, email, subject, message } = req.body || {};
    
    console.log('Parsed data:', { name, email, subject, messageLength: message?.length });

    // Validation simple
    if (!name || !email || !subject || !message) {
      console.log('Missing fields');
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs sont requis',
        details: 'Veuillez remplir tous les champs'
      });
    }

    // Vérifier les variables d'environnement
    const resendApiKey = process.env.RESEND_API_KEY;
    const hostingerEmail = process.env.HOSTINGER_EMAIL || 'contact@battlesflow.fr';
    const resendDomain = process.env.RESEND_DOMAIN || 'battlesflow.fr';
    
    console.log('Env check:', {
      hasApiKey: !!resendApiKey,
      apiKeyLength: resendApiKey?.length,
      hostingerEmail,
      resendDomain
    });

    if (!resendApiKey) {
      console.error('NO API KEY!');
      return res.status(500).json({ 
        success: false,
        error: 'Configuration manquante',
        details: 'RESEND_API_KEY non configurée'
      });
    }

    // Construction email simple
    const fromEmail = `Battles Flow <contact@${resendDomain}>`;
    
    console.log('Sending email...');
    console.log('From:', fromEmail);
    console.log('To:', hostingerEmail);

    // Envoi via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: hostingerEmail,
        subject: `[Battles Flow] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #1a1a1a; color: #fff;">
            <h1 style="color: #ffd700;">🎤 Nouveau message - Battles Flow</h1>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
        reply_to: email
      })
    });

    console.log('Resend status:', resendResponse.status);

    const responseText = await resendResponse.text();
    console.log('Resend response:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('JSON parse error:', e);
      responseData = { raw: responseText };
    }

    if (!resendResponse.ok) {
      console.error('Resend error:', responseData);
      return res.status(500).json({ 
        success: false,
        error: 'Erreur Resend',
        details: responseData.message || responseData.error || 'Erreur inconnue',
        statusCode: resendResponse.status
      });
    }

    console.log('SUCCESS! Email sent:', responseData.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès !',
      messageId: responseData.id
    });

  } catch (error) {
    console.error('=== ERROR ===');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    // IMPORTANT : Toujours retourner du JSON
    return res.status(500).json({ 
      success: false,
      error: 'Erreur serveur',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
