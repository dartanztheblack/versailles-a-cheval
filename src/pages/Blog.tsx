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
              <div className="aspect-video overflow-hidden">
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
