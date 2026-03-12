import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  options?: { label: string; value: string; action?: () => void }[];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState("fr");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isEnglish = lang === "en";

  const t = {
    title: isEnglish ? "Versailles Guide" : "Guide Versailles",
    placeholder: isEnglish ? "Type your message..." : "Écrivez votre message...",
    welcome: isEnglish 
      ? "Hello! I'm your virtual guide to help you discover our royal experience. How can I assist you today?"
      : "Bonjour ! Je suis votre guide virtuel pour vous aider à découvrir notre expérience royale. Comment puis-je vous aider ?",
    options: {
      price: isEnglish ? "💰 Prices and packages" : "💰 Tarifs et formules",
      book: isEnglish ? "📅 Book now" : "📅 Réserver maintenant",
      info: isEnglish ? "ℹ️ What's included?" : "ℹ️ Que comprend l'offre ?",
      contact: isEnglish ? "📞 Contact us" : "📞 Nous contacter",
      human: isEnglish ? "👨‍💼 Talk to a person" : "👨‍💼 Parler à une personne",
    },
    responses: {
      price: isEnglish
        ? "Our Complete Royal Experience starts at €490 per person. It includes a 1.5-hour private Château visit and a 2-hour horseback ride. Optional hotel transport is available for €100 per person."
        : "Notre Expérience Royale Complète démarre à 490€ par personne. Elle comprend 1h30 de visite privée du Château et 2h de balade à cheval. Le transport depuis votre hôtel est disponible en option à 100€ par personne.",
      info: isEnglish
        ? "Our experience includes: 1) Private guided visit of the Palace of Versailles (1.5h) 2) Horseback ride through the Royal Gardens (2h) 3) All riding equipment 4) Dedicated concierge service. Optional: Hotel transport (+€100/person)"
        : "Notre expérience comprend : 1) Visite privée guidée du Château de Versailles (1h30) 2) Balade à cheval dans les jardins royaux (2h) 3) Tout l'équipement d'équitation 4) Service conciergerie dédié. Option : Transport hôtel (+100€/pers)",
      contact: isEnglish
        ? "You can reach us at: 📞 +33 6 25 75 79 95 or 📧 parisdreamhunt@gmail.com. We're available every day from 9am to 7pm!"
        : "Vous pouvez nous joindre au : 📞 +33 6 25 75 79 95 ou 📧 parisdreamhunt@gmail.com. Nous sommes disponibles tous les jours de 9h à 19h !",
      human: isEnglish
        ? "I understand you want to speak with a real person. Here's how to reach us:\n\n📞 Phone: +33 6 25 75 79 95\n📧 Email: parisdreamhunt@gmail.com\n\nWe're available Monday to Saturday, 9am to 7pm. We'll respond within 2 hours!"
        : "Je comprends que vous souhaitez parler à une vraie personne. Voici comment nous joindre :\n\n📞 Téléphone : +33 6 25 75 79 95\n📧 Email : parisdreamhunt@gmail.com\n\nNous sommes disponibles du lundi au samedi, de 9h à 19h. Nous répondons sous 2 heures !",
    },
  };

  useEffect(() => {
    // Détecter la langue depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    if (urlLang) setLang(urlLang);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message de bienvenue
      setMessages([
        {
          id: "welcome",
          type: "bot",
          text: t.welcome,
          options: [
            { label: t.options.price, value: "price" },
            { label: t.options.info, value: "info" },
            { label: t.options.book, value: "book" },
            { label: t.options.contact, value: "contact" },
            { label: t.options.human, value: "human" },
          ],
        },
      ]);
    }
  }, [isOpen, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (option: { label: string; value: string }) => {
    // Ajouter le message utilisateur
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", text: option.label },
    ]);

    // Répondre selon l'option
    setTimeout(() => {
      let responseText = "";
      let responseOptions: Message["options"] = [];

      switch (option.value) {
        case "price":
          responseText = t.responses.price;
          responseOptions = [
            { label: t.options.book, value: "book" },
            { label: t.options.info, value: "info" },
          ];
          break;
        case "info":
          responseText = t.responses.info;
          responseOptions = [
            { label: t.options.price, value: "price" },
            { label: t.options.book, value: "book" },
          ];
          break;
        case "book":
          navigate(`/reservation?tour=1&lang=${lang}`);
          setIsOpen(false);
          return;
        case "contact":
          responseText = t.responses.contact;
          responseOptions = [
            { label: t.options.price, value: "price" },
            { label: t.options.book, value: "book" },
            { label: t.options.human, value: "human" },
          ];
          break;
        case "human":
          responseText = t.responses.human;
          responseOptions = [
            { label: t.options.price, value: "price" },
            { label: t.options.book, value: "book" },
          ];
          break;
        default:
          responseText = isEnglish
            ? "I'm not sure I understand. Can you choose one of the options below?"
            : "Je ne suis pas sûr de comprendre. Pouvez-vous choisir l'une des options ci-dessous ?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: responseText,
          options: responseOptions,
        },
      ]);
    }, 500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", text: inputValue },
    ]);

    // Réponse automatique simple
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let responseText = "";

      if (lowerInput.includes("prix") || lowerInput.includes("tarif") || lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("combien")) {
        responseText = t.responses.price;
      } else if (lowerInput.includes("réserv") || lowerInput.includes("book") || lowerInput.includes("réserver")) {
        navigate(`/reservation?tour=1&lang=${lang}`);
        setIsOpen(false);
        return;
      } else if (lowerInput.includes("inclus") || lowerInput.includes("include") || lowerInput.includes("comprend") || lowerInput.includes("qu'est ce")) {
        responseText = t.responses.info;
      } else if (lowerInput.includes("contact") || lowerInput.includes("téléphone") || lowerInput.includes("phone") || lowerInput.includes("email")) {
        responseText = t.responses.contact;
      } else if (lowerInput.includes("humain") || lowerInput.includes("personne") || lowerInput.includes("human") || lowerInput.includes("agent") || lowerInput.includes("parler") || lowerInput.includes("discuter")) {
        responseText = t.responses.human;
      } else {
        responseText = isEnglish
          ? "I'd be happy to help! Here are some options or type your question:"
          : "Je serai ravi de vous aider ! Voici quelques options ou tapez votre question :";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: responseText,
          options: [
            { label: t.options.price, value: "price" },
            { label: t.options.info, value: "info" },
            { label: t.options.book, value: "book" },
            { label: t.options.contact, value: "contact" },
            { label: t.options.human, value: "human" },
          ],
        },
      ]);
    }, 500);

    setInputValue("");
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#8C7B6B] hover:bg-[#6B5D4F] shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Fenêtre de chat */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#8C7B6B] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">{t.title}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F3F0EB]">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex gap-2 ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.type === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-[#8C7B6B] flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.type === "user"
                        ? "bg-[#8C7B6B] text-white"
                        : "bg-white text-[#1C1C1C]"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.type === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#1C1C1C] flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Options */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-10">
                    {msg.options.map((option) => (
                      <Button
                        key={option.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className="text-xs bg-white hover:bg-[#8C7B6B] hover:text-white"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#EAE4D9]">
            <div className="flex gap-2">
              <Input
                placeholder={t.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-[#8C7B6B] hover:bg-[#6B5D4F]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
