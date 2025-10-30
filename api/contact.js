// api/contact.js
export default async function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log('🚀 API Contact appelée - Method:', req.method);

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    console.log('📨 Données reçues:', { name, email, subject });

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs sont requis'
      });
    }

    // Variables d'environnement
    const resendApiKey = process.env.RESEND_API_KEY;
    const hostingerEmail = process.env.HOSTINGER_EMAIL || 'contact@battlesflow.fr';
    const resendDomain = process.env.RESEND_DOMAIN || 'battlesflow.fr';

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY manquante');
      return res.status(500).json({ 
        success: false,
        error: 'Configuration manquante'
      });
    }

    console.log('✅ Configuration OK - Envoi email...');

    // Email HTML
    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; background: #1a1a1a; color: #fff; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ffd700;">🎤 Battles Flow - Nouveau message</h1>
          <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #ffd700;">Nom:</strong> ${name}</p>
            <p><strong style="color: #ffd700;">Email:</strong> <a href="mailto:${email}" style="color: #4da6ff;">${email}</a></p>
            <p><strong style="color: #ffd700;">Sujet:</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong style="color: #ffd700;">Message:</strong>
              <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <p style="text-align: center; color: #888; font-size: 14px;">
            Message envoyé depuis Battles Flow<br>
            <span style="color: #ffd700;">🎵 La référence des battles hip-hop</span>
          </p>
        </div>
      </body>
      </html>
    `;

    // Envoi via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Battles Flow <contact@${resendDomain}>`,
        to: hostingerEmail,
        subject: `[Battles Flow] ${subject}`,
        html: emailBody,
        reply_to: email
      })
    });

    const responseData = await resendResponse.json();

    console.log('📧 Resend Response:', resendResponse.status, responseData);

    if (!resendResponse.ok) {
      console.error('❌ Erreur Resend:', responseData);
      return res.status(500).json({ 
        success: false,
        error: 'Erreur lors de l\'envoi',
        details: responseData.message || 'Erreur Resend'
      });
    }

    console.log('✅ Email envoyé! ID:', responseData.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès !',
      messageId: responseData.id
    });

  } catch (error) {
    console.error('💥 Erreur:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erreur serveur',
      details: error.message
    });
  }
}
```

### 2️⃣ Supprimez l'ancien fichier

Supprimez le dossier `/pages` complet (il est inutile pour Vite).

### 3️⃣ Commit et attendez

1. Commit les changements
2. Attendez 1-2 minutes que Vercel redéploie
3. Testez le formulaire

## 🎉 Résultat attendu

Une fois déployé, votre API sera accessible à :
```
https://battlesflow.fr/api/contact
