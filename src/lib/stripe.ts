import { loadStripe } from "@stripe/stripe-js";
import { stripeConfig } from "@/config";

export const stripePromise = loadStripe(stripeConfig.publishableKey);

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export const createPaymentIntent = async (
  amount: number,
  currency: string = "eur"
): Promise<PaymentIntent | null> => {
  try {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return null;
  }
};
