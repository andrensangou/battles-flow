// api/contact.js - Version ES Module
export default async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log('🚀 API Contact - Method:', req.method);
  console.log('🚀 API Contact - Body:', req.body);

  // Preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ Preflight OK');
    return res.status(200).end();
  }

  // Seulement POST
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed',
      received: req.method
    });
  }

  try {
    // Récupération des données
    const { name, email, subject, message } = req.body;

    console.log('📨 Données:', { name, email, subject, messageLength: message?.length });

    // Validation
    if (!name || !email || !subject || !message) {
      console.log('❌ Champs manquants');
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs sont requis',
        received: { name: !!name, email: !!email, subject: !!subject, message: !!message }
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email invalide:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Email invalide'
      });
    }

    // Variables d'environnement
    const resendApiKey = process.env.RESEND_API_KEY;
    const hostingerEmail = process.env.HOSTINGER_EMAIL || 'contact@battlesflow.fr';
    const resendDomain = process.env.RESEND_DOMAIN || 'battlesflow.fr';

    console.log('🔑 Config:', {
      hasApiKey: !!resendApiKey,
      apiKeyLength: resendApiKey?.length || 0,
      to: hostingerEmail,
      domain: resendDomain
    });

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY manquante');
      return res.status(500).json({ 
        success: false,
        error: 'Configuration email manquante',
        details: 'RESEND_API_KEY non configurée'
      });
    }

    // Construction de l'email
    const emailHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message - Battles Flow</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #0a0a0a;">
  <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: #2a2a2a; border-radius: 8px;">
      <h1 style="color: #ffd700; font-size: 28px; margin: 0;">🎤 BATTLES FLOW</h1>
      <p style="color: #ccc; margin: 10px 0 0 0;">Nouveau message de contact</p>
    </div>
    
    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; border-left: 4px solid #ffd700;">
      <h2 style="color: #ffd700; margin-top: 0;">📧 Détails du contact</h2>
      
      <div style="margin: 15px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
        <strong style="color: #ffd700;">👤 Nom:</strong>
        <div style="color: #fff; margin-top: 5px;">${name}</div>
      </div>
      
      <div style="margin: 15px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
        <strong style="color: #ffd700;">📮 Email:</strong>
        <div style="color: #fff; margin-top: 5px;">
          <a href="mailto:${email}" style="color: #4da6ff; text-decoration: none;">${email}</a>
        </div>
      </div>
      
      <div style="margin: 15px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
        <strong style="color: #ffd700;">📋 Sujet:</strong>
        <div style="color: #fff; margin-top: 5px;">${subject}</div>
      </div>
      
      <div style="margin: 15px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
        <strong style="color: #ffd700;">💬 Message:</strong>
        <div style="color: #fff; margin-top: 10px; white-space: pre-wrap; line-height: 1.6;">${message}</div>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
      <p style="color: #888; font-size: 14px; margin: 5px 0;">
        Message envoyé depuis <strong style="color: #ffd700;">Battles Flow</strong>
      </p>
      <p style="color: #ffd700; font-size: 14px; margin: 5px 0;">
        🎵 La référence des battles hip-hop
      </p>
    </div>
  </div>
</body>
</html>`;

    const emailText = `
BATTLES FLOW - NOUVEAU MESSAGE
═══════════════════════════════════

👤 Nom: ${name}
📮 Email: ${email}
📋 Sujet: ${subject}

💬 MESSAGE:
${message}

═══════════════════════════════════
Pour répondre: ${email}
`;

    console.log('📤 Envoi via Resend...');

    // Envoi via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Battles Flow <contact@battlesflow.fr>`,
        to: [hostingerEmail],
        subject: `[Battles Flow] ${subject}`,
        html: emailHTML,
        text: emailText,
        reply_to: email
      })
    });

    console.log('📨 Resend Status:', resendResponse.status);

    const responseData = await resendResponse.json().catch(e => {
      console.error('❌ Erreur parsing JSON:', e);
      return null;
    });

    console.log('📨 Resend Data:', responseData);

    if (!resendResponse.ok) {
      console.error('❌ Erreur Resend:', responseData);
      return res.status(500).json({ 
        success: false,
        error: 'Erreur lors de l\'envoi de l\'email',
        details: responseData?.message || `Status ${resendResponse.status}`,
        resendStatus: resendResponse.status
      });
    }

    console.log('✅ Email envoyé! ID:', responseData?.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès !',
      messageId: responseData?.id
    });

  } catch (error) {
    console.error('💥 Erreur globale:', error);
    console.error('Stack:', error.stack);
    
    return res.status(500).json({ 
      success: false,
      error: 'Erreur serveur',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
