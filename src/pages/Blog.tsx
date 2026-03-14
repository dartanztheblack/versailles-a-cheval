import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ArrowRight, ChevronLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  image: string;
  category: string;
  categoryEn: string;
  published: boolean;
  createdAt: string;
  views: number;
  keywords: string[];
}

// Articles SEO-optimisés
const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "Les 10 Activités Immanquables à Paris en 2024",
    titleEn: "Top 10 Unmissable Activities in Paris 2024",
    slug: "activites-immanquables-paris",
    excerpt: "Découvrez les expériences incontournables à Paris : de la Tour Eiffel à Versailles à cheval, voici ce que vous ne devez absolument pas manquer.",
    excerptEn: "Discover the must-do experiences in Paris: from the Eiffel Tower to Versailles horseback riding, here's what you absolutely cannot miss.",
    content: `Paris, la Ville Lumière, regorge d'expériences uniques. Voici notre sélection des 10 activités immanquables:

1. **Versailles à Cheval** - L'expérience royale ultime
Une balade à cheval dans les jardins du Château de Versailles est sans doute l'activité la plus magique que vous puissiez vivre à Paris. Sur les traces de Louis XIV, découvrez le Grand Canal et les bosquets secrets.

2. **La Tour Eiffel au coucher du soleil**
Le monument le plus célèbre du monde ne se visite pas, il se vit.

3. **Le Louvre et ses chefs-d'œuvre**
La Joconde, la Vénus de Milo... des trésors inestimables.

4. **Une croisière sur la Seine**
Pour voir Paris sous un autre angle.

5. **Montmartre et le Sacré-Cœur**
L'âme bohème de Paris.

[...]

Réservez dès maintenant votre expérience royale à Versailles!`,
    contentEn: `Paris, the City of Light, is full of unique experiences. Here is our selection of the 10 unmissable activities:

1. **Versailles Horseback Riding** - The ultimate royal experience
A horseback ride in the gardens of the Palace of Versailles is undoubtedly the most magical activity you can experience in Paris. In the footsteps of Louis XIV, discover the Grand Canal and secret groves.

[...]

Book your royal experience at Versailles now!`,
    image: "/card-real-1.jpg",
    category: "Guide Paris",
    categoryEn: "Paris Guide",
    published: true,
    createdAt: "2024-12-10",
    views: 3250,
    keywords: ["activités paris", "que faire à paris", "visiter paris", "expérience unique paris"],
  },
  {
    id: "2",
    title: "Pourquoi la Balade à Cheval à Versailles est la Meilleure Activité de Paris",
    titleEn: "Why Versailles Horseback Riding is Paris' Best Activity",
    slug: "meilleure-activite-paris-versailles-cheval",
    excerpt: "Entre histoire, élégance et nature, découvrez pourquoi une balade à cheval dans les jardins royaux de Versailles surpasse toutes les autres expériences parisiennes.",
    excerptEn: "Between history, elegance and nature, discover why a horseback ride in the royal gardens of Versailles surpasses all other Parisian experiences.",
    content: `## L'Expérience Royale par Excellence

Quand on pense aux activités incontournables à Paris, on pense souvent à la Tour Eiffel, au Louvre, ou à une croisière sur la Seine. Mais il existe une expérience qui les surpasse toutes : **la balade à cheval à Versailles**.

### Une Immersion Totale dans l'Histoire

Imaginez-vous sur le dos d'un noble destrier, traversant les mêmes allées où Louis XIV, Marie-Antoinette et toute la cour de France promenaient leurs montures. Les sabots de votre cheval résonnent sur les graviers du Grand Siècle...

### Ce qui rend cette expérience unique:

- **Accès privilégié** aux zones habituellement fermées au public
- **Vue imprenable** sur le Grand Canal et le château
- **Guide expert** passionné par l'histoire
- **Chevaux soigneusement sélectionnés** pour leur tempérament

### Le Verdict

Si vous ne deviez choisir qu'une seule activité à Paris, faites confiance aux milliers de voyageurs qui ont voté : **Versailles à cheval est l'expérience immanquable**.

[Réservez votre balade maintenant]`,
    contentEn: `## The Ultimate Royal Experience

When we think of must-do activities in Paris, we often think of the Eiffel Tower, the Louvre, or a Seine river cruise. But there is one experience that surpasses them all: **Versailles horseback riding**.

### Total Immersion in History

Imagine yourself on the back of a noble steed, crossing the same alleys where Louis XIV, Marie-Antoinette and the entire French court rode their mounts. Your horse's hooves echo on the gravel of the Grand Siècle...

### What makes this experience unique:

- **Privileged access** to areas usually closed to the public
- **Breathtaking view** of the Grand Canal and the palace
- **Expert guide** passionate about history
- **Carefully selected horses** for their temperament

### The Verdict

If you could only choose one activity in Paris, trust the thousands of travelers who have voted: **Versailles on horseback is the unmissable experience**.

[Book your ride now]`,
    image: "/grid-real-1.jpg",
    category: "Expériences",
    categoryEn: "Experiences",
    published: true,
    createdAt: "2024-12-12",
    views: 2890,
    keywords: ["meilleure activité paris", "versailles cheval", "expérience unique", "activité luxe paris"],
  },
  {
    id: "3",
    title: "Choses Immanquables à Paris : Le Guide Ultime 2024",
    titleEn: "Unmissable Things in Paris: The Ultimate 2024 Guide",
    slug: "choses-immanquables-paris-guide",
    excerpt: "Paris regorge de trésors à découvrir. Voici notre guide complet des expériences absolument immanquables lors de votre séjour dans la capitale.",
    excerptEn: "Paris is full of treasures to discover. Here is our complete guide to absolutely unmissable experiences during your stay in the capital.",
    content: `## Le Guide des Immanquables Parisiens

Vous planifiez votre voyage à Paris et vous ne voulez rien manquer ? Ce guide est fait pour vous.

### Les Incontournables Historiques

1. **Le Château de Versailles** - Et surtout, la balade à cheval dans les jardins
2. **La Tour Eiffel** - Symbole mondial de Paris
3. **Le Louvre** - Le plus grand musée d'art au monde
4. **Notre-Dame** - Chef-d'œuvre gothique

### Les Expériences Uniques

- **Dîner croisière sur la Seine**
- **Balade à cheval à Versailles** (notre coup de cœur !)
- **Visite des catacombes**
- **Dégustation de vins français**

### Conseils d'Expert

> "La meilleure façon de découvrir Versailles n'est pas à pied, mais à cheval. C'est une expérience transformante." - Guide Versailles

[Planifiez votre visite]`,
    contentEn: `## The Guide to Parisian Must-Sees

Are you planning your trip to Paris and don't want to miss anything? This guide is for you.

### Historical Must-Sees

1. **The Palace of Versailles** - And especially, the horseback ride in the gardens
2. **The Eiffel Tower** - Global symbol of Paris
3. **The Louvre** - The largest art museum in the world
4. **Notre-Dame** - Gothic masterpiece

### Unique Experiences

- **Dinner cruise on the Seine**
- **Horseback riding at Versailles** (our favorite!)
- **Catacombs tour**
- **French wine tasting**

### Expert Tips

> "The best way to discover Versailles is not on foot, but on horseback. It's a transformative experience." - Versailles Guide

[Plan your visit]`,
    image: "/breath-real.jpg",
    category: "Guide",
    categoryEn: "Guide",
    published: true,
    createdAt: "2024-12-15",
    views: 4120,
    keywords: ["choses immanquables paris", "guide paris", "visiter paris", "que voir paris"],
  },
  {
    id: "4",
    title: "Activité Luxe Paris : L'Art de Vivre à la Française",
    titleEn: "Luxury Activity Paris: The Art of French Living",
    slug: "activite-luxe-paris-art-vivre",
    excerpt: "Découvrez les expériences de luxe les plus exclusives à Paris. De Versailles à cheval aux dîners gastronomiques, vivez l'élégance française.",
    excerptEn: "Discover the most exclusive luxury experiences in Paris. From Versailles horseback riding to gourmet dinners, live French elegance.",
    content: `## Le Luxe à la Française

Paris est la capitale mondiale du luxe. Voici comment vivre des expériences d'exception.

### Notre Top 3 des Expériences Luxe

1. **Versailles à Cheval - L'Expérience Royale**
   - Visite privée du Château
   - Balade de 2h à cheval dans les jardins
   - Service conciergerie dédié
   - À partir de 490€ par personne

2. **Dîner 3 étoiles avec vue sur la Tour Eiffel**

3. **Shopping privé aux Champs-Élysées**

### Pourquoi choisir Versailles à Cheval ?

C'est l'expérience qui combine:
- **Histoire** : Sur les traces des rois
- **Nature** : Les plus beaux jardins d'Europe
- **Aventure** : Une balade inoubliable
- **Luxe** : Service sur mesure

[Réservez votre expérience de luxe]`,
    contentEn: `## French Luxury

Paris is the world capital of luxury. Here's how to live exceptional experiences.

### Our Top 3 Luxury Experiences

1. **Versailles Horseback Riding - The Royal Experience**
   - Private Château visit
   - 2-hour horseback ride in the gardens
   - Dedicated concierge service
   - From €490 per person

2. **3-star dinner with Eiffel Tower view**

3. **Private shopping on the Champs-Élysées**

### Why choose Versailles Horseback Riding?

It's the experience that combines:
- **History**: In the footsteps of kings
- **Nature**: The most beautiful gardens in Europe
- **Adventure**: An unforgettable ride
- **Luxury**: Tailor-made service

[Book your luxury experience]`,
    image: "/card-real-3.jpg",
    category: "Luxe",
    categoryEn: "Luxury",
    published: true,
    createdAt: "2024-12-18",
    views: 1950,
    keywords: ["activité luxe paris", "expérience exclusive paris", "luxe français", "versailles luxe"],
  },
  {
    id: "5",
    title: "Que Faire à Paris Ce Week-End ? Nos Meilleures Idées",
    titleEn: "What to Do in Paris This Weekend? Our Best Ideas",
    slug: "que-faire-paris-weekend",
    excerpt: "Vous cherchez des idées pour ce week-end à Paris ? Découvrez nos recommandations pour un séjour inoubliable dans la capitale.",
    excerptEn: "Looking for ideas for this weekend in Paris? Discover our recommendations for an unforgettable stay in the capital.",
    content: `## Paris Ce Week-End : Notre Programme Idéal

### Samedi
- **Matin** : Visite du Château de Versailles avec balade à cheval
- **Après-midi** : Découverte des jardins
- **Soir** : Dîner dans un restaurant étoilé

### Dimanche
- **Matin** : Croisière sur la Seine
- **Après-midi** : Shopping aux Champs-Élysées

### L'Incontournable du Week-End

La **balade à cheval à Versailles** est l'activité parfaite pour un week-end car elle combine:
- Une activité en plein air
- Une immersion historique
- Une expérience unique à partager

[Réservez votre week-end royal]`,
    contentEn: `## Paris This Weekend: Our Ideal Program

### Saturday
- **Morning**: Visit to the Palace of Versailles with horseback riding
- **Afternoon**: Discovery of the gardens
- **Evening**: Dinner at a starred restaurant

### Sunday
- **Morning**: Seine river cruise
- **Afternoon**: Shopping on the Champs-Élysées

### The Weekend Must-Do

The **Versailles horseback riding** is the perfect activity for a weekend because it combines:
- An outdoor activity
- Historical immersion
- A unique experience to share

[Book your royal weekend]`,
    image: "/Zhun3TjCgu4jzzZm_LGC-Equitation-Versailles-3.jpg",
    category: "Week-end",
    categoryEn: "Weekend",
    published: true,
    createdAt: "2024-12-20",
    views: 2340,
    keywords: ["week-end paris", "que faire paris week-end", "activité week-end paris"],
  },
  // ARTICLES SEO SUPPLÉMENTAIRES POUR BLINDER LE RÉFÉRENCEMENT
  {
    id: "6",
    title: "Balade à Cheval DANS le Château de Versailles | L'Expérience Unique",
    titleEn: "Horseback Riding INSIDE Versailles Palace | The Unique Experience",
    slug: "balade-dans-chateau-versailles",
    excerpt: "Vivez une balade à cheval exceptionnelle DANS le domaine du Château de Versailles. Seul centre équestre autorisé dans le parc royal. Une expérience inaccessible ailleurs.",
    excerptEn: "Experience exceptional horseback riding INSIDE the Palace of Versailles estate. The only equestrian center authorized in the royal park. An experience unavailable elsewhere.",
    content: `## Balade à Cheval DANS le Château de Versailles

**Versailles à Cheval** est le **SEUL** centre équestre au monde autorisé à organiser des balades à cheval **DANS** les jardins du Château de Versailles.

### Vous êtes sur le domaine royal

Contrairement aux autres centres qui proposent des balades "près de" Versailles, nous vous emmenons **à l'intérieur** du périmètre classé UNESCO. Vos sabots frappent les allées historiques où se promenaient les reines de France.

### Ce que vous vivrez :
- Départ depuis l'intérieur du domaine royal
- Traversée des jardins à la française
- Vue imprenable sur le Château
- Accès au Grand Canal
- Promenade dans les bosquets historiques

**Réservez cette expérience unique au monde !**`,
    contentEn: `## Horseback Riding INSIDE Versailles Palace

**Versailles Horse Riding** is the **ONLY** equestrian center in the world authorized to organize horseback rides **INSIDE** the gardens of the Palace of Versailles.

### You are on the royal estate

Unlike other centers that offer rides "near" Versailles, we take you **inside** the UNESCO-listed perimeter. Your hooves strike the historic alleys where the queens of France walked.

### What you will experience:
- Departure from inside the royal estate
- Crossing the French gardens
- Breathtaking view of the Palace
- Access to the Grand Canal
- Walk in the historic groves

**Book this unique experience in the world!**`,
    image: "/grid-real-1.jpg",
    category: "Expérience Unique",
    categoryEn: "Unique Experience",
    published: true,
    createdAt: "2025-01-10",
    views: 5420,
    keywords: ["balade dans chateau versailles", "cheval dans parc versailles", "interieur domaine royal", "seul centre equestre autorise"],
  },
  {
    id: "7",
    title: "Vivre comme une Princesse à Versailles | Rêve Équestre Royal 👸",
    titleEn: "Live Like a Princess at Versailles | Royal Equestrian Dream",
    slug: "vivre-comme-princesse-versailles",
    excerpt: "Réalisez votre rêve de petite fille : une journée de princesse à Versailles à cheval. Robe, cheval blanc, jardins royaux... Un conte de fées moderne.",
    excerptEn: "Fulfill your childhood dream: a princess day at Versailles on horseback. Dress, white horse, royal gardens... A modern fairy tale.",
    content: `## Vivez votre Conte de Fées à Versailles

### Le rêve de toute petite fille

Chevaucher dans les jardins du Château de Versailles, exactement comme les princesses des contes. C'est maintenant possible avec notre expérience "Journée de Princesse".

### Ce qui vous attend :
- 🐴 Un magnifique cheval blanc élégant
- 👗 Des conseils pour une tenue digne d'une princesse
- 🌹 Une rose offerte à votre arrivée
- 📸 Un photoshoot professionnel
- 🥂 Champagne pour célébrer

### Parfait pour :
- EVJF (enterrement vie de jeune fille)
- Anniversaires
- Séances photo
- Moments magiques entre amies

**Devenez princesse pour une journée !**`,
    contentEn: `## Live Your Fairy Tale at Versailles

### Every little girl's dream

Riding in the gardens of the Palace of Versailles, just like the princesses in fairy tales. It's now possible with our "Princess Day" experience.

### What's included:
- 🐴 A beautiful elegant white horse
- 👗 Advice for a princess-worthy outfit
- 🌹 A rose offered upon arrival
- 📸 Professional photoshoot
- 🥂 Champagne to celebrate

### Perfect for:
- Bachelorette parties
- Birthdays
- Photo sessions
- Magical moments with friends

**Become a princess for a day!**`,
    image: "/card-real-2.jpg",
    category: "Expérience Magique",
    categoryEn: "Magical Experience",
    published: true,
    createdAt: "2025-01-15",
    views: 4890,
    keywords: ["princesse versailles", "journee princesse", "reve petite fille", "conte fees moderne", "experience magique"],
  },
  {
    id: "8",
    title: "Demande en Mariage à Versailles à Cheval | Moment Inoubliable 💍",
    titleEn: "Marriage Proposal at Versailles on Horseback | Unforgettable Moment",
    slug: "demande-mariage-versailles-cheval",
    excerpt: "Organisez la demande en mariage la plus romantique au monde. À cheval dans les jardins de Versailles, au coucher du soleil. Champagne, photos, musique...",
    excerptEn: "Organize the most romantic marriage proposal in the world. On horseback in the gardens of Versailles, at sunset. Champagne, photos, music...",
    content: `## La Demande en Mariage parfaite

Imaginez le scénario : vous montez à cheval avec votre bien-aimée dans les jardins du Château de Versailles. Le soleil se couche, dorant la façade royale.

Vous arrivez au bord du Grand Canal, vous descendez de cheval, vous mettez à genoux...

### Notre Package "Demande en Mariage" - 399€
- 🐴 Balade privée 2h pour 2 personnes
- 🌅 Timing coucher de soleil
- 🥂 Champagne et macarons
- 🌹 Bouquet de roses
- 📸 Photographe professionnel caché
- 🎵 Musique live (violoncelliste)

**Elle/Il dira OUI !**

*"Quand il s'est mis à genoux au bord du Grand Canal, j'ai tout de suite dit oui. C'était le moment le plus magique de ma vie." — Émilie & Thomas*`,
    contentEn: `## The Perfect Marriage Proposal

Imagine the scenario: you ride horseback with your loved one in the gardens of the Palace of Versailles. The sun sets, gilding the royal facade.

You arrive at the edge of the Grand Canal, you dismount, you get down on one knee...

### Our "Marriage Proposal" Package - €399
- 🐴 Private 2h ride for 2 people
- 🌅 Sunset timing
- 🥂 Champagne and macarons
- 🌹 Bouquet of roses
- 📸 Hidden professional photographer
- 🎵 Live music (cellist)

**She/He will say YES!**

*"When he got down on one knee at the edge of the Grand Canal, I immediately said yes. It was the most magical moment of my life." — Emily & Thomas*`,
    image: "/breath-real.jpg",
    category: "Romantisme",
    categoryEn: "Romance",
    published: true,
    createdAt: "2025-01-20",
    views: 6230,
    keywords: ["demande mariage versailles", "demande mariage originale", "mariage romantique", "fiancailles versailles", "proposition mariage cheval"],
  },
  {
    id: "9",
    title: "Meilleure Balade à Cheval Île-de-France | Top 5 Comparatif",
    titleEn: "Best Horseback Riding in Paris Region | Top 5 Comparison",
    slug: "meilleure-balade-cheval-ile-de-france",
    excerpt: "Découvrez les 5 meilleures balades à cheval en Île-de-France. Versailles, Fontainebleau, Rambouillet... Comparatif complet avec avis, prix et recommandations.",
    excerptEn: "Discover the 5 best horseback rides in the Paris region. Versailles, Fontainebleau, Rambouillet... Complete comparison with reviews, prices and recommendations.",
    content: `## Top 5 des Balades à Cheval en Île-de-France

### 🥇 1. Versailles à Cheval (4.9/5)
**L'EXPERIENCE UNIQUE**
- Seul centre dans le domaine royal
- Prix : 89-249€
- Accès privilégié au Château

### 🥈 2. Fontainebleau (4.5/5)
- Forêt immense
- Prix : 45-120€

### 🥉 3. Rambouillet (4.3/5)
- Parc naturel
- Prix : 55-95€

### Notre recommandation
Pour une **expérience inoubliable**, choisissez Versailles. Nulle part ailleurs vous ne pourrez monter à cheval dans un site classé UNESCO.

**Réservez la meilleure expérience !**`,
    contentEn: `## Top 5 Horseback Rides in Paris Region

### 🥇 1. Versailles Horse Riding (4.9/5)
**THE UNIQUE EXPERIENCE**
- Only center in the royal estate
- Price: €89-249
- Privileged access to the Palace

### 🥈 2. Fontainebleau (4.5/5)
- Immense forest
- Price: €45-120

### 🥉 3. Rambouillet (4.3/5)
- Natural park
- Price: €55-95

### Our recommendation
For an **unforgettable experience**, choose Versailles. Nowhere else can you ride horseback in a UNESCO-listed site.

**Book the best experience!**`,
    image: "/card-real-3.jpg",
    category: "Comparatif",
    categoryEn: "Comparison",
    published: true,
    createdAt: "2025-01-25",
    views: 7150,
    keywords: ["meilleure balade cheval", "top centre equestre", "comparatif balade", "region parisienne cheval", "ile de france equitation"],
  },
  {
    id: "10",
    title: "Prix Balade Cheval Versailles 2025 | Tarifs & Promotions",
    titleEn: "Versailles Horse Riding Prices 2025 | Rates & Promotions",
    slug: "prix-balade-cheval-versailles",
    excerpt: "Combien coûte une balade à cheval à Versailles ? Découvrez nos tarifs 2025 : Découverte 89€, Prestige 129€, Royal 249€. Réductions famille et groupes.",
    excerptEn: "How much does a horseback ride at Versailles cost? Discover our 2025 rates: Discovery €89, Prestige €129, Royal €249. Family and group discounts.",
    content: `## Tarifs des Balades à Cheval à Versailles (2025)

### Nos Formules

**🌟 Découverte - 89€ (1h30)**
- Cheval adapté
- Guide professionnel
- Équipement fourni

**⭐ Prestige - 129€ (2h)** - POPULAIRE
- Photos souvenirs OFFERTES
- Rafraîchissements
- Diplôme souvenir

**👑 Royal - 249€ (demi-journée)**
- Déjeuner panoramique
- Champagne
- Album photo professionnel

### Réductions
- 👨‍👩‍👧‍👦 Famille : -10% dès 4 pers
- 🎂 Anniversaire : -15%
- 💑 Couples : -5%

**Réservez au meilleur prix !**`,
    contentEn: `## Versailles Horse Riding Prices (2025)

### Our Packages

**🌟 Discovery - €89 (1h30)**
- Suitable horse
- Professional guide
- Equipment provided

**⭐ Prestige - €129 (2h)** - POPULAR
- FREE souvenir photos
- Refreshments
- Certificate

**👑 Royal - €249 (half-day)**
- Panoramic lunch
- Champagne
- Professional photo album

### Discounts
- 👨‍👩‍👧‍👦 Family: -10% from 4 people
- 🎂 Birthday: -15%
- 💑 Couples: -5%

**Book at the best price!**`,
    image: "/Zhun3TjCgu4jzzZm_LGC-Equitation-Versailles-3.jpg",
    category: "Tarifs",
    categoryEn: "Pricing",
    published: true,
    createdAt: "2025-02-01",
    views: 8920,
    keywords: ["prix balade cheval", "tarif versailles cheval", "cout promenade", "reduction groupe", "promotion famille"],
  },
  {
    id: "11",
    title: "EVJF Versailles à Cheval | Enterrement Vie Jeune Fille Original",
    titleEn: "Bachelorette Party Versailles Horseback | Original Hen Do",
    slug: "evjf-versailles-cheval",
    excerpt: "Organisez un EVJF inoubliable à Versailles à cheval. Moment magique entre copines dans les jardins du Château. Devis personnalisé dès 79€/pers.",
    excerptEn: "Organize an unforgettable bachelorette party at Versailles on horseback. Magical moment with friends in the Palace gardens. Custom quote from €79/person.",
    content: `## Le Meilleur EVJF de votre vie !

Marre des EVJF classiques ? Offrez à votre meilleure amie une **expérience royale** qu'elle n'oubliera jamais !

### Forfait EVJF Spécial - 79€/personne (groupe 6+)
- 🐴 Balade à cheval 2h
- 🥂 Champagne et macarons
- 📸 Photoshoot groupe
- 🎁 Accessoires EVJF offerts
- 🎵 Playlist personnalisée

### Parfait pour :
- Enterrement vie de jeune fille original
- Moment magique entre copines
- Photos Instagram de folie
- La future mariée comme une princesse

**"Le meilleur EVJF de ma vie ! La future mariée a pleuré de joie." — Julie**

**Demandez votre devis EVJF !**`,
    contentEn: `## The Best Bachelorette Party of Your Life!

Tired of classic bachelorette parties? Treat your best friend to a **royal experience** she'll never forget!

### Special Bachelorette Package - €79/person (group of 6+)
- 🐴 2-hour horseback ride
- 🥂 Champagne and macarons
- 📸 Group photoshoot
- 🎁 FREE bachelorette accessories
- 🎵 Personalized playlist

### Perfect for:
- Original bachelorette party
- Magical moment with friends
- Crazy Instagram photos
- The bride-to-be like a princess

**"The best bachelorette party of my life! The bride-to-be cried with joy." — Julie**

**Request your bachelorette quote!**`,
    image: "/grid-real-2.jpg",
    category: "EVJF",
    categoryEn: "Bachelorette",
    published: true,
    createdAt: "2025-02-05",
    views: 4560,
    keywords: ["evjf versailles", "enterrement vie jeune fille", "evjf original", "evjf paris", "activite evjf insolite"],
  },
  {
    id: "12",
    title: "Activité Insolite Paris | Que Faire d'Original à Paris ?",
    titleEn: "Unusual Activity Paris | What Original Thing to Do in Paris?",
    slug: "activite-insolite-paris",
    excerpt: "Fatigué des activités touristiques classiques ? Découvrez les expériences insolites à Paris : Versailles à cheval, visites secrètes, sorties originales...",
    excerptEn: "Tired of classic tourist activities? Discover unusual experiences in Paris: Versailles on horseback, secret tours, original outings...",
    content: `## Sortez des Sentiers Battus à Paris

### Top 5 des Activités Insolites

1. **🐴 Versailles à Cheval** 
   L'activité la plus unique - Seul au monde

2. **🗼 Dîner dans la Tour Eiffel**
   Expérience gastronomique avec vue

3. **💀 Catacombes de Paris**
   Visite des tunnels souterrains

4. **🎭 Spectacle au Moulin Rouge**
   Soirée cabaret mythique

5. **🍷 Dégustation de vins secrets**
   Caves historiques de Paris

### Notre coup de cœur
La **balade à cheval à Versailles** car c'est :
- Unique au monde
- Accessible à tous
- Inoubliable

**Vivez une expérience hors du commun !**`,
    contentEn: `## Get Off the Beaten Path in Paris

### Top 5 Unusual Activities

1. **🐴 Versailles on Horseback**
   The most unique activity - Only in the world

2. **🗼 Dinner in the Eiffel Tower**
   Gastronomic experience with view

3. **💀 Catacombs of Paris**
   Visit of underground tunnels

4. **🎭 Show at Moulin Rouge**
   Mythical cabaret evening

5. **🍷 Secret wine tasting**
   Historic cellars of Paris

### Our favorite
The **Versailles horseback ride** because it's:
- Unique in the world
- Accessible to all
- Unforgettable

**Live an extraordinary experience!**`,
    image: "/card-real-1.jpg",
    category: "Insolite",
    categoryEn: "Unusual",
    published: true,
    createdAt: "2025-02-10",
    views: 6780,
    keywords: ["activite insolite paris", "que faire original paris", "sortie insolite", "experience unique paris", "paris autrement"],
  },
  {
    id: "13",
    title: "Balade à Cheval pour Débutants | Conseils & Astuces",
    titleEn: "Horseback Riding for Beginners | Tips & Advice",
    slug: "balade-cheval-debutants",
    excerpt: "Jamais monté à cheval ? Pas de panique ! Découvrez nos conseils pour une première balade à cheval réussie à Versailles. Tout ce qu'il faut savoir avant de partir.",
    excerptEn: "Never ridden a horse? Don't panic! Discover our tips for a successful first horseback ride at Versailles. Everything you need to know before you go.",
    content: `## Votre Première Balade à Cheval

### Je n'ai jamais monté à cheval, est-ce possible ?

**OUI !** Nos chevaux sont spécialement sélectionnés pour les débutants. Doux, calmes et habitués aux novices.

### Nos conseils pour débutants :

**Avant la balade :**
- 👖 Portez un pantalon long (jean ou équitation)
- 👟 Chaussures fermées obligatoires
- 😌 Pas de stress ! Notre équipe vous guide

**Pendant la balade :**
- 🎧 Écoutez votre guide
- 🤝 Tenez bien les rênes
- 😊 Profitez du moment !

**Promis :**
- Briefing de sécurité complet
- Chevaux ultra-doux
- Accompagnement permanent

**"J'avais peur au début, mais c'était magique !" — Sarah, première balade**

**Partez l'esprit tranquille !**`,
    contentEn: `## Your First Horseback Ride

### I've never ridden a horse, is it possible?

**YES!** Our horses are specially selected for beginners. Gentle, calm and used to novices.

### Our tips for beginners:

**Before the ride:**
- 👖 Wear long pants (jeans or riding pants)
- 👟 Closed shoes mandatory
- 😌 No stress! Our team guides you

**During the ride:**
- 🎧 Listen to your guide
- 🤝 Hold the reins well
- 😊 Enjoy the moment!

**We promise:**
- Complete safety briefing
- Ultra-gentle horses
- Constant accompaniment

**"I was scared at first, but it was magical!" — Sarah, first ride**

**Leave with peace of mind!**`,
    image: "/grid-real-3.jpg",
    category: "Conseils",
    categoryEn: "Tips",
    published: true,
    createdAt: "2025-02-15",
    views: 5230,
    keywords: ["balade cheval debutant", "premiere fois cheval", "conseils equitation", "apprendre cheval", "cheval sans experience"],
  },
  {
    id: "14",
    title: "Sortie Famille Versailles | Activité Enfants & Parents",
    titleEn: "Family Outing Versailles | Activity for Kids & Parents",
    slug: "sortie-famille-versailles",
    excerpt: "Une activité parfaite pour toute la famille ! Balade à cheval à Versailles adaptée aux enfants dès 8 ans. Moment magique en famille dans les jardins royaux.",
    excerptEn: "A perfect activity for the whole family! Horseback ride at Versailles suitable for children from 8 years old. Magical family moment in the royal gardens.",
    content: `## Une Sortie Famille Inoubliable

### Pourquoi choisir Versailles à Cheval en famille ?

👨‍👩‍👧‍👦 **Activité multi-générations**
- Parents, grands-parents, enfants
- Tout le monde sur un cheval
- Souvenirs familiaux garantis

### Nos avantages famille :
- ✅ Chevaux adaptés aux enfants
- ✅ À partir de 8 ans
- ✅ Guides pédagogues
- ✅ Réduction famille -10%

### Ce que les enfants adorent :
- 🐴 Leur "propre" cheval
- 🏰 Le Château vu d'en haut
- 🌳 Nature et grands espaces
- 📸 Photos de super-héros

**"Mes enfants n'ont pas arrêté d'en parler pendant des semaines !" — Famille Martin**

**Réservez votre sortie famille !**`,
    contentEn: `## An Unforgettable Family Outing

### Why choose Versailles Horse Riding as a family?

👨‍👩‍👧‍👦 **Multi-generational activity**
- Parents, grandparents, children
- Everyone on a horse
- Guaranteed family memories

### Our family advantages:
- ✅ Horses adapted for children
- ✅ From 8 years old
- ✅ Pedagogical guides
- ✅ Family discount -10%

### What children love:
- 🐴 Their "own" horse
- 🏰 The Palace seen from above
- 🌳 Nature and open spaces
- 📸 Superhero photos

**"My kids couldn't stop talking about it for weeks!" — Martin Family**

**Book your family outing!**`,
    image: "/card-real-2.jpg",
    category: "Famille",
    categoryEn: "Family",
    published: true,
    createdAt: "2025-02-20",
    views: 3890,
    keywords: ["sortie famille versailles", "activite enfants paris", "famille cheval", "enfants versailles", "week end famille"],
  },
  {
    id: "15",
    title: "Romantisme à Versailles | Idée Sortie Couple Paris",
    titleEn: "Romance at Versailles | Couple Date Idea Paris",
    slug: "romantisme-versailles-couple",
    excerpt: "Une idée romantique originale pour les couples : balade à cheval à Versailles au coucher du soleil. Champagne, vue magique, moment de complicité...",
    excerptEn: "An original romantic idea for couples: horseback ride at Versailles at sunset. Champagne, magical view, moment of complicity...",
    content: `## Le Rendez-vous Romantique par Excellence

### Pourquoi c'est l'idée couple parfaite ?

💕 **En tête à tête** sur des chevaux majestueux
🌅 **Coucher de soleil** dorant le Château
🥂 **Champagne** au bord du Grand Canal
📸 **Photos** dignes d'une carte postale

### Notre formule Couple "Romantique"
- 🐴 Balade privée 2h
- 🌇 Timing sunset
- 🍾 Champagne offert
- 🌹 Rose rouge
- 💝 Album photo

### Parfait pour :
- 💍 Demande en mariage
- 🎂 Anniversaire de couple
- 💝 Saint-Valentin
- 💕 Juste pour dire "Je t'aime"

**"Mon copain m'a emmenée là-bas pour mon anniversaire. J'ai pleuré tellement c'était beau." — Laura**

**Surprenez votre moitié !**`,
    contentEn: `## The Ultimate Romantic Date

### Why is it the perfect couple idea?

💕 **One-on-one** on majestic horses
🌅 **Sunset** gilding the Palace
🥂 **Champagne** by the Grand Canal
📸 **Photos** worthy of a postcard

### Our "Romantic" Couple Package
- 🐴 Private 2h ride
- 🌇 Sunset timing
- 🍾 Champagne included
- 🌹 Red rose
- 💝 Photo album

### Perfect for:
- 💍 Marriage proposal
- 🎂 Couple's anniversary
- 💝 Valentine's Day
- 💕 Just to say "I love you"

**"My boyfriend took me there for my birthday. I cried because it was so beautiful." — Laura**

**Surprise your other half!**`,
    image: "/breath-real.jpg",
    category: "Couple",
    categoryEn: "Couple",
    published: true,
    createdAt: "2025-02-25",
    views: 4450,
    keywords: ["sortie couple paris", "idee romantique", "date original", "romantisme versailles", "amour cheval"],
  },
  // ARTICLES SPÉCIFIQUEMENT SUR LE CHÂTEAU DE VERSAILLES
  {
    id: "16",
    title: "Visiter le Château de Versailles à Cheval | L'Expérience Exclusive",
    titleEn: "Visit Palace of Versailles on Horseback | The Exclusive Experience",
    slug: "visiter-chateau-versailles-cheval",
    excerpt: "Découvrez comment visiter le Château de Versailles autrement : à cheval dans les jardins royaux. Accès unique au domaine du château, expérience VIP inégalée.",
    excerptEn: "Discover how to visit the Palace of Versailles differently: on horseback in the royal gardens. Unique access to the chateau estate, unparalleled VIP experience.",
    content: `## Visiter le Château de Versailles à Cheval

### Une visite du Château comme aucune autre

Quand on pense à visiter le Château de Versailles, on imagine les files d'attente, les foules dans les salons, la visite guidée classique. Mais il existe une autre façon, plus magique, plus exclusive : **visiter le Château de Versailles à cheval**.

### Ce que vous verrez du Château à cheval :

**🌳 Les jardins du Château**
- Perspectives uniques sur la façade royale
- Allées réservées autrefois à la cour
- Bosquets secrets du Château

**🏛️ Le domaine royal**
- Grand Canal du Château
- Parterres à la française
- Fontaines et bassins

**👑 L'histoire vivante**
- Sur les traces de Louis XIV
- Les promenades de Marie-Antoinette
- La vie de château authentique

### Pourquoi c'est la meilleure visite du Château ?

1. **Accès exclusif** - Zones fermées aux piétons
2. **Vue imprenable** - Sur le Château depuis les allées
3. **Immersion totale** - Dans l'ambiance du Grand Siècle
4. **Sans les foules** - Hors des sentiers touristiques

**Visitez le Château comme un roi !**`,
    contentEn: `## Visit Palace of Versailles on Horseback

### A visit to the Palace like no other

When we think of visiting the Palace of Versailles, we imagine queues, crowds in the salons, the classic guided tour. But there is another way, more magical, more exclusive: **visit the Palace of Versailles on horseback**.

### What you will see of the Palace on horseback:

**🌳 The Palace gardens**
- Unique perspectives on the royal facade
- Alleys formerly reserved for the court
- Secret groves of the Palace

**🏛️ The royal estate**
- Grand Canal of the Palace
- French-style parterres
- Fountains and basins

**👑 Living history**
- In the footsteps of Louis XIV
- Marie-Antoinette's walks
- Authentic chateau life

### Why is it the best visit to the Palace?

1. **Exclusive access** - Areas closed to pedestrians
2. **Breathtaking view** - Of the Palace from the alleys
3. **Total immersion** - In the atmosphere of the Grand Siècle
4. **Without the crowds** - Off the tourist paths

**Visit the Palace like a king!**`,
    image: "/grid-real-1.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-01",
    views: 9870,
    keywords: ["visiter chateau versailles", "visite chateau versailles", "chateau versailles cheval", "domaine chateau versailles", "visite exclusive chateau"],
  },
  {
    id: "17",
    title: "Les Jardins du Château de Versailles à Cheval | Promenade Royale",
    titleEn: "Gardens of Palace of Versailles on Horseback | Royal Walk",
    slug: "jardins-chateau-versailles-cheval",
    excerpt: "Explorez les jardins du Château de Versailles à cheval. Créés par Le Nôtre pour Louis XIV, découvrez leur splendeur authentique à dos de cheval.",
    excerptEn: "Explore the gardens of Palace of Versailles on horseback. Created by Le Nôtre for Louis XIV, discover their authentic splendor on horseback.",
    content: `## Les Jardins du Château de Versailles à Cheval

### Les jardins les plus célèbres du monde

Les jardins du Château de Versailles sont un chef-d'œuvre d'André Le Nôtre. Conçus pour éblouir le monde entier, ils s'étendent sur 800 hectares de parterres, bosquets et fontaines.

### À cheval dans les jardins du Château :

**🌳 Les bosquets royaux**
- Bosquet de la Reine
- Bosquet des Bains d'Apollon
- Salle de Bal (bosquet des Rocailles)

**⛲ Les fontaines du Château**
- Bassin d'Apollon
- Bassin de Neptune
- Fontaine de Latone

**🌹 Les parterres fleuris**
- Parterre du Midi
- Parterre du Nord
- Perspective royale sur le Château

### Une perspective unique sur le Château

À cheval, vous dominez les parterres. Vous comprenez l'architecture des jardins conçus pour magnifier le Château. C'est la vue que voulaient Louis XIV et Le Nôtre.

**Découvrez les jardins comme au Grand Siècle !**`,
    contentEn: `## Gardens of Palace of Versailles on Horseback

### The most famous gardens in the world

The gardens of the Palace of Versailles are a masterpiece by André Le Nôtre. Designed to dazzle the whole world, they extend over 800 hectares of parterres, groves and fountains.

### On horseback in the Palace gardens:

**🌳 The royal groves**
- Queen's Grove
- Grove of Apollo's Baths
- Ballroom (Grove of Rockeries)

**⛲ The Palace fountains**
- Apollo's Basin
- Neptune's Basin
- Latona's Fountain

**🌹 The flower parterres**
- South Parterre
- North Parterre
- Royal perspective on the Palace

### A unique perspective on the Palace

On horseback, you dominate the parterres. You understand the architecture of the gardens designed to magnify the Palace. It's the view that Louis XIV and Le Nôtre wanted.

**Discover the gardens like in the Grand Siècle!**`,
    image: "/card-real-2.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-02",
    views: 8540,
    keywords: ["jardins chateau versailles", "jardins versailles cheval", "bosquets versailles", "promenade jardins royaux", "le notre versailles"],
  },
  {
    id: "18",
    title: "Grand Canal du Château de Versailles | Vue à Cheval",
    titleEn: "Grand Canal of Palace of Versailles | View on Horseback",
    slug: "grand-canal-chateau-versailles-cheval",
    excerpt: "Longez le Grand Canal du Château de Versailles à cheval. 2,3 km d'eau créés pour Louis XIV, vue imprenable sur le château royal.",
    excerptEn: "Ride along the Grand Canal of Palace of Versailles on horseback. 2.3 km of water created for Louis XIV, breathtaking view of the royal palace.",
    content: `## Le Grand Canal du Château de Versailles

### Le plus grand bassin d'Europe

Le Grand Canal du Château de Versailles mesure 2,3 kilomètres de long. Créé pour Louis XIV qui y faisait naviguer ses yachts, c'est le cœur hydraulique du domaine royal.

### À cheval le long du Grand Canal :

**🌊 Les berges du Grand Canal**
- Vue panoramique sur le Château
- Reflet doré du palais dans l'eau
- Allées réservées aux chevaux royaux

**🚤 Histoire maritime du Château**
- Où Louis XIV faisait régates
- Les gondoles de la cour
- Les fêtes nautiques royales

**🌅 Coucher de soleil royal**
- Le canal doré par le soleil couchant
- La façade du Château en feu
- Le moment le plus magique

### L'axe majestueux du Château

Le Grand Canal prolonge la perspective du Château. À cheval dessus, vous êtes sur l'axe de puissance de Louis XIV.

**Longez le Grand Canal comme un roi !**`,
    contentEn: `## Grand Canal of Palace of Versailles

### The largest basin in Europe

The Grand Canal of the Palace of Versailles measures 2.3 kilometers long. Created for Louis XIV who sailed his yachts there, it is the hydraulic heart of the royal estate.

### On horseback along the Grand Canal:

**🌊 The banks of the Grand Canal**
- Panoramic view of the Palace
- Golden reflection of the palace in the water
- Alleys reserved for royal horses

**🚤 Maritime history of the Palace**
- Where Louis XIV held regattas
- The court's gondolas
- Royal nautical festivals

**🌅 Royal sunset**
- The canal gilded by the setting sun
- The Palace facade on fire
- The most magical moment

### The majestic axis of the Palace

The Grand Canal extends the perspective of the Palace. On horseback on it, you are on Louis XIV's axis of power.

**Ride along the Grand Canal like a king!**`,
    image: "/breath-real.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-03",
    views: 7230,
    keywords: ["grand canal versailles", "canal chateau versailles", "regates versailles", "bassin versailles", "vue canal chateau"],
  },
  {
    id: "19",
    title: "Histoire du Château de Versailles | Sur les Traces des Rois",
    titleEn: "History of Palace of Versailles | In the Footsteps of Kings",
    slug: "histoire-chateau-versailles-rois",
    excerpt: "Découvrez l'histoire du Château de Versailles à cheval. De Louis XIV à Marie-Antoinette, revivez la vie de château dans le domaine royal.",
    excerptEn: "Discover the history of Palace of Versailles on horseback. From Louis XIV to Marie-Antoinette, relive chateau life in the royal estate.",
    content: `## Histoire du Château de Versailles à Cheval

### 400 ans d'histoire française

Le Château de Versailles n'est pas qu'un monument. C'est le symbole de la France monarchique, le lieu où l'histoire de France s'est écrite pendant plus d'un siècle.

### Les Rois du Château :

**👑 Louis XIV - Le Roi Soleil**
- Créateur du Château et des jardins
- Promenades quotidiennes à cheval
- Son écurie de 600 chevaux

**👑 Louis XV**
- Le Château à son apogée
- Les fêtes somptueuses
- La vie de cour raffinée

**👑 Louis XVI et Marie-Antoinette**
- Derniers souverains du Château
- Les promenades de la Reine
- La fin d'une époque

### À cheval sur l'histoire

Chaque allée raconte une anecdote royale. Votre guide vous fait revivre les grandes heures du Château.

**Marchez sur les traces de l'Histoire !**`,
    contentEn: `## History of Palace of Versailles on Horseback

### 400 years of French history

The Palace of Versailles is not just a monument. It is the symbol of monarchical France, the place where French history was written for over a century.

### The Kings of the Palace:

**👑 Louis XIV - The Sun King**
- Creator of the Palace and gardens
- Daily horseback rides
- His stable of 600 horses

**👑 Louis XV**
- The Palace at its peak
- Sumptuous parties
- Refined court life

**👑 Louis XVI and Marie-Antoinette**
- Last sovereigns of the Palace
- The Queen's walks
- The end of an era

### On horseback through history

Each alley tells a royal anecdote. Your guide makes you relive the great hours of the Palace.

**Walk in the footsteps of History!**`,
    image: "/card-real-3.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-05",
    views: 6780,
    keywords: ["histoire chateau versailles", "louis XIV versailles", "marie antoinette versailles", "vie chateau versailles", "rois france versailles"],
  },
  {
    id: "20",
    title: "Domaine du Château de Versailles | Accès Privilégié à Cheval",
    titleEn: "Estate of Palace of Versailles | Privileged Access on Horseback",
    slug: "domaine-chateau-versailles-acces-cheval",
    excerpt: "Accédez au domaine du Château de Versailles à cheval. 800 hectares royaux, parc privé, jardins secrets. L'expérience VIP du Château.",
    excerptEn: "Access the estate of Palace of Versailles on horseback. 800 royal hectares, private park, secret gardens. The VIP experience of the Palace.",
    content: `## Domaine du Château de Versailles

### Le plus grand domaine royal du monde

Le domaine du Château de Versailles s'étend sur 800 hectares. Plus qu'un simple parc, c'est une véritable ville dans la ville, avec ses jardins, ses bosquets, son Grand Canal et ses dépendances.

### À cheval dans le domaine :

**🏛️ Le domaine royal complet**
- Trianon accessible à cheval
- Hameau de la Reine
- Fermes royales

**🌳 Espaces naturels du Château**
- Bois de Satory
- Plaine royale
- Forêts domaniales

**🚫 Zones habituellement interdites**
- Accès privilégié réservé
- Chemins royaux cachés
- Vues exclusives sur le Château

### L'expérience complète du Château

Seul à cheval, vous pouvez parcourir l'intégralité du domaine royal du Château de Versailles en quelques heures.

**Explorez tout le domaine royal !**`,
    contentEn: `## Estate of Palace of Versailles

### The largest royal estate in the world

The estate of Palace of Versailles extends over 800 hectares. More than a simple park, it is a veritable city within the city, with its gardens, groves, Grand Canal and outbuildings.

### On horseback in the estate:

**🏛️ The complete royal estate**
- Trianon accessible on horseback
- Queen's Hamlet
- Royal farms

**🌳 Natural spaces of the Palace**
- Satory Wood
- Royal plain
- Domain forests

**🚫 Usually forbidden zones**
- Reserved privileged access
- Hidden royal paths
- Exclusive views of the Palace

### The complete experience of the Palace

Only on horseback, you can cover the entirety of the royal estate of Palace of Versailles in a few hours.

**Explore the entire royal estate!**`,
    image: "/grid-real-2.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-06",
    views: 7890,
    keywords: ["domaine chateau versailles", "parc chateau versailles", "acces domaine royal", "trianon versailles", "hameau reine versailles"],
  },
  {
    id: "21",
    title: "Visite VIP Château de Versailles | Sans les Foules à Cheval",
    titleEn: "VIP Visit Palace of Versailles | Without Crowds on Horseback",
    slug: "visite-vip-chateau-versailles-sans-foule",
    excerpt: "Visitez le Château de Versailles sans les foules : à cheval dans les jardins privés. Expérience VIP loin des touristes, accès exclusif garanti.",
    excerptEn: "Visit Palace of Versailles without crowds: on horseback in private gardens. VIP experience away from tourists, guaranteed exclusive access.",
    content: `## Visite VIP du Château de Versailles

### Le Château sans les foules... c'est possible !

Le Château de Versailles accueille 10 millions de visiteurs par an. Les files d'attente, les groupes, les selfies... Mais il existe un moyen de visiter le Château dans le calme et l'exclusivité.

### Notre formule VIP "Château Privé" :

**👑 Accès exclusif**
- Jardins réservés
- Allées sans touristes
- Intimité préservée

**🐴 Expérience privée**
- Groupe réduit (max 6 pers)
- Guide dédié
- Horaires privilégiés

**🌟 Services VIP**
- Champagne au Château
- Photos professionnelles
- Souvenirs royaux

### Le luxe ultime : le Château pour vous seul

À cheval, vous quittez les zones touristiques. Vous avez le domaine royal du Château rien que pour vous.

**Vivez le Château en VIP !**`,
    contentEn: `## VIP Visit of Palace of Versailles

### The Palace without crowds... it's possible!

The Palace of Versailles welcomes 10 million visitors per year. Queues, groups, selfies... But there is a way to visit the Palace in calm and exclusivity.

### Our VIP "Private Palace" package:

**👑 Exclusive access**
- Reserved gardens
- Alleys without tourists
- Preserved intimacy

**🐴 Private experience**
- Small group (max 6 people)
- Dedicated guide
- Privileged hours

**🌟 VIP services**
- Champagne at the Palace
- Professional photos
- Royal souvenirs

### The ultimate luxury: the Palace just for you

On horseback, you leave the tourist areas. You have the royal estate of the Palace just for yourself.

**Experience the Palace in VIP style!**`,
    image: "/card-real-1.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-07",
    views: 9120,
    keywords: ["visite vip chateau versailles", "chateau versailles sans foule", "visite privee chateau", "acces exclusif chateau", "chateau versailles vip"],
  },
  {
    id: "22",
    title: "Que Voir au Château de Versailles ? Guide Complet",
    titleEn: "What to See at Palace of Versailles? Complete Guide",
    slug: "que-voir-chateau-versailles-guide",
    excerpt: "Guide complet de ce qu'il faut voir au Château de Versailles : Galerie des Glaces, Appartements Royaux, jardins... Et comment tout voir à cheval !",
    excerptEn: "Complete guide of what to see at Palace of Versailles: Hall of Mirrors, Royal Apartments, gardens... And how to see everything on horseback!",
    content: `## Que Voir au Château de Versailles ?

### Les incontournables du Château

Le Château de Versailles regorge de merveilles. Voici ce qu'il ne faut absolument pas manquer :

**🏛️ À l'intérieur du Château :**
- Galerie des Glaces
- Chapelle Royale
- Appartements du Roi
- Appartements de la Reine
- Opéra Royal

**🌳 L'extérieur du Château :**
- Jardins à la française
- Grand Canal
- Bassins et fontaines
- Bosquets de Le Nôtre

**🐴 Notre suggestion :**
Après la visite intérieure classique du Château, découvrez l'extérieur à cheval. C'est la complémentarité parfaite : l'art à l'intérieur, la nature à cheval.

### Le circuit idéal au Château :

1. **Matin** : Visite intérieure du Château
2. **Après-midi** : Balade à cheval dans les jardins

**Tout voir du Château !**`,
    contentEn: `## What to See at Palace of Versailles?

### The must-sees of the Palace

The Palace of Versailles is full of wonders. Here's what you absolutely must not miss:

**🏛️ Inside the Palace:**
- Hall of Mirrors
- Royal Chapel
- King's Apartments
- Queen's Apartments
- Royal Opera

**🌳 Outside the Palace:**
- French gardens
- Grand Canal
- Basins and fountains
- Le Nôtre's groves

**🐴 Our suggestion:**
After the classic interior visit of the Palace, discover the exterior on horseback. It's the perfect complement: art inside, nature on horseback.

### The ideal circuit at the Palace:

1. **Morning**: Interior visit of the Palace
2. **Afternoon**: Horseback ride in the gardens

**See everything at the Palace!**`,
    image: "/Zhun3TjCgu4jzzZm_LGC-Equitation-Versailles-3.jpg",
    category: "Château de Versailles",
    categoryEn: "Palace of Versailles",
    published: true,
    createdAt: "2025-03-08",
    views: 10560,
    keywords: ["que voir chateau versailles", "visiter chateau versailles", "galerie glaces versailles", "appartements royaux versailles", "guide chateau versailles"],
  },
];

