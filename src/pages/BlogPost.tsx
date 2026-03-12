import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Facebook, Twitter, Linkedin } from "lucide-react";

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
  author: string;
  readTime: number;
}

// Articles SEO-optimisés (même données que Blog.tsx)
const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "Les 10 Activités Immanquables à Paris en 2024",
    titleEn: "Top 10 Unmissable Activities in Paris 2024",
    slug: "activites-immanquables-paris",
    excerpt: "Découvrez les expériences incontournables à Paris : de la Tour Eiffel à Versailles à cheval, voici ce que vous ne devez absolument pas manquer.",
    excerptEn: "Discover the must-do experiences in Paris: from the Eiffel Tower to Versailles horseback riding, here's what you absolutely cannot miss.",
    content: `Paris, la Ville Lumière, regorge d'expériences uniques. Voici notre sélection des 10 activités immanquables:

## 1. Versailles à Cheval - L'expérience royale ultime

Une balade à cheval dans les jardins du Château de Versailles est sans doute **l'activité la plus magique** que vous puissiez vivre à Paris. Sur les traces de Louis XIV, découvrez le Grand Canal et les bosquets secrets à dos de noble destrier.

### Pourquoi c'est l'activité numéro 1 ?
- Accès privilégié aux zones habituellement fermées
- Vue imprenable sur le Grand Canal
- Guide expert passionné
- Chevaux soigneusement sélectionnés

**Prix : À partir de 490€ par personne**

[ Réservez votre expérience royale ](#reservation)

---

## 2. La Tour Eiffel au coucher du soleil

Le monument le plus célèbre du monde ne se visite pas, il se vit. Montez au sommet pour une vue à 360° sur Paris.

## 3. Le Louvre et ses chefs-d'œuvre

La Joconde, la Vénus de Milo... des trésors inestimables dans le plus grand musée d'art du monde.

## 4. Une croisière sur la Seine

Pour voir Paris sous un autre angle, une croisière au crépuscule est magique.

## 5. Montmartre et le Sacré-Cœur

L'âme bohème de Paris, avec ses artistes et sa vue panoramique.

## 6. Les Catacombes de Paris

Une plongée dans l'histoire souterraine de la capitale.

## 7. Un dîner gastronomique étoilé

Paris compte plus de 100 restaurants étoilés au guide Michelin.

## 8. Le Château de Fontainebleau

Moins bondé que Versailles, tout aussi majestueux.

## 9. Une balade au Bois de Boulogne

Le poumon vert de l'ouest parisien.

## 10. Shopping aux Champs-Élysées

La plus belle avenue du monde pour les amateurs de luxe.

---

## Notre Conseil d'Expert

> Si vous ne deviez choisir qu'une seule activité à Paris, faites-nous confiance : **la balade à cheval à Versailles** est l'expérience la plus mémorable. Elle combine histoire, nature, luxe et aventure en une seule journée d'exception.

Contactez-nous dès maintenant pour réserver votre créneau !`,
    contentEn: `Paris, the City of Light, is full of unique experiences. Here is our selection of the 10 unmissable activities:

## 1. Versailles Horseback Riding - The Ultimate Royal Experience

A horseback ride in the gardens of the Palace of Versailles is undoubtedly **the most magical activity** you can experience in Paris. In the footsteps of Louis XIV, discover the Grand Canal and secret groves on the back of a noble steed.

### Why is it the #1 activity?
- Privileged access to usually closed areas
- Breathtaking view of the Grand Canal
- Passionate expert guide
- Carefully selected horses

**Price: From €490 per person**

[Book your royal experience](#reservation)

---

## 2. The Eiffel Tower at Sunset

The world's most famous monument is not just visited, it's experienced. Climb to the top for a 360° view of Paris.

## 3. The Louvre and its Masterpieces

The Mona Lisa, Venus de Milo... priceless treasures in the world's largest art museum.

## 4. A Seine River Cruise

To see Paris from another angle, a twilight cruise is magical.

## 5. Montmartre and the Sacré-Cœur

The bohemian soul of Paris, with its artists and panoramic view.

---

## Our Expert Advice

> If you could only choose one activity in Paris, trust us: **Versailles horseback riding** is the most memorable experience. It combines history, nature, luxury and adventure in one exceptional day.

Contact us now to book your slot!`,
    image: "/card-real-1.jpg",
    category: "Guide Paris",
    categoryEn: "Paris Guide",
    published: true,
    createdAt: "2024-12-10",
    views: 3250,
    keywords: ["activités paris", "que faire à paris", "visiter paris", "expérience unique paris"],
    author: "Équipe Versailles à Cheval",
    readTime: 8,
  },
  {
    id: "2",
    title: "Pourquoi la Balade à Cheval à Versailles est la Meilleure Activité de Paris",
    titleEn: "Why Versailles Horseback Riding is Paris' Best Activity",
    slug: "meilleure-activite-paris-versailles-cheval",
    excerpt: "Entre histoire, élégance et nature, découvrez pourquoi une balade à cheval dans les jardins royaux de Versailles surpasse toutes les autres expériences parisiennes.",
    excerptEn: "Between history, elegance and nature, discover why a horseback ride in the royal gardens of Versailles surpasses all other Parisian experiences.",
    content: `## L'Expérience Royale par Excellence

Quand on pense aux **activités incontournables à Paris**, on pense souvent à la Tour Eiffel, au Louvre, ou à une croisière sur la Seine. Mais il existe une expérience qui les surpasse toutes : **la balade à cheval à Versailles**.

### Une Immersion Totale dans l'Histoire

Imaginez-vous sur le dos d'un noble destrier, traversant les mêmes allées où Louis XIV, Marie-Antoinette et toute la cour de France promenaient leurs montures. Les sabots de votre cheval résonnent sur les graviers du Grand Siècle...

**C'est une remontée dans le temps unique.**

## Ce qui rend cette expérience unique:

### 🏰 Accès Privilégié
Contrairement aux visiteurs à pied, vous accédez à des zones habituellement fermées au public. Les bosquets secrets, les perspectives cachées...

### 🐴 Les Chevaux
Nos chevaux sont soigneusement sélectionnés pour leur tempérament doux et leur élégance. Que vous soyez débutant ou cavalier confirmé, vous serez à l'aise.

### 👨‍🏫 Guide Expert
Votre guide n'est pas seulement un moniteur d'équitation, c'est un historien passionné qui vous raconte les secrets du château et de ses jardins.

### 🌳 La Nature
Les jardins de Versailles s'étendent sur 800 hectares. À cheval, vous en appréciez véritablement l'échelle et la majesté.

---

## Comparatif avec les autres activités

| Activité | Originalité | Luxe | Histoire | Nature |
|----------|-------------|------|----------|--------|
| Versailles à Cheval | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Tour Eiffel | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| Louvre | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| Croisière Seine | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

---

## Témoignages

> "La meilleure activité que j'ai faite à Paris. Magique !" - Sarah, USA

> "Un moment inoubliable. À faire absolument." - Pierre, France

---

## Le Verdict

Si vous ne deviez choisir qu'une seule activité à Paris, faites confiance aux milliers de voyageurs qui ont voté : **Versailles à cheval est l'expérience immanquable**.

**À partir de 490€ par personne**

[Réservez maintenant](#)`,
    contentEn: `## The Ultimate Royal Experience

When we think of **must-do activities in Paris**, we often think of the Eiffel Tower, the Louvre, or a Seine river cruise. But there is one experience that surpasses them all: **Versailles horseback riding**.

### Total Immersion in History

Imagine yourself on the back of a noble steed, crossing the same alleys where Louis XIV, Marie-Antoinette and the entire French court rode their mounts. Your horse's hooves echo on the gravel of the Grand Siècle...

**It's a unique journey back in time.**

## What makes this experience unique:

### 🏰 Privileged Access
Unlike visitors on foot, you access areas usually closed to the public. Secret groves, hidden perspectives...

### 🐴 The Horses
Our horses are carefully selected for their gentle temperament and elegance. Whether you're a beginner or experienced rider, you'll be comfortable.

### 👨‍🏫 Expert Guide
Your guide is not just a riding instructor, but a passionate historian who tells you the secrets of the palace and its gardens.

### 🌳 Nature
The gardens of Versailles extend over 800 hectares. On horseback, you truly appreciate their scale and majesty.

---

## The Verdict

If you could only choose one activity in Paris, trust the thousands of travelers who have voted: **Versailles on horseback is the unmissable experience**.

**From €490 per person**

[Book now](#)`,
    image: "/grid-real-1.jpg",
    category: "Expériences",
    categoryEn: "Experiences",
    published: true,
    createdAt: "2024-12-12",
    views: 2890,
    keywords: ["meilleure activité paris", "versailles cheval", "expérience unique", "activité luxe paris"],
    author: "Équipe Versailles à Cheval",
    readTime: 6,
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

#### 1. **Le Château de Versailles et sa Balade à Cheval**
C'est notre coup de cœur absolu. Une visite du château suivie d'une balade à cheval dans les jardins est l'expérience la plus royale que vous puissiez vivre.

**Durée :** 3h30 (1h30 visite + 2h équitation)  
**Prix :** À partir de 490€  
**À réserver :** Impérativement à l'avance

#### 2. **La Tour Eiffel**
Symbole mondial de Paris. Montez au crépuscule pour une vue magique.

#### 3. **Le Louvre**
Le plus grand musée d'art au monde. Prévoyez au moins une demi-journée.

#### 4. **Notre-Dame et l'Île de la Cité**
Chef-d'œuvre gothique (reconstruction en cours, mais la visite extérieure vaut le détour).

---

### Les Expériences Uniques

- 🐴 **Balade à cheval à Versailles** (notre coup de cœur !)
- 🚢 **Dîner croisière sur la Seine**
- 💀 **Visite des catacombes**
- 🍷 **Dégustation de vins français**
- 🎨 **Atelier peinture à Montmartre**

---

### Conseils d'Expert

> "La meilleure façon de découvrir Versailles n'est pas à pied, mais à cheval. C'est une expérience transformante." 
> — Guide Versailles

### Planning Idéal d'une Journée

**Matin :** 9h - Visite privée du Château de Versailles  
**Midi :** 12h - Déjeuner au restaurant du château  
**Après-midi :** 14h - Balade à cheval dans les jardins  
**Soir :** Retour à Paris pour un dîner gastronomique

---

## FAQ

**Quelle est la meilleure période pour visiter ?**  
Le printemps (avril-mai) et l'automne (septembre-octobre) sont idéaux.

**Faut-il réserver à l'avance ?**  
Oui, surtout pour Versailles à cheval qui est très demandé.

**Combien de temps prévoir pour Versailles ?**  
Comptez une journée complète pour la visite + la balade à cheval.

---

**Prêt à vivre l'expérience parisienne ultime ?**

[Réservez votre journée royale →](#)`,
    contentEn: `## The Guide to Parisian Must-Sees

Are you planning your trip to Paris and don't want to miss anything? This guide is for you.

### Historical Must-Sees

#### 1. **The Palace of Versailles and Horseback Riding**
This is our absolute favorite. A visit to the palace followed by a horseback ride in the gardens is the most royal experience you can live.

**Duration:** 3.5 hours (1.5h visit + 2h riding)  
**Price:** From €490  
**Book:** Well in advance

#### 2. **The Eiffel Tower**
Global symbol of Paris. Go at dusk for a magical view.

#### 3. **The Louvre**
The largest art museum in the world. Plan at least half a day.

---

### Unique Experiences

- 🐴 **Horseback riding at Versailles** (our favorite!)
- 🚢 **Dinner cruise on the Seine**
- 💀 **Catacombs tour**
- 🍷 **French wine tasting**

---

**Ready to live the ultimate Parisian experience?**

[Book your royal day →](#)`,
    image: "/breath-real.jpg",
    category: "Guide",
    categoryEn: "Guide",
    published: true,
    createdAt: "2024-12-15",
    views: 4120,
    keywords: ["choses immanquables paris", "guide paris", "visiter paris", "que voir paris"],
    author: "Équipe Versailles à Cheval",
    readTime: 10,
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

---

## Notre Top 3 des Expériences Luxe

### 🥇 1. Versailles à Cheval - L'Expérience Royale

L'expérience de luxe par excellence à Paris.

**Ce qui est inclus :**
- ✓ Visite privée du Château (1h30)
- ✓ Balade de 2h à cheval dans les jardins royaux
- ✓ Service conciergerie dédié
- ✓ Équipement premium fourni
- ✓ Photos professionnelles de votre expérience
- ✓ Champagne à l'arrivée (option)

**À partir de 490€ par personne**

**Transport depuis votre hôtel :** +100€/pers

[ Réserver cette expérience ](# )

---

### 🥈 2. Dîner 3 Étoiles avec Vue sur la Tour Eiffel

Paris compte plusieurs restaurants 3 étoiles Michelin. Réservez une table avec vue pour une soirée inoubliable.

---

### 🥉 3. Shopping Privé aux Champs-Élysées

Un personal shopper vous accompagne dans les boutiques de luxe les plus prestigieuses.

---

## Pourquoi choisir Versailles à Cheval ?

C'est l'expérience qui combine tous les éléments du luxe français :

| Élément | Versailles à Cheval |
|---------|-------------------|
| **Histoire** | Sur les traces des rois |
| **Nature** | Les plus beaux jardins d'Europe |
| **Aventure** | Une balade inoubliable |
| **Luxe** | Service sur mesure |
| **Exclusivité** | Accès privilégié |

---

## Le Service Conciergerie

Notre équipe s'occupe de tout :
- 🚗 Transport depuis votre hôtel
- 🎫 Réservations prioritaires
- 📸 Photographe professionnel
- 🍾 Surprises sur mesure

---

## Témoignages de Clients VIP

> "Une expérience digne d'un roi. Le service était impeccable."  
> — James W., CEO, USA

> "Le meilleur souvenir de notre voyage de noces."  
> — Emma et Thomas, UK

---

## Comment Réserver ?

1. **Choisissez votre date** (réserver 2 semaines à l'avance minimum)
2. **Indiquez vos préférences** (langue, options)
3. **Nous confirmons sous 24h**

**Contact privilégié :**  
📞 +33 6 25 75 79 95  
📧 parisdreamhunt@gmail.com

---

**Vivez le luxe à la française. Réservez maintenant.**`,
    contentEn: `## French Luxury

Paris is the world capital of luxury. Here's how to live exceptional experiences.

---

## Our Top 3 Luxury Experiences

### 🥇 1. Versailles Horseback Riding - The Royal Experience

The ultimate luxury experience in Paris.

**What's included:**
- ✓ Private Château visit (1.5h)
- ✓ 2-hour horseback ride in the royal gardens
- ✓ Dedicated concierge service
- ✓ Premium equipment provided
- ✓ Professional photos of your experience
- ✓ Champagne on arrival (option)

**From €490 per person**

**Transport from your hotel:** +€100/person

[Book this experience](#)

---

**Live French luxury. Book now.**`,
    image: "/card-real-3.jpg",
    category: "Luxe",
    categoryEn: "Luxury",
    published: true,
    createdAt: "2024-12-18",
    views: 1950,
    keywords: ["activité luxe paris", "expérience exclusive paris", "luxe français", "versailles luxe"],
    author: "Équipe Versailles à Cheval",
    readTime: 5,
  },
  {
    id: "5",
    title: "Que Faire à Paris Ce Week-End ? Nos Meilleures Idées",
    titleEn: "What to Do in Paris This Weekend? Our Best Ideas",
    slug: "que-faire-paris-weekend",
    excerpt: "Vous cherchez des idées pour ce week-end à Paris ? Découvrez nos recommandations pour un séjour inoubliable dans la capitale.",
    excerptEn: "Looking for ideas for this weekend in Paris? Discover our recommendations for an unforgettable stay in the capital.",
    content: `## Paris Ce Week-End : Notre Programme Idéal

Vous n'avez que deux jours pour découvrir Paris ? Voici le programme optimisé pour vivre le maximum d'expériences.

---

### Samedi - La Journée Royale

#### 9h00 - Départ de Paris
Transport privé vers Versailles (inclus dans nos forfaits)

#### 10h00 - Visite Privée du Château de Versailles
- Accès prioritaire (pas d'attente)
- Guide expert francophone
- Découverte des appartements royaux
- La célèbre Galerie des Glaces

#### 12h30 - Déjeuner Gastronomique
Restaurant sélectionné près du château

#### 14h30 - **L'Activité Phare : Balade à Cheval**
- 2 heures à cheval dans les jardins royaux
- Grand Canal, bosquets secrets
- Photos souvenirs
- Moment magique garanti

#### 17h30 - Retour à Paris

#### 20h00 - Dîner à Paris
Restaurant avec vue sur la Tour Eiffel

---

### Dimanche - Paris Intime

#### 10h00 - Montmartre
- Place du Tertre et ses artistes
- Basilique du Sacré-Cœur
- Vue panoramique sur Paris

#### 13h00 - Déjeuner à Montmartre
Bistro typique parisien

#### 15h00 - Croisière sur la Seine
- Vue sur Notre-Dame
- Passage sous les ponts
- Tour Eiffel au crépuscule

#### 18h00 - Apéritif aux Champs-Élysées

---

## Pourquoi ce programme est parfait ?

| Avantage | Détail |
|----------|--------|
| **Équilibre** | Histoire + Nature + Gastronomie |
| **Sans stress** | Tout est organisé |
| **Unique** | Expérience à cheval exclusive |
| **Mémorable** | Souvenirs pour toute la vie |

---

## Options pour Personnaliser

- 🚗 **Transport privé** tout le week-end
- 📸 **Photographe professionnel** qui vous suit
- 🍾 **Surprises** pour une occasion spéciale

---

## Réserver Ce Programme

**Prix à partir de 490€ par personne** (activité Versailles uniquement)

📞 +33 6 25 75 79 95  
📧 parisdreamhunt@gmail.com

---

**Votre week-end royal commence ici !**`,
    contentEn: `## Paris This Weekend: Our Ideal Program

You only have two days to discover Paris? Here is the optimized program to experience the maximum.

---

### Saturday - The Royal Day

#### 9:00 AM - Departure from Paris
Private transport to Versailles (included in our packages)

#### 10:00 AM - Private Visit of the Palace of Versailles
- Priority access (no waiting)
- Expert French-speaking guide
- Discovery of the royal apartments
- The famous Hall of Mirrors

#### 2:30 PM - **The Highlight: Horseback Riding**
- 2 hours on horseback in the royal gardens
- Grand Canal, secret groves
- Souvenir photos
- Guaranteed magical moment

---

### Sunday - Intimate Paris

#### 10:00 AM - Montmartre
- Place du Tertre and its artists
- Sacré-Cœur Basilica
- Panoramic view of Paris

---

**Your royal weekend starts here!**`,
    image: "/hero-real.jpg",
    category: "Week-end",
    categoryEn: "Weekend",
    published: true,
    createdAt: "2024-12-20",
    views: 2340,
    keywords: ["week-end paris", "que faire paris week-end", "activité week-end paris"],
    author: "Équipe Versailles à Cheval",
    readTime: 4,
  },
];

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "fr";
  const isEnglish = lang === "en";
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogPostsData.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      // Mettre à jour le titre de la page
      document.title = isEnglish ? foundPost.titleEn : foundPost.title;
    }
  }, [slug, isEnglish]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F3F0EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#1C1C1C] mb-4">
            {isEnglish ? "Article not found" : "Article non trouvé"}
          </h1>
          <Link to={`/blog?lang=${lang}`}>
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {isEnglish ? "Back to blog" : "Retour au blog"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = isEnglish ? post.titleEn : post.title;

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      {/* SEO Meta */}
      <head>
        <title>{isEnglish ? post.titleEn : post.title}</title>
        <meta name="description" content={isEnglish ? post.excerptEn : post.excerpt} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <meta property="og:title" content={isEnglish ? post.titleEn : post.title} />
        <meta property="og:description" content={isEnglish ? post.excerptEn : post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </head>

      {/* Header */}
      <header className="bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={`/?lang=${lang}`} className="text-xl font-serif text-[#1C1C1C]">
            {isEnglish ? "Versailles Horse Riding" : "Versailles à Cheval"}
          </Link>
          <div className="flex items-center gap-4">
            <Link to={`/blog?lang=${lang}`} className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]">
              {isEnglish ? "Blog" : "Blog"}
            </Link>
            <Link 
              to={`/blog?lang=${isEnglish ? 'fr' : 'en'}`}
              className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]"
            >
              {isEnglish ? 'FR' : 'EN'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={post.image}
          alt={isEnglish ? post.titleEn : post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-[#1C1C1C]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-[#8C7B6B] text-white">
              {isEnglish ? post.categoryEn : post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
              {isEnglish ? post.titleEn : post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.createdAt}
              </span>
              <span>•</span>
              <span>{post.readTime} min {isEnglish ? "read" : "de lecture"}</span>
              <span>•</span>
              <span>{post.views} {isEnglish ? "views" : "vues"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#EAE4D9]">
          <Link to={`/blog?lang=${lang}`}>
            <Button variant="ghost">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {isEnglish ? "Back to articles" : "Retour aux articles"}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8C7B6B]">{isEnglish ? "Share:" : "Partager :"}</span>
            <Button variant="ghost" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}>
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank')}>
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}>
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1C1C1C] prose-p:text-[#2A2A2A] prose-strong:text-[#8C7B6B] prose-a:text-[#8C7B6B] prose-a:no-underline hover:prose-a:underline">
          <div dangerouslySetInnerHTML={{ 
            __html: (isEnglish ? post.contentEn : post.content)
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/## (.*)/g, '<h2 class="text-2xl font-serif mt-8 mb-4">$1</h2>')
              .replace(/### (.*)/g, '<h3 class="text-xl font-serif mt-6 mb-3">$1</h3>')
              .replace(/\[ (.*?) \]\((.*?)\)/g, '<a href="$2" class="text-[#8C7B6B] font-medium hover:underline">$1</a>')
              .replace(/\| (.*?) \|/g, '<td class="border px-4 py-2">$1</td>')
              .replace(/---/g, '<hr class="my-8 border-[#EAE4D9]" />')
              .replace(/\n/g, '<br />')
          }} />
        </article>

        {/* CTA */}
        <div className="mt-12 p-8 bg-[#1C1C1C] rounded-lg text-center">
          <h3 className="text-2xl font-serif text-white mb-4">
            {isEnglish ? "Ready for the royal experience?" : "Prêt pour l'expérience royale ?"}
          </h3>
          <p className="text-white/70 mb-6">
            {isEnglish 
              ? "Book your horseback ride at Versailles now and live an unforgettable day."
              : "Réservez votre balade à cheval à Versailles maintenant et vivez une journée inoubliable."
            }
          </p>
          <Link to={`/reservation?lang=${lang}`}>
            <Button className="bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white px-8 py-6 text-lg">
              {isEnglish ? "Book now" : "Réserver maintenant"}
            </Button>
          </Link>
        </div>

        {/* Author */}
        <div className="mt-12 flex items-center gap-4 p-6 bg-white rounded-lg border border-[#EAE4D9]">
          <div className="w-12 h-12 rounded-full bg-[#8C7B6B] flex items-center justify-center text-white font-serif text-xl">
            V
          </div>
          <div>
            <p className="font-medium text-[#1C1C1C]">{post.author}</p>
            <p className="text-sm text-[#8C7B6B]">
              {isEnglish ? "Horseback riding experts at Versailles" : "Experts en balades à cheval à Versailles"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
