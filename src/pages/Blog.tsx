import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ArrowRight, ChevronLeft } from "lucide-react";
import { blogPostsData } from "@/data/blogPosts";
import { Seo } from "@/components/Seo";

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
      <Seo
        title={isEnglish ? "Blog | Versailles Horse Riding Tips & Stories" : "Blog | Conseils et récits de balades à cheval à Versailles"}
        description={isEnglish
          ? "Tips, guides and stories about horseback riding in the gardens of the Palace of Versailles."
          : "Conseils, guides et récits autour des balades à cheval dans les jardins du Château de Versailles."}
        path="/blog"
      />
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
