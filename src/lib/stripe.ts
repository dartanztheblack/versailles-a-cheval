import { loadStripe } from "@stripe/stripe-js";
import { stripeConfig } from "@/config";

export const stripePromise = loadStripe(stripeConfig.publishableKey);

// Note: Pour un paiement complet, il faudrait un backend.
// Cette solution affiche un message avec instructions pour le virement/Stripe Link
export const initiatePayment = async ({
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
}): Promise<{ success: boolean; message: string }> => {
  // Pour l'instant, on retourne une instruction de paiement
  // L'utilisateur devra créer un lien de paiement Stripe manuellement
  // ou on pourra intégrer un backend plus tard
  
  const message = lang === 'en' 
    ? `Please complete your booking of ${amount}€ for "${tourName}" on ${date} for ${participants} travelers. Contact us at parisdreamhunt@gmail.com to finalize the payment.`
    : `Veuillez finaliser votre réservation de ${amount}€ pour "${tourName}" le ${date} pour ${participants} voyageurs. Contactez-nous à parisdreamhunt@gmail.com pour finaliser le paiement.`;
  
  return { success: true, message };
};
