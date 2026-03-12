import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { CheckoutForm } from "@/components/stripe/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, Loader2, Check } from "lucide-react";
import { cardStackConfig, addOnOptions } from "@/config";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export function Reservation() {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tour");
  const lang = searchParams.get("lang") || "fr";
  const isEnglish = lang === "en";
  
  const tour = cardStackConfig.cards.find((c) => c.id === Number(tourId));
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(false);

  const baseAmount = (tour?.basePrice || 490) * participants;
  const addOnsAmount = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOnOptions.find(a => a.id === addOnId);
    return total + (addOn?.price || 0) * participants;
  }, 0);
  const totalAmount = baseAmount + addOnsAmount;

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleProceedToPayment = async () => {
    if (!date) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: totalAmount * 100, 
          currency: "eur",
          metadata: {
            tourId: tour?.id,
            date: date.toISOString(),
            participants,
            addOns: selectedAddOns.join(","),
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setStep(2);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
    setIsLoading(false);
  };

  const handlePaymentSuccess = () => {
    setReservationComplete(true);
    setStep(3);
  };

  const t = {
    back: isEnglish ? "Back" : "Retour",
    notFound: isEnglish ? "Tour not found" : "Tour non trouvé",
    step1Title: isEnglish ? "Select Date & Options" : "Sélectionnez la date et les options",
    step2Title: isEnglish ? "Secure Payment" : "Paiement sécurisé",
    step3Title: isEnglish ? "Booking Confirmed!" : "Réservation confirmée !",
    selectDate: isEnglish ? "Choose your date" : "Choisissez votre date",
    selectDatePlaceholder: isEnglish ? "Select a date" : "Sélectionnez une date",
    participants: isEnglish ? "Number of travelers" : "Nombre de voyageurs",
    addOns: isEnglish ? "Optional Add-ons" : "Options supplémentaires",
    pricePerPerson: isEnglish ? "Price per person" : "Prix par personne",
    total: isEnglish ? "Total" : "Total",
    proceedPayment: isEnglish ? "Proceed to payment" : "Procéder au paiement",
    loading: isEnglish ? "Loading..." : "Chargement...",
    pay: isEnglish ? "Pay" : "Payer",
    thankYou: isEnglish ? "Thank you for your booking. A confirmation email has been sent to you." : "Merci pour votre réservation. Un email de confirmation vous a été envoyé.",
    tour: isEnglish ? "Tour" : "Tour",
    date: isEnglish ? "Date" : "Date",
    travelers: isEnglish ? "Travelers" : "Voyageurs",
    options: isEnglish ? "Options" : "Options",
    totalPaid: isEnglish ? "Total paid" : "Total payé",
    backHome: isEnglish ? "Back to home" : "Retour à l'accueil",
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-[#F3F0EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#1C1C1C] mb-4">
            {t.notFound}
          </h1>
          <Button onClick={() => window.history.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t.back}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      {/* Header */}
      <header className="bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={`/?lang=${lang}`} className="text-xl font-serif text-[#1C1C1C]">
            {isEnglish ? "Versailles Horse Riding" : "Versailles à Cheval"}
          </a>
          <div className="flex items-center gap-4">
            <a 
              href={`/reservation?tour=${tourId}&lang=${isEnglish ? 'fr' : 'en'}`}
              className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]"
            >
              {isEnglish ? 'FR' : 'EN'}
            </a>
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t.back}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= s ? "bg-[#8C7B6B] text-white" : "bg-[#EAE4D9] text-[#8C7B6B]"
                )}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={cn(
                    "w-16 h-0.5 ml-4",
                    step > s ? "bg-[#8C7B6B]" : "bg-[#EAE4D9]"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Date, Participants & Options */}
        {step === 1 && (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-serif text-[#1C1C1C] mb-2">
              {isEnglish ? tour.titleEn : tour.title}
            </h1>
            <p className="text-[#8C7B6B] mb-6">
              {isEnglish ? tour.descriptionEn : tour.description}
            </p>

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <Label className="text-[#1C1C1C] mb-2 block">
                  {t.selectDate}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: fr })
                      ) : (
                        <span>{t.selectDatePlaceholder}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Participants */}
              <div>
                <Label className="text-[#1C1C1C] mb-2 block">
                  {t.participants}
                </Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    disabled={participants <= 1}
                  >
                    -
                  </Button>
                  <span className="text-xl font-medium w-8 text-center">
                    {participants}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setParticipants(Math.min(10, participants + 1))}
                    disabled={participants >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <Label className="text-[#1C1C1C] mb-3 block">
                  {t.addOns}
                </Label>
                <div className="space-y-3">
                  {addOnOptions.map((addOn) => (
                    <div
                      key={addOn.id}
                      className={cn(
                        "flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors",
                        selectedAddOns.includes(addOn.id)
                          ? "border-[#8C7B6B] bg-[#F3F0EB]"
                          : "border-[#EAE4D9] hover:border-[#8C7B6B]"
                      )}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <Checkbox
                        checked={selectedAddOns.includes(addOn.id)}
                        onCheckedChange={() => toggleAddOn(addOn.id)}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-[#1C1C1C]">
                            {isEnglish ? addOn.nameEn : addOn.name}
                          </p>
                          <p className="text-[#8C7B6B] font-medium">
                            +{addOn.price}€ {isEnglish ? '/ person' : '/ pers.'}
                          </p>
                        </div>
                        <p className="text-sm text-[#8C7B6B] mt-1">
                          {isEnglish ? addOn.descriptionEn : addOn.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-[#EAE4D9] pt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#8C7B6B]">{t.pricePerPerson}</span>
                  <span className="font-medium">{tour.basePrice}€</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8C7B6B]">{t.options}</span>
                    <span className="text-[#8C7B6B]">+{addOnsAmount}€</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-medium pt-2 border-t border-[#EAE4D9]">
                  <span>{t.total}</span>
                  <span className="text-[#8C7B6B]">{totalAmount}€</span>
                </div>
              </div>

              <Button
                onClick={handleProceedToPayment}
                disabled={!date || isLoading}
                className="w-full bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.loading}
                  </>
                ) : (
                  t.proceedPayment
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && clientSecret && (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-serif text-[#1C1C1C] mb-6">
              {t.step2Title}
            </h1>
            <div className="bg-[#F3F0EB] p-4 rounded-lg mb-6">
              <p className="text-[#8C7B6B] text-sm">{t.total}</p>
              <p className="text-2xl font-medium text-[#1C1C1C]">{totalAmount}€</p>
            </div>
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
                amount={totalAmount}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setStep(1)}
              />
            </Elements>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && reservationComplete && (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-serif text-[#1C1C1C] mb-4">
              {t.step3Title}
            </h1>
            <p className="text-[#8C7B6B] mb-6">
              {t.thankYou}
            </p>
            <div className="bg-[#F3F0EB] rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-[#8C7B6B] mb-1">{t.tour}</p>
              <p className="font-medium mb-3">{isEnglish ? tour.titleEn : tour.title}</p>
              <p className="text-sm text-[#8C7B6B] mb-1">{t.date}</p>
              <p className="font-medium mb-3">
                {date && format(date, "PPP", { locale: fr })}
              </p>
              <p className="text-sm text-[#8C7B6B] mb-1">{t.travelers}</p>
              <p className="font-medium mb-3">{participants}</p>
              {selectedAddOns.length > 0 && (
                <>
                  <p className="text-sm text-[#8C7B6B] mb-1">{t.options}</p>
                  <p className="font-medium mb-3">
                    {selectedAddOns.map(id => {
                      const addOn = addOnOptions.find(a => a.id === id);
                      return isEnglish ? addOn?.nameEn : addOn?.name;
                    }).join(", ")}
                  </p>
                </>
              )}
              <p className="text-sm text-[#8C7B6B] mb-1">{t.totalPaid}</p>
              <p className="font-medium text-[#8C7B6B]">{totalAmount}€</p>
            </div>
            <Button onClick={() => window.location.href = `/?lang=${lang}`}>
              {t.backHome}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
