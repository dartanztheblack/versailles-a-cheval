# Kaleo Template

An editorial, earth-toned single-page website template with premium scroll-driven animations. Built with React, TypeScript, Tailwind CSS, GSAP, and Lenis smooth scrolling. Features a warm organic color palette (sand, cream, terracotta, charcoal) with serif/sans-serif typography pairing.

## Features

- **Hero Section** - Full-viewport hero with Ken Burns background, parallax scrolling, and fade-out text
- **Narrative Text** - Scroll-triggered text reveal with spinning star decorations
- **Card Stack** - Pinned scroll-driven card gallery with stacking/parallax effect
- **Breath Section** - Cinematic image banner with scale-up scroll animation and rounded corners
- **ZigZag Grid** - Alternating image/text layout with internal parallax on images
- **Footer** - Dark footer with magnetic button effect, parallax background, and contact grid

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 3 with custom theme
- GSAP (ScrollTrigger) for scroll-driven animations
- Lenis for smooth scrolling
- Lucide React for icons
- Cormorant Garamond (display) + Inter (body) fonts

## Quick Start

```bash
npm install
npm run dev
```

## Configuration

All content is managed through `src/config.ts`. Edit the exported config objects to populate the template.

### siteConfig
- `language` - HTML lang attribute (e.g., `"en"`, `"zh"`)
- `siteName` - Site name
- `siteDescription` - Site meta description

### heroConfig
- `backgroundImage` - Hero background image path
- `backgroundAlt` - Alt text for background image
- `title` - Large display title text
- `subtitle` - Smaller subtitle below title

### narrativeTextConfig
- `line1` - Main headline text (large serif)
- `line2` - Subheadline text (italic serif)
- `line3` - Body paragraph text (sans-serif)

### breathSectionConfig
- `backgroundImage` - Section background image path
- `backgroundAlt` - Alt text for background image
- `title` - Large display overlay text
- `subtitle` - Smaller subtitle below title
- `description` - Paragraph text below the image section

### cardStackConfig
- `sectionTitle` - Section heading
- `sectionSubtitle` - Section subheading
- `cards[]` - Array of card objects:
  - `id` - Unique number identifier
  - `image` - Card image path
  - `title` - Card title
  - `description` - Card description
  - `rotation` - Card tilt angle in degrees (e.g., `-2`, `1.5`)

### zigZagGridConfig
- `sectionLabel` - Small uppercase label above title
- `sectionTitle` - Section heading
- `items[]` - Array of grid items:
  - `id` - Unique string identifier
  - `title` - Item title
  - `subtitle` - Small uppercase label
  - `description` - Item description paragraph
  - `image` - Item image path
  - `imageAlt` - Alt text for image
  - `reverse` - Boolean, if true the image appears on the right

### footerConfig
- `heading` - Footer CTA heading
- `description` - Footer CTA description
- `ctaText` - CTA button label
- `contact[]` - Array of contact items (`type`, `label`, `value`, `href`)
- `locationLabel` - Address section label
- `address[]` - Array of address lines
- `socialLabel` - Social section label
- `socials[]` - Array of social links (`platform`, `href`)
- `logoText` - Large footer logo text
- `copyright` - Copyright line
- `links[]` - Array of footer links (`label`, `href`)

## Required Images

Place images in the `public/` directory:

- **Hero**: 1 full-screen background image (landscape, high-res)
- **Breath Section**: 1 wide cinematic image (16:9 or 21:9 aspect)
- **Card Stack**: 1 image per card (4:3 aspect recommended)
- **ZigZag Grid**: 1 image per grid item (4:3 aspect recommended)
- **Footer**: 1 atmospheric background image (optional, displayed at 30% opacity)

## Design

- **Color palette**: Warm sand (#EAE4D9), cream (#F3F0EB), terracotta (#8C7B6B), charcoal (#1C1C1C), earth (#2A2A2A)
- **Typography**: Cormorant Garamond (headings) + Inter (body)
- **Layout**: Single-page editorial flow, max-width 7xl container
- **Animations**: GSAP-powered scroll-triggered reveals, parallax, Ken Burns, magnetic buttons, card stacking
- **Smooth scrolling**: Lenis with GSAP ticker integration