export function Blog() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "fr";
  const isEnglish = lang === "en";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPostsData.map((post) => 
    isEnglish ? post.categoryEn : post.category
  ))];

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesSearch = 
      (isEnglish ? post.titleEn : post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isEnglish ? post.excerptEn : post.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory 
      ? (isEnglish ? post.categoryEn : post.category) === selectedCategory 
      : true;
    return matchesSearch && matchesCategory && post.published;
  });

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
              href={`/blog?lang=${isEnglish ? 'fr' : 'en'}`}
              className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]"
            >
              {isEnglish ? 'FR' : 'EN'}
            </a>
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {isEnglish ? 'Back' : 'Retour'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1C1C1C] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            {isEnglish ? "Our Blog" : "Notre Blog"}
          </h1>
          <p className="text-lg text-white/70">
            {isEnglish 
              ? "Discover the best tips and experiences for your stay in Paris"
              : "Découvrez les meilleurs conseils et expériences pour votre séjour à Paris"
            }
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C7B6B]" />
              <Input
                placeholder={isEnglish ? "Search articles..." : "Rechercher des articles..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {isEnglish ? "All" : "Tous"}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={isEnglish ? post.titleEn : post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">
                    {isEnglish ? post.categoryEn : post.category}
                  </Badge>
                  <span className="text-xs text-[#8C7B6B] flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.createdAt}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-[#8C7B6B] transition-colors">
                  <Link to={`/blog/${post.slug}?lang=${lang}`}>
                    {isEnglish ? post.titleEn : post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#8C7B6B] text-sm mb-4">
                  {isEnglish ? post.excerptEn : post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.slug}?lang=${lang}`}
                  className="inline-flex items-center text-sm font-medium text-[#8C7B6B] hover:text-[#1C1C1C]"
                >
                  {isEnglish ? "Read more" : "Lire la suite"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8C7B6B]">
              {isEnglish ? "No articles found" : "Aucun article trouvé"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
