// pages/api/contact.js - VERSION PRODUCTION FINALE
export default async function handler(req, res) {
  console.log('=== 🚀 API CONTACT APPELLÉE ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  
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
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed',
      details: 'Seule la méthode POST est acceptée'
    });
  }

  try {
    const { name, email, subject, message } = req.body;
    console.log('📨 Données reçues:', { 
      name, 
      email, 
      subject, 
      messageLength: message?.length 
    });

    // ==========================================
    // VALIDATION DES DONNÉES
    // ==========================================
    if (!name || !email || !subject || !message) {
      console.log('❌ Champs manquants');
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs sont requis',
        details: 'Veuillez remplir tous les champs du formulaire'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email invalide:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Email invalide',
        details: 'Veuillez fournir une adresse email valide'
      });
    }

    // Validation de la longueur des champs
    if (name.length > 100) {
      return res.status(400).json({ 
        success: false,
        error: 'Nom trop long',
        details: 'Le nom ne peut pas dépasser 100 caractères'
      });
    }

    if (subject.length > 200) {
      return res.status(400).json({ 
        success: false,
        error: 'Sujet trop long',
        details: 'Le sujet ne peut pas dépasser 200 caractères'
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({ 
        success: false,
        error: 'Message trop long',
        details: 'Le message ne peut pas dépasser 5000 caractères'
      });
    }

    // ==========================================
    // VÉRIFICATION DES VARIABLES D'ENVIRONNEMENT
    // ==========================================
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not found in environment variables');
      console.error('Variables disponibles:', Object.keys(process.env).filter(k => k.includes('RESEND')));
      return res.status(500).json({ 
        success: false,
        error: 'Configuration email manquante',
        details: 'La clé API Resend n\'est pas configurée sur le serveur'
      });
    }

    console.log('🔑 RESEND_API_KEY trouvée, longueur:', resendApiKey.length);

    const hostingerEmail = process.env.HOSTINGER_EMAIL || 'contact@battlesflow.fr';
    const resendDomain = process.env.RESEND_DOMAIN;
    
    // ✅ CORRECTION IMPORTANTE : Format correct pour Resend
    // Resend exige soit "Name <email@domain.com>" soit juste "email@domain.com"
    let fromEmail;
    if (resendDomain) {
      // Si vous avez vérifié votre domaine sur Resend
      fromEmail = `Battles Flow <contact@${resendDomain}>`;
    } else {
      // Fallback vers le domaine par défaut de Resend
      fromEmail = 'onboarding@resend.dev';
    }

    console.log('📧 Configuration email:', { 
      to: hostingerEmail, 
      from: fromEmail,
      hasDomain: !!resendDomain,
      domain: resendDomain || 'Non défini (utilise resend.dev)'
    });

    // ==========================================
    // CONSTRUCTION DE L'EMAIL HTML
    // ==========================================
    const emailBody = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message - Battles Flow</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
        <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 20px; border-radius: 10px;">
          
          <!-- En-tête -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border-radius: 8px;">
            <h1 style="color: #ffd700; font-size: 32px; margin: 0; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);">
              🎤 BATTLES FLOW
            </h1>
            <p style="color: #ccc; margin: 10px 0 0 0; font-size: 16px;">
              Nouveau message de contact
            </p>
          </div>
          
          <!-- Contenu principal -->
          <div style="background: #2a2a2a; padding: 25px; border-radius: 8px; border-left: 4px solid #ffd700; margin-bottom: 20px;">
            <h2 style="color: #ffd700; margin-top: 0; font-size: 24px; margin-bottom: 20px;">
              📧 Détails du contact
            </h2>
            
            <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
              <strong style="color: #ffd700; display: block; margin-bottom: 8px; font-size: 14px;">
                👤 NOM:
              </strong>
              <span style="color: #fff; font-size: 16px;">
                ${name}
              </span>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
              <strong style="color: #ffd700; display: block; margin-bottom: 8px; font-size: 14px;">
                📮 EMAIL:
              </strong>
              <span style="color: #fff; font-size: 16px;">
                <a href="mailto:${email}" style="color: #4da6ff; text-decoration: none;">
                  ${email}
                </a>
              </span>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
              <strong style="color: #ffd700; display: block; margin-bottom: 8px; font-size: 14px;">
                📋 SUJET:
              </strong>
              <span style="color: #fff; font-size: 16px;">
                ${subject}
              </span>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: #1a1a1a; border-radius: 5px;">
              <strong style="color: #ffd700; display: block; margin-bottom: 12px; font-size: 14px;">
                💬 MESSAGE:
              </strong>
              <div style="color: #fff; line-height: 1.6; font-size: 15px; white-space: pre-wrap; word-wrap: break-word;">
${message}
              </div>
            </div>
          </div>
          
          <!-- Pied de page -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #444;">
            <p style="color: #888; font-size: 14px; margin: 10px 0;">
              Message envoyé depuis <strong style="color: #ffd700;">Battles Flow</strong>
            </p>
            <p style="color: #ffd700; font-size: 16px; margin: 10px 0;">
              🎵 La référence des battles hip-hop
            </p>
            <p style="color: #666; font-size: 12px; margin: 15px 0 0 0;">
              Pour répondre à cet email, utilisez : 
              <a href="mailto:${email}" style="color: #4da6ff; text-decoration: none;">${email}</a>
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `;

    // Version texte simple pour les clients email qui ne supportent pas le HTML
    const textBody = `
═══════════════════════════════════
🎤 BATTLES FLOW - NOUVEAU MESSAGE
═══════════════════════════════════

📧 DÉTAILS DU CONTACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nom: ${name}
📮 Email: ${email}
📋 Sujet: ${subject}

💬 MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

═══════════════════════════════════
Message envoyé depuis Battles Flow
🎵 La référence des battles hip-hop
═══════════════════════════════════

Pour répondre: ${email}
    `.trim();

    // ==========================================
    // ENVOI DE L'EMAIL VIA RESEND API
    // ==========================================
    console.log('📤 Tentative d\'envoi via Resend API...');
    
    const resendPayload = {
      from: fromEmail,
      to: [hostingerEmail],
      subject: `[Battles Flow] ${subject}`,
      html: emailBody,
      text: textBody,
      reply_to: email
    };

    console.log('📦 Payload Resend:', {
      from: resendPayload.from,
      to: resendPayload.to,
      subject: resendPayload.subject,
      reply_to: resendPayload.reply_to
    });
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload)
    });

    console.log('📨 Réponse Resend - Status:', resendResponse.status);
    console.log('📨 Réponse Resend - Status Text:', resendResponse.statusText);

    // Lire la réponse
    const responseText = await resendResponse.text();
    console.log('📨 Réponse Resend - Body:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Erreur parsing JSON:', e);
      responseData = { error: responseText };
    }

    // Vérifier si l'envoi a réussi
    if (!resendResponse.ok) {
      console.error('❌ Erreur Resend API:', resendResponse.status, responseData);
      
      // Messages d'erreur personnalisés selon le code de statut
      let errorMessage = 'Erreur lors de l\'envoi de l\'email';
      let errorDetails = responseData.message || responseData.error || 'Erreur inconnue';
      
      switch (resendResponse.status) {
        case 401:
          errorDetails = 'Clé API Resend invalide ou expirée';
          break;
        case 403:
          errorDetails = 'Accès refusé - Vérifiez que votre domaine est vérifié sur Resend';
          break;
        case 422:
          errorDetails = 'Données invalides - ' + errorDetails;
          break;
        case 429:
          errorDetails = 'Trop de requêtes - Veuillez réessayer dans quelques minutes';
          break;
        case 500:
          errorDetails = 'Erreur serveur Resend - Veuillez réessayer plus tard';
          break;
      }
      
      return res.status(500).json({ 
        success: false,
        error: errorMessage,
        details: errorDetails,
        statusCode: resendResponse.status,
        debug: {
          resendStatus: resendResponse.status,
          resendError: responseData
        }
      });
    }

    // ==========================================
    // SUCCÈS - EMAIL ENVOYÉ
    // ==========================================
    console.log('✅ Email envoyé avec succès!');
    console.log('✅ Message ID:', responseData.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès ! Nous vous répondrons bientôt.',
      messageId: responseData.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // ==========================================
    // GESTION DES ERREURS GLOBALES
    // ==========================================
    console.error('💥 ERREUR GLOBALE dans api/contact:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    return res.status(500).json({ 
      success: false,
      error: 'Erreur lors de l\'envoi du message',
      details: error.message || 'Une erreur inattendue s\'est produite',
      timestamp: new Date().toISOString()
    });
  }
}
