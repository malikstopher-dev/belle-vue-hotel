import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServiceClient();
  const { data: cats, error } = await supabase.from('menu_categories').select('*').order('order_index');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  for (const cat of cats || []) {
    const { data: items } = await supabase.from('menu_items').select('*').eq('category_id', cat.id).order('order_index');
    (cat as Record<string, unknown>).items = items || [];
  }

  return NextResponse.json({ data: cats });
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServiceClient();

  if (body._type === 'item') {
    const { _type, ...itemData } = body;
    const { data, error } = await supabase.from('menu_items').insert(itemData).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  const { data, error } = await supabase.from('menu_categories').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
