-- Belle Vue Hotel CMS Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Site content (key-value store per locale+section)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'fr', 'pt')),
  section TEXT NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key, locale)
);

-- 2. Rooms
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_fr TEXT,
  name_pt TEXT,
  description TEXT,
  description_fr TEXT,
  description_pt TEXT,
  price NUMERIC(10,2),
  currency TEXT DEFAULT 'USD',
  size NUMERIC(6,1),
  max_guests INT DEFAULT 2,
  bed_type TEXT,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  slug TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Menu categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_fr TEXT,
  name_pt TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Menu items
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_fr TEXT,
  name_pt TEXT,
  description TEXT,
  description_fr TEXT,
  description_pt TEXT,
  price NUMERIC(10,2),
  dietary TEXT[] DEFAULT '{}',
  image TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Spa treatments
CREATE TABLE IF NOT EXISTS spa_treatments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_fr TEXT,
  name_pt TEXT,
  description TEXT,
  description_fr TEXT,
  description_pt TEXT,
  duration INT,
  price NUMERIC(10,2),
  category TEXT,
  image TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_fr TEXT,
  name_pt TEXT,
  description TEXT,
  description_fr TEXT,
  description_pt TEXT,
  price NUMERIC(10,2),
  duration TEXT,
  image TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  rating INT DEFAULT 5,
  text TEXT,
  text_fr TEXT,
  text_pt TEXT,
  date TEXT,
  avatar TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Media library
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  file_name TEXT DEFAULT '',
  file_size INT DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE spa_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public read" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read" ON spa_treatments FOR SELECT USING (true);
CREATE POLICY "Public read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read" ON media FOR SELECT USING (true);

-- Service role full access
CREATE POLICY "Service role all" ON site_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON rooms FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON menu_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON menu_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON spa_treatments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON experiences FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON testimonials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role all" ON media FOR ALL USING (auth.role() = 'service_role');

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('room-images', 'room-images', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id IN ('media', 'room-images'));
CREATE POLICY "Service role storage" ON storage.objects FOR ALL USING (auth.role() = 'service_role');
