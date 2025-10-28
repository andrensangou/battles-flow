import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
}

// Helper function to determine from email
function getFromEmail() {
  const domain = Deno.env.get('RESEND_DOMAIN');
  if (domain) {
    return `send@${domain}`;
  }
  return 'onboarding@resend.dev'; // Default fallback
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message } = await req.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs sont requis' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email invalide' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Configuration email manquante' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Votre email Hostinger (à configurer dans les secrets Supabase)
    const hostingerEmail = Deno.env.get('HOSTINGER_EMAIL') || 'contact@votre-domaine.com'

    // Créer le contenu HTML de l'email
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
    `

    // Envoyer l'email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getFromEmail(),
        to: [hostingerEmail], // Votre email Hostinger
        subject: `[Battles Flow] ${subject}`,
        html: emailBody,
        text: `Nouveau message de contact\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
        reply_to: email // Permet de répondre directement au visiteur
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Resend API error:', response.status, errorText)
      throw new Error(`Erreur Resend API: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Email envoyé avec succès:', result.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message envoyé avec succès !',
        messageId: result.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})