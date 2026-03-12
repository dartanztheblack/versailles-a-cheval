import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig, heroConfigEn } from '../config';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Get language from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  const isEnglish = lang === 'en';
  const config = isEnglish ? heroConfigEn : heroConfig;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !image || !title || !subtitle || !scrollIndicator) return;

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(scrollIndicator, { opacity: 0, y: 20 });

    const triggers: ScrollTrigger[] = [];

    // Entrance animation
    const entranceTl = gsap.timeline({ delay: 0.5 });
    entranceTl
      .to(title, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(subtitle, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .to(scrollIndicator, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    // Ken Burns effect on image
    gsap.set(image, { scale: 1.1 });
    gsap.to(image, {
      scale: 1,
      duration: 8,
      ease: 'none',
    });

    // Parallax on scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, { y: self.progress * 100 });
        gsap.set(title, { y: self.progress * -50, opacity: 1 - self.progress * 1.5 });
        gsap.set(subtitle, { y: self.progress * -30, opacity: 1 - self.progress * 1.5 });
      },
    });
    triggers.push(parallaxTrigger);

    // Scroll indicator bounce
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (!config.title) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-kaleo-charcoal"
    >
      {/* Background Image with Ken Burns */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-kaleo-charcoal/40 via-transparent to-kaleo-charcoal/60" />
      </div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <a
          href="?lang=fr"
          className={`px-3 py-1 text-sm font-body transition-colors ${
            !isEnglish 
              ? 'text-kaleo-cream border-b-2 border-kaleo-terracotta' 
              : 'text-kaleo-cream/60 hover:text-kaleo-cream'
          }`}
        >
          FR
        </a>
        <span className="text-kaleo-cream/30">|</span>
        <a
          href="?lang=en"
          className={`px-3 py-1 text-sm font-body transition-colors ${
            isEnglish 
              ? 'text-kaleo-cream border-b-2 border-kaleo-terracotta' 
              : 'text-kaleo-cream/60 hover:text-kaleo-cream'
          }`}
        >
          EN
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1
          ref={titleRef}
          className="font-display text-display text-kaleo-cream text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {config.title}
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-sm md:text-base text-kaleo-cream/80 uppercase tracking-[0.3em] mt-6 text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {config.subtitle}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <a
          href="#next-section"
          className="flex flex-col items-center text-kaleo-cream/60 hover:text-kaleo-cream transition-colors"
        >
          <span className="font-body text-xs uppercase tracking-wider mb-2">
            {isEnglish ? 'Discover' : 'Découvrir'}
          </span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
