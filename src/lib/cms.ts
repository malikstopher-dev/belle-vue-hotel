import { createServiceClient } from '@/lib/supabase/service';
import type { Database } from '@/types/database';

type Tables = Database['public']['Tables'];

export async function getCmsContent(locale: string, section?: string) {
  const supabase = createServiceClient();
  let query = supabase.from('site_content').select('*').eq('locale', locale);
  if (section) query = query.eq('section', section);
  const { data } = await query;
  return data || [];
}

export async function getCmsRooms() {
  const supabase = createServiceClient();
  const { data } = await supabase.from('rooms').select('*').order('order_index');
  return (data || []) as Tables['rooms']['Row'][];
}

export async function getCmsMenuCategories() {
  const supabase = createServiceClient();
  const { data } = await supabase.from('menu_categories').select('*').order('order_index');
  const cats = (data || []) as Tables['menu_categories']['Row'][];
  
  for (const cat of cats) {
    const { data: items } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category_id', cat.id)
      .order('order_index');
    (cat as Record<string, unknown>).items = items || [];
  }
  return cats;
}

export async function getCmsSpaTreatments() {
  const supabase = createServiceClient();
  const { data } = await supabase.from('spa_treatments').select('*').order('order_index');
  return (data || []) as Tables['spa_treatments']['Row'][];
}

export async function getCmsExperiences() {
  const supabase = createServiceClient();
  const { data } = await supabase.from('experiences').select('*').order('order_index');
  return (data || []) as Tables['experiences']['Row'][];
}

export async function getCmsTestimonials() {
  const supabase = createServiceClient();
  const { data } = await supabase.from('testimonials').select('*').order('order_index');
  return (data || []) as Tables['testimonials']['Row'][];
}
