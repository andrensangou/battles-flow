// pages/api/contact.js - VERSION DEBUG
export default async function handler(req, res) {
  console.log('=== 🚀 API CONTACT APPELLÉE ===');
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ Preflight CORS OK');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('❌ Mauvaise méthode:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    console.log('📨 Données reçues:', { name, email, subject, message });

    // Validation
    if (!name || !email || !subject || !message) {
      console.log('❌ Champs manquants');
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email invalide:', email);
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Vérification des variables d'environnement
    const resendApiKey = process.env.RESEND_API_KEY;
    console.log('🔑 RESEND_API_KEY exists:', !!resendApiKey);
    console.log('🔑 RESEND_API_KEY length:', resendApiKey ? resendApiKey.length : 0);
    
    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'Configuration email manquante - Clé Resend introuvable' });
    }

    const hostingerEmail = process.env.HOSTINGER_EMAIL || 'contact@battlesflow.fr';
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `send@${process.env.RESEND_DOMAIN}` 
      : 'onboarding@resend.dev';

    console.log('📧 Configuration email:', { 
      hostingerEmail, 
      fromEmail,
      RESEND_DOMAIN: process.env.RESEND_DOMAIN || 'Non défini'
    });

    // =============================================
    // 🎯 MODE DEBUG - SIMULATION POUR TEST
    // =============================================
    console.log('🎯 MODE DEBUG ACTIVÉ - Simulation d\'envoi');
    
    // Simulation réussie pour tester la communication
    return res.status(200).json({ 
      success: true, 
      message: '✅ TEST: API fonctionne! Email serait envoyé à ' + hostingerEmail,
      debug: {
        resendKey: !!resendApiKey,
        resendKeyLength: resendApiKey ? resendApiKey.length : 0,
        from: fromEmail,
        to: hostingerEmail,
        domain: process.env.RESEND_DOMAIN || 'Non défini',
        environment: 'Vercel'
      },
      receivedData: {
        name,
        email,
        subject,
        messageLength: message.length
      }
    });

    // =============================================
    // 🔥 CODE RÉEL POUR L'ENVOI D'EMAILS 
    // (DÉCOMMENTEZ UNE FOIS LE DEBUG TERMINÉ)
    // =============================================
    /*
    console.log('📤 Tentative d\'envoi via Resend...');
    
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

    console.log('📨 Réponse Resend - Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resend API error:', response.status, errorText);
      throw new Error(`Erreur Resend API: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Email envoyé avec succès:', result.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès !',
      messageId: result.id 
    });
    */

  } catch (error) {
    console.error('💥 Erreur globale dans api/contact:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message: ' + error.message 
    });
  }
}
