import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zigZagGridConfig, zigZagGridConfigEn } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ZigZagGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Get language from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  const isEnglish = lang === 'en';
  const config = isEnglish ? zigZagGridConfigEn : zigZagGridConfig;

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || items.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    items.forEach((item, index) => {
      const image = item.querySelector('.zigzag-image');
      const content = item.querySelector('.zigzag-content');

      if (!image || !content) return;

      // Set initial states
      gsap.set(content, { opacity: 0, x: config.items[index]?.reverse ? 50 : -50 });
      gsap.set(image, { opacity: 0, scale: 1.1 });

      // Content reveal
      const contentTrigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(contentTrigger);

      // Image reveal with parallax
      const imageTrigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        onEnter: () => {
          gsap.to(image, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          });
        },
        onUpdate: (self) => {
          gsap.set(image, { y: self.progress * -30 });
        },
      });
      triggers.push(imageTrigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [config]);

  if (!config.sectionTitle && config.items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-kaleo-sand py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 mb-16 md:mb-24">
        <p className="font-body text-sm text-kaleo-terracotta uppercase tracking-[0.2em]">
          {config.sectionLabel}
        </p>
        <h2 className="font-display text-headline text-kaleo-earth mt-4">
          {config.sectionTitle}
        </h2>
      </div>

      {/* Grid Items */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 space-y-24 md:space-y-32">
        {config.items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { itemsRef.current[index] = el; }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
              item.reverse ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${
                item.reverse ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="zigzag-image w-full h-full object-cover rounded-3xl"
                style={{ willChange: 'transform, opacity' }}
              />
            </div>

            {/* Content */}
            <div
              className={`zigzag-content ${
                item.reverse ? 'lg:order-1 lg:text-right' : 'lg:order-2'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <p className="font-body text-xs text-kaleo-terracotta uppercase tracking-[0.15em]">
                {item.subtitle}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-kaleo-earth mt-3">
                {item.title}
              </h3>
              <p className="font-body text-base text-kaleo-earth/70 mt-6 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZigZagGrid;
