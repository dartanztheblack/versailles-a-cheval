import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardStackConfig } from '../config';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CardStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const navigate = useNavigate();

  // Get language from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  const isEnglish = lang === 'en';

  const cards = cardStackConfig.cards;

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !wrapper || cardElements.length === 0) return;

    // Set initial positions - cards start at screen center
    cardElements.forEach((card, index) => {
      gsap.set(card, {
        y: index === 0 ? 0 : window.innerHeight * 0.5,
        rotation: cards[index].rotation,
        opacity: index === 0 ? 1 : 0,
      });
    });

    // Create pinned scroll animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${cardElements.length * 100}%`,
      pin: wrapper,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const segmentSize = 1 / cardElements.length;

        cardElements.forEach((card, index) => {
          const cardStart = index * segmentSize;
          const cardProgress = gsap.utils.clamp(0, 1, (progress - cardStart) / segmentSize);

          if (index === 0) {
            // First card - fade out as user scrolls
            gsap.set(card, {
              opacity: 1 - cardProgress * 0.3,
              scale: 1 - cardProgress * 0.05,
            });
          } else {
            // Other cards - slide up from bottom
            const prevCardEnd = index * segmentSize;
            const prevProgress = gsap.utils.clamp(0, 1, (progress - prevCardEnd + segmentSize) / segmentSize);

            gsap.set(card, {
              y: (1 - prevProgress) * window.innerHeight * 0.8,
              opacity: prevProgress,
              zIndex: index,
            });
          }
        });
      },
    });

    triggerRef.current = trigger;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, []);

  const handleReserve = (tourId: number) => {
    navigate(`/reservation?tour=${tourId}&lang=${lang}`);
  };

  if (!cardStackConfig.sectionTitle && cards.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-kaleo-sand"
      style={{ minHeight: `${(cards.length + 1) * 100}vh` }}
    >
      {/* Section Header - Higher up */}
      <div className="absolute top-8 left-0 right-0 py-6 md:py-8 text-center z-10 bg-kaleo-sand/80 backdrop-blur-sm">
        <h2 className="font-display text-3xl md:text-4xl text-kaleo-earth">
          {isEnglish ? cardStackConfig.sectionTitleEn : cardStackConfig.sectionTitle}
        </h2>
        <p className="font-body text-sm text-kaleo-terracotta uppercase tracking-[0.2em] mt-2">
          {isEnglish ? cardStackConfig.sectionSubtitleEn : cardStackConfig.sectionSubtitle}
        </p>
      </div>

      {/* Pinned Card Wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-4xl mx-auto px-6 md:px-8 aspect-[4/3]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute inset-0"
              style={{
                willChange: 'transform, opacity',
                zIndex: index,
              }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-deep bg-kaleo-cream h-full">
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={isEnglish ? card.titleEn : card.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-kaleo-charcoal/70 via-transparent to-transparent" />
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl text-kaleo-cream mb-2">
                    {isEnglish ? card.titleEn : card.title}
                  </h3>
                  <p className="font-body text-sm text-kaleo-cream/70 mb-4">
                    {isEnglish ? card.descriptionEn : card.description}
                  </p>
                  <Button
                    onClick={() => handleReserve(card.id)}
                    className="bg-kaleo-cream text-kaleo-charcoal hover:bg-kaleo-cream/90 font-body text-sm uppercase tracking-wider"
                  >
                    {isEnglish ? 'Book Now' : 'Réserver'}
                  </Button>
                </div>

                {/* Card Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-kaleo-cream/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-body text-xs text-kaleo-cream">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </section>
  );
};

export default CardStack;
