import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  console.error("VITE_STRIPE_PUBLISHABLE_KEY is not set. Stripe payments will not work.");
}

export const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

// Crée une session Stripe Checkout via l'API (montant validé côté serveur)
export const createCheckoutSession = async ({
  productId = "royal_complete",
  participants,
  addOns = [],
  date,
  lang = "fr",
}: {
  productId?: string;
  participants: number;
  addOns?: string[];
  date?: string;
  lang?: string;
}): Promise<{ sessionId: string; url: string }> => {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      participants,
      addOns,
      date,
      lang,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create checkout session");
  }

  return await response.json();
};

// Redirige vers Stripe Checkout
export const redirectToCheckout = async (params: {
  productId?: string;
  participants: number;
  addOns?: string[];
  date?: string;
  lang?: string;
}): Promise<void> => {
  const { url } = await createCheckoutSession(params);
  window.location.href = url;
};
