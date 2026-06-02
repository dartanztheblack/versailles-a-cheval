-- Schéma Supabase pour Versailles à Cheval
-- À exécuter dans le SQL Editor de Supabase (https://supabase.com/dashboard)

-- 1. Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  date DATE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1 CHECK (participants >= 1 AND participants <= 10),
  product_id TEXT NOT NULL DEFAULT 'royal_complete',
  add_ons TEXT[] DEFAULT '{}',
  total_amount INTEGER NOT NULL, -- en centimes
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des articles de blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT,
  content_en TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Index
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- 4. Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: les admins peuvent tout voir, les utilisateurs voient leurs propres réservations
CREATE POLICY "Users view own reservations" ON reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can do everything on reservations" ON reservations
  FOR ALL USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
  );

-- Policy: tout le monde peut voir les articles publiés
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can do everything on blog_posts" ON blog_posts
  FOR ALL USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
  );

-- 5. Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
