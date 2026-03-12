import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { footerConfig } from '../config';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Component
const MagneticButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    setIsHovered(false);
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <span className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-kaleo-cream' : ''}`}>
        {children}
      </span>
      <span
        className={`absolute inset-0 bg-kaleo-terracotta rounded-full transition-transform duration-300 ${
          isHovered ? 'scale-100' : 'scale-0'
        }`}
      />
    </button>
  );
};

const iconMap: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
};

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get language from URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'fr';
  const isEnglish = lang === 'en';

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;

    if (!section || !image || !content || !logo) return;

    // Set initial states
    gsap.set(content.children, { opacity: 0, y: 30 });
    gsap.set(logo, { opacity: 0, y: 50 });

    const triggers: ScrollTrigger[] = [];

    // Content reveal
    const contentTrigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(content.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(contentTrigger);

    // Logo reveal
    const logoTrigger = ScrollTrigger.create({
      trigger: logo,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(logo, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(logoTrigger);

    // Image parallax
    const imageTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, { y: -self.progress * 50 });
      },
    });
    triggers.push(imageTrigger);

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const handleReserve = () => {
    navigate(`/reservation?tour=1&lang=${lang}`);
  };

  if (!footerConfig.heading && !footerConfig.logoText) return null;

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-kaleo-charcoal text-kaleo-cream overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-30"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/breath-real.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kaleo-charcoal via-kaleo-charcoal/80 to-kaleo-charcoal" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Upper Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-24 md:pt-32 pb-16">
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
          >
            {/* Left Column - CTA */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-headline text-kaleo-cream">
                {isEnglish ? footerConfig.headingEn : footerConfig.heading}
              </h2>
              <p className="font-body text-sm text-kaleo-cream/60 mt-6 max-w-md leading-relaxed">
                {isEnglish ? footerConfig.descriptionEn : footerConfig.description}
              </p>
              {footerConfig.ctaText && (
                <MagneticButton 
                  onClick={handleReserve}
                  className="relative mt-8 px-8 py-4 border border-kaleo-cream/30 rounded-full font-body text-sm uppercase tracking-wider overflow-hidden transition-colors hover:border-kaleo-terracotta"
                >
                  <span className="flex items-center gap-2">
                    {isEnglish ? footerConfig.ctaTextEn : footerConfig.ctaText}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </MagneticButton>
              )}
            </div>

            {/* Right Column - Contact Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact */}
                {footerConfig.contact.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mb-4">
                      {isEnglish ? 'Contact' : 'Contact'}
                    </h4>
                    <ul className="space-y-3">
                      {footerConfig.contact.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            className="font-body text-sm text-kaleo-cream/70 hover:text-kaleo-cream transition-colors flex items-center gap-2"
                          >
                            {item.type === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Address */}
                {footerConfig.address.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mb-4">
                      {isEnglish ? footerConfig.locationLabelEn : footerConfig.locationLabel}
                    </h4>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-kaleo-cream/70 mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-kaleo-cream/70 leading-relaxed">
                        {footerConfig.address.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < footerConfig.address.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social */}
                {footerConfig.socials.length > 0 && (
                  <div>
                    <h4 className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mb-4">
                      {isEnglish ? footerConfig.socialLabelEn : footerConfig.socialLabel}
                    </h4>
                    <div className="flex gap-4">
                      {footerConfig.socials.map((social, index) => {
                        const Icon = iconMap[social.platform.toLowerCase()] || Instagram;
                        return (
                          <a
                            key={index}
                            href={social.href}
                            className="w-10 h-10 rounded-full border border-kaleo-cream/20 flex items-center justify-center hover:border-kaleo-terracotta hover:bg-kaleo-terracotta/10 transition-all"
                            aria-label={social.platform}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Large Logo */}
        {footerConfig.logoText && (
          <div
            ref={logoRef}
            className="border-t border-kaleo-cream/10 py-12 md:py-16"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
              <svg
                viewBox="0 0 400 80"
                className="w-full max-w-4xl mx-auto h-auto opacity-20"
                fill="currentColor"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="font-display"
                  style={{
                    fontSize: '72px',
                    fontFamily: 'Cormorant Garamond, serif',
                    letterSpacing: '0.05em'
                  }}
                >
                  {footerConfig.logoText}
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-kaleo-cream/10 py-6">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-kaleo-cream/40">
              {footerConfig.copyright}
            </p>
            {footerConfig.links.length > 0 && (
              <div className="flex gap-6">
                {footerConfig.links.map((link, index) => (
                  <a key={index} href={link.href} className="font-body text-xs text-kaleo-cream/40 hover:text-kaleo-cream transition-colors">
                    {isEnglish ? link.labelEn : link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
