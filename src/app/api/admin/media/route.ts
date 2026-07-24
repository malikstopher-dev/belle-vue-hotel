import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const supabase = createServiceClient();

  const { data: media } = await supabase.from('media').select('url').eq('id', id).single();

  if (media?.url) {
    const path = media.url.split('/media/')[1];
    if (path) await supabase.storage.from('media').remove([`media/${path}`]);
  }

  const { error } = await supabase.from('media').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
