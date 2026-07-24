import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || 'en';
  const section = url.searchParams.get('section');

  const supabase = createServiceClient();
  let query = supabase.from('site_content').select('*').eq('locale', locale);
  if (section) query = query.eq('section', section);
  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const { key, locale, section, value } = await request.json();
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('site_content')
    .upsert({ key, locale, section, value, updated_at: new Date().toISOString() }, { onConflict: 'key,locale' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
