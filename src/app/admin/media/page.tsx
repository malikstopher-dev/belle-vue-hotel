'use client';

import React, { useEffect, useState } from 'react';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface MediaItem { id: string; url: string; alt_text: string; file_name: string; file_size: number; uploaded_at: string; }

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch('/api/admin/media').then(r => r.json()).then(d => { setMedia(d.data || []); setLoading(false); });
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchData();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Media Library</h1>
        <ImageUploader onUpload={() => fetchData()} />
      </div>
      {loading ? <div className="text-white/40">Loading...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map(item => (
            <div key={item.id} className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden group">
              <div className="aspect-square bg-white/5 relative">
                <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(item.url)} className="px-3 py-1.5 bg-white/20 rounded-lg text-xs text-white hover:bg-white/30">
                    Copy URL
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 bg-red-500/30 rounded-lg text-xs text-red-300 hover:bg-red-500/50">
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="text-xs text-white/40 truncate">{item.file_name}</div>
              </div>
            </div>
          ))}
          {media.length === 0 && <div className="text-white/30 col-span-full text-center py-12">No images uploaded yet</div>}
        </div>
      )}
    </div>
  );
}
