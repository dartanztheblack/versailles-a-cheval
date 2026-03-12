import { loadStripe } from "@stripe/stripe-js";
import { stripeConfig } from "@/config";

export const stripePromise = loadStripe(stripeConfig.publishableKey);

// Crée une session Stripe Checkout via l'API
export const createCheckoutSession = async ({
  amount,
  tourName,
  date,
  participants,
  lang = 'fr',
}: {
  amount: number;
  tourName: string;
  date: string;
  participants: number;
  lang?: string;
}): Promise<{ sessionId: string; url: string }> => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      tourName,
      date,
      participants,
      lang,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  return await response.json();
};

// Redirige vers Stripe Checkout
export const redirectToCheckout = async (params: {
  amount: number;
  tourName: string;
  date: string;
  participants: number;
  lang?: string;
}): Promise<void> => {
  const { url } = await createCheckoutSession(params);
  window.location.href = url;
};
