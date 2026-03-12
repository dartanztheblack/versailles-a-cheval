import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { breathSectionConfig, breathSectionConfigEn } from '../config';

gsap.registerPlugin(ScrollTrigger);

const BreathSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Get language from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  const isEnglish = lang === 'en';
  const config = isEnglish ? breathSectionConfigEn : breathSectionConfig;

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;

    if (!section || !imageContainer || !image || !title || !subtitle || !description) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    gsap.set(imageContainer, { scale: 0.8, borderRadius: '50px' });
    gsap.set([title, subtitle, description], { opacity: 0, y: 30 });

    // Main scroll animation
    const mainTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Image scale and border radius animation
        gsap.set(imageContainer, {
          scale: 0.8 + progress * 0.2,
          borderRadius: `${50 - progress * 50}px`,
        });

        // Image parallax
        gsap.set(image, {
          y: progress * -50,
        });
      },
    });
    triggers.push(mainTrigger);

    // Text reveal
    const textTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      once: true,
      onEnter: () => {
        gsap.to([title, subtitle, description], {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(textTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (!config.title) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-kaleo-sand py-24 md:py-32 overflow-hidden"
    >
      {/* Scalable Image Container - Full Width */}
      <div
        ref={imageContainerRef}
        className="relative w-full aspect-video overflow-hidden"
        style={{ willChange: 'transform, border-radius' }}
      >
        <img
          ref={imageRef}
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          className="w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-kaleo-charcoal/30" />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2
            ref={titleRef}
            className="font-display text-display text-kaleo-cream"
            style={{ willChange: 'transform, opacity' }}
          >
            {config.title}
          </h2>
          <p
            ref={subtitleRef}
            className="font-body text-sm md:text-base text-kaleo-cream/80 uppercase tracking-[0.3em] mt-4"
            style={{ willChange: 'transform, opacity' }}
          >
            {config.subtitle}
          </p>
        </div>
      </div>

      {/* Description Text */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mt-16 text-center">
        <p
          ref={descriptionRef}
          className="font-body text-base md:text-lg text-kaleo-earth/70 leading-relaxed"
          style={{ willChange: 'transform, opacity' }}
        >
          {config.description}
        </p>
      </div>
    </section>
  );
};

export default BreathSection;
