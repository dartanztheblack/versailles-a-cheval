import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Facebook, Twitter, Linkedin } from "lucide-react";
import { blogPostsData, type BlogPost } from "@/data/blogPosts";
import { Seo } from "@/components/Seo";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "fr";
  const isEnglish = lang === "en";
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogPostsData.find((p) => p.slug === slug);
    setPost(foundPost ?? null);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F3F0EB] flex items-center justify-center">
        <Seo
          title={isEnglish ? "Article not found" : "Article non trouvé"}
          description={isEnglish ? "This article does not exist." : "Cet article n'existe pas."}
          path={`/blog/${slug ?? ""}`}
          noindex
        />
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

  const postTitle = isEnglish ? post.titleEn : post.title;
  const postExcerpt = isEnglish ? post.excerptEn : post.excerpt;
  const postImage = post.image.startsWith("http") ? post.image : `https://www.versaillesacheval.fr${post.image}`;

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      <Seo
        title={`${postTitle} | Versailles à Cheval`}
        description={postExcerpt}
        path={`/blog/${post.slug}`}
        image={postImage}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: postTitle,
          description: postExcerpt,
          image: postImage,
          datePublished: post.createdAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: "Versailles à Cheval" },
          mainEntityOfPage: `https://www.versaillesacheval.fr/blog/${post.slug}`,
          keywords: post.keywords.join(", "),
        }}
      />

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
