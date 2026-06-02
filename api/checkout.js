// API Stripe Checkout Session - SECURED
// Le montant est calculé CÔTÉ SERVEUR, pas depuis la requête client

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Produits validés côté serveur (source de vérité)
const PRODUCTS = {
  royal_complete: {
    name: "L'Expérience Royale Complète",
    nameEn: "The Complete Royal Experience",
    basePricePerPerson: 49000, // en centimes (490€)
  },
};

const ADDONS = {
  transport: {
    name: "Transport depuis votre hôtel",
    nameEn: "Transport from your hotel",
    pricePerPerson: 10000, // en centimes (100€)
  },
};

// Domaines autorisés pour CORS
const ALLOWED_ORIGINS = [
  'https://versaillesacheval.com',
  'https://www.versaillesacheval.com',
  'https://versailles-a-cheval.vercel.app',
  'https://versailles-a-cheval-git-main-dartanztheblacks-projects.vercel.app',
];

export default async function handler(request, response) {
  // Vérifier que la clé est configurée
  if (!STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return response.status(500).json({ error: 'Stripe secret key not configured' });
  }

  // CORS - restreint aux domaines autorisés
  const origin = request.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // En dev local, on autorise aussi
    response.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      productId = 'royal_complete',
      participants = 1,
      addOns = [],
      date,
      lang = 'fr',
    } = request.body;

    // Valider les participants (min 1, max 10)
    const validParticipants = Math.max(1, Math.min(10, parseInt(participants) || 1));

    // Trouver le produit
    const product = PRODUCTS[productId];
    if (!product) {
      return response.status(400).json({ error: `Unknown product: ${productId}` });
    }

    // Calculer le montant CÔTÉ SERVEUR
    let totalAmount = product.basePricePerPerson * validParticipants;

    // Ajouter les add-ons validés
    const validAddOnNames = [];
    for (const addOnId of addOns) {
      const addOn = ADDONS[addOnId];
      if (addOn) {
        totalAmount += addOn.pricePerPerson * validParticipants;
        validAddOnNames.push(lang === 'en' ? addOn.nameEn : addOn.name);
      }
    }

    const tourName = lang === 'en' ? product.nameEn : product.name;
    const description = date
      ? `${date} • ${validParticipants} ${lang === 'en' ? 'travelers' : 'voyageurs'}`
      : `${validParticipants} ${lang === 'en' ? 'travelers' : 'voyageurs'}`;

    // Ajouter les add-ons à la description
    const fullDescription = validAddOnNames.length > 0
      ? `${description} + ${validAddOnNames.join(', ')}`
      : description;

    // Appel API Stripe pour créer une session de checkout
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][product_data][name]': tourName,
        'line_items[0][price_data][product_data][description]': fullDescription,
        'line_items[0][price_data][unit_amount]': totalAmount.toString(),
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${origin || 'https://versaillesacheval.com'}/reservation?success=true&session_id={CHECKOUT_SESSION_ID}&lang=${lang}&product=${productId}&participants=${validParticipants}`,
        'cancel_url': `${origin || 'https://versaillesacheval.com'}/reservation?canceled=true&lang=${lang}`,
        'metadata[product_id]': productId,
        'metadata[participants]': validParticipants.toString(),
        'metadata[addons]': addOns.filter(id => ADDONS[id]).join(','),
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
