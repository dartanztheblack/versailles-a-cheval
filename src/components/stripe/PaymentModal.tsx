import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise, createPaymentIntent } from "@/lib/stripe";
import { CheckoutForm } from "./CheckoutForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  tourName: string;
  onSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  tourName,
  onSuccess,
}: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && amount > 0) {
      setIsLoading(true);
      createPaymentIntent(amount * 100, "eur")
        .then((intent) => {
          if (intent) {
            setClientSecret(intent.clientSecret);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, amount]);

  const handleSuccess = () => {
    setClientSecret(null);
    onSuccess();
  };

  const handleCancel = () => {
    setClientSecret(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#1C1C1C]">
            Réservation : {tourName}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#8C7B6B]" />
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#8C7B6B",
                  colorBackground: "#ffffff",
                  colorText: "#1C1C1C",
                  colorDanger: "#ef4444",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <CheckoutForm
              amount={amount}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </Elements>
        ) : (
          <div className="text-center py-8 text-[#8C7B6B]">
            Impossible de charger le formulaire de paiement.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
