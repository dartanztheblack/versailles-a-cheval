import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { narrativeTextConfig, narrativeTextConfigEn } from '../config';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NarrativeText = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const star1Ref = useRef<HTMLDivElement>(null);
  const star2Ref = useRef<HTMLDivElement>(null);

  // Get language from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  const isEnglish = lang === 'en';
  const config = isEnglish ? narrativeTextConfigEn : narrativeTextConfig;

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const star1 = star1Ref.current;
    const star2 = star2Ref.current;

    if (!section || !line1 || !line2 || !line3 || !star1 || !star2) return;

    // Set initial states
    gsap.set([line1, line2, line3], { opacity: 0, y: 40 });
    gsap.set([star1, star2], { opacity: 0, rotation: -180 });

    const triggers: ScrollTrigger[] = [];

    // Create timeline for staggered reveal
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
        onEnter: () => {
          gsap.to([line1, line2, line3], {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
          });
          gsap.to([star1, star2], {
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      },
    });

    if (revealTl.scrollTrigger) {
      triggers.push(revealTl.scrollTrigger);
    }

    // Continuous star rotation
    gsap.to(star1, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(star2, {
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (!config.line1) return null;

  return (
    <section
      ref={sectionRef}
      id="next-section"
      className="relative w-full bg-kaleo-sand py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative Stars */}
      <div
        ref={star1Ref}
        className="absolute top-12 left-8 md:left-16 text-kaleo-terracotta/20"
        style={{ willChange: 'transform, opacity' }}
      >
        <Star className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
      </div>
      <div
        ref={star2Ref}
        className="absolute bottom-12 right-8 md:right-16 text-kaleo-terracotta/20"
        style={{ willChange: 'transform, opacity' }}
      >
        <Star className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2
          ref={line1Ref}
          className="font-display text-headline text-kaleo-earth leading-tight"
          style={{ willChange: 'transform, opacity' }}
        >
          {config.line1}
        </h2>
        <p
          ref={line2Ref}
          className="font-display text-2xl md:text-3xl text-kaleo-terracotta italic mt-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {config.line2}
        </p>
        <p
          ref={line3Ref}
          className="font-body text-base md:text-lg text-kaleo-earth/70 mt-8 leading-relaxed max-w-2xl mx-auto"
          style={{ willChange: 'transform, opacity' }}
        >
          {config.line3}
        </p>
      </div>
    </section>
  );
};

export default NarrativeText;
