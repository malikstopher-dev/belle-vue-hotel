'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TextField } from '@/components/admin/TextField';
import { SaveButton } from '@/components/admin/SaveButton';
import { useToast } from '@/components/admin/Toast';

interface RoomData {
  id: string; name: string; name_fr: string; name_pt: string;
  description: string; description_fr: string; description_pt: string;
  price: number; size: number; max_guests: number; bed_type: string;
  amenities: string; images: string; featured: boolean; slug: string;
}

const empty: RoomData = { id: '', name: '', name_fr: '', name_pt: '', description: '', description_fr: '', description_pt: '', price: 0, size: 0, max_guests: 2, bed_type: '', amenities: '', images: '', featured: false, slug: '' };

export default function RoomEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const [room, setRoom] = useState<RoomData>(empty);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { showToast, ToastEl } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/rooms/${id}`).then(r => r.json()).then(d => {
        if (d.data) {
          setRoom({
            ...d.data,
            amenities: (d.data.amenities || []).join(', '),
            images: (d.data.images || []).join('\n'),
          });
        }
        setFetching(false);
      });
    } else {
      setFetching(false);
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setLoading(true);
    const body = {
      ...room,
      price: Number(room.price),
      size: Number(room.size),
      max_guests: Number(room.max_guests),
      amenities: room.amenities ? room.amenities.split(',').map((s: string) => s.trim()) : [],
      images: room.images ? room.images.split('\n').map((s: string) => s.trim()) : [],
      slug: room.slug || room.id,
    };
    const url = isNew ? '/api/admin/rooms' : `/api/admin/rooms/${id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setLoading(false);
    showToast(res.ok ? 'Room saved' : 'Error saving room', res.ok ? 'success' : 'error');
    if (res.ok && isNew) router.push('/admin/rooms');
  };

  const update = (key: keyof RoomData, val: string | boolean) => setRoom(prev => ({ ...prev, [key]: val }));

  if (fetching) return <div className="text-white/40">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{isNew ? 'New Room' : 'Edit Room'}</h1>
        <SaveButton onClick={handleSave} loading={loading} />
      </div>
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
        <TextField label="ID (slug)" value={room.id} onChange={v => update('id', v)} placeholder="e.g. standard-room" />
        <TextField label="Name (EN)" value={room.name} onChange={v => update('name', v)} />
        <TextField label="Name (FR)" value={room.name_fr} onChange={v => update('name_fr', v)} />
        <TextField label="Name (PT)" value={room.name_pt} onChange={v => update('name_pt', v)} />
        <TextField label="Description (EN)" value={room.description} onChange={v => update('description', v)} textarea rows={3} />
        <TextField label="Description (FR)" value={room.description_fr} onChange={v => update('description_fr', v)} textarea rows={3} />
        <TextField label="Description (PT)" value={room.description_pt} onChange={v => update('description_pt', v)} textarea rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Price ($)" value={String(room.price)} onChange={v => update('price', v)} />
          <TextField label="Size (m²)" value={String(room.size)} onChange={v => update('size', v)} />
          <TextField label="Max Guests" value={String(room.max_guests)} onChange={v => update('max_guests', v)} />
          <TextField label="Bed Type" value={room.bed_type} onChange={v => update('bed_type', v)} />
        </div>
        <TextField label="Amenities (comma-separated)" value={room.amenities} onChange={v => update('amenities', v)} textarea rows={2} placeholder="Free WiFi, Breakfast, Minibar" />
        <TextField label="Images (one URL per line)" value={room.images} onChange={v => update('images', v)} textarea rows={3} />
        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm text-white/60">
            <input type="checkbox" checked={room.featured} onChange={e => update('featured', e.target.checked)} className="rounded" />
            Featured Room
          </label>
        </div>
      </div>
      {ToastEl}
    </div>
  );
}
