'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Room { id: string; name: string; name_fr: string | null; price: number | null; featured: boolean; }

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = () => {
    fetch('/api/admin/rooms').then(r => r.json()).then(d => { setRooms(d.data || []); setLoading(false); });
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this room?')) return;
    await fetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });
    fetchRooms();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Rooms</h1>
        <Link href="/admin/rooms/new" className="px-4 py-2 bg-gold-500 text-black rounded-lg text-sm font-medium hover:bg-gold-400">
          + New Room
        </Link>
      </div>
      {loading ? <div className="text-white/40">Loading...</div> : (
        <div className="space-y-2">
          {rooms.map(room => (
            <div key={room.id} className="flex items-center justify-between bg-gray-900 border border-white/10 rounded-lg p-4">
              <div>
                <div className="text-white font-medium">{room.name}</div>
                <div className="text-sm text-white/40">{room.name_fr} — ${room.price} {room.featured && '• Featured'}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/rooms/${room.id}`} className="px-3 py-1.5 text-sm bg-white/10 rounded-lg text-white hover:bg-white/20">
                  Edit
                </Link>
                <button onClick={() => handleDelete(room.id)} className="px-3 py-1.5 text-sm bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
