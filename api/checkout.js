// API Stripe Checkout Session
// Cette fonction crée une session de paiement Stripe Checkout

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export default async function handler(request, response) {
  // Vérifier que la clé est configurée
  if (!STRIPE_SECRET_KEY) {
    return response.status(500).json({ error: 'Stripe secret key not configured' });
  }

  // CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'eur', tourName, date, participants, lang = 'fr' } = request.body;

    if (!amount || amount <= 0) {
      return response.status(400).json({ error: 'Invalid amount' });
    }

    // Appel API Stripe pour créer une session de checkout
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': currency,
        'line_items[0][price_data][product_data][name]': tourName || 'Versailles Horse Riding Experience',
        'line_items[0][price_data][product_data][description]': `${date} • ${participants} ${lang === 'en' ? 'travelers' : 'voyageurs'}`,
        'line_items[0][price_data][unit_amount]': (amount * 100).toString(), // en centimes
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${request.headers.origin || 'https://versailles-a-cheval.vercel.app'}/reservation?success=true&session_id={CHECKOUT_SESSION_ID}&lang=${lang}`,
        'cancel_url': `${request.headers.origin || 'https://versailles-a-cheval.vercel.app'}/reservation?canceled=true&lang=${lang}`,
      }),
    });

    if (!stripeResponse.ok) {
      const errorData = await stripeResponse.json();
      console.error('Stripe error:', errorData);
      return response.status(500).json({ 
        error: errorData.error?.message || 'Failed to create checkout session' 
      });
    }

    const session = await stripeResponse.json();
    
    return response.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Server error:', error);
    return response.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
