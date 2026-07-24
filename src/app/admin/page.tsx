'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ rooms: 0, menuItems: 0, spa: 0, experiences: 0, testimonials: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/rooms').then(r => r.json()),
      fetch('/api/admin/menu').then(r => r.json()),
      fetch('/api/admin/spa').then(r => r.json()),
      fetch('/api/admin/experiences').then(r => r.json()),
      fetch('/api/admin/testimonials').then(r => r.json()),
    ]).then(([rooms, menu, spa, exp, test]) => {
      setStats({
        rooms: rooms?.data?.length || 0,
        menuItems: menu?.data?.reduce((acc: number, cat: { items?: unknown[] }) => acc + (cat.items?.length || 0), 0) || 0,
        spa: spa?.data?.length || 0,
        experiences: exp?.data?.length || 0,
        testimonials: test?.data?.length || 0,
      });
    });
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg('');
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    const data = await res.json();
    setSeeding(false);
    setSeedMsg(data.message || data.error || 'Done');
  };

  const cards = [
    { label: 'Rooms', value: stats.rooms, href: '/admin/rooms' },
    { label: 'Menu Items', value: stats.menuItems, href: '/admin/menu' },
    { label: 'Spa Treatments', value: stats.spa, href: '/admin/spa' },
    { label: 'Experiences', value: stats.experiences, href: '/admin/experiences' },
    { label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map(card => (
          <Link key={card.href} href={card.href} className="bg-gray-900 border border-white/10 rounded-xl p-4 hover:border-gold-500/30 transition-colors">
            <div className="text-2xl font-bold text-gold-500">{card.value}</div>
            <div className="text-sm text-white/50 mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Import Existing Content</h2>
        <p className="text-sm text-white/40 mb-4">Seed your hardcoded dictionaries and data into Supabase so the CMS can override them.</p>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="px-6 py-2.5 bg-gold-500 text-black font-medium rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50"
        >
          {seeding ? 'Importing...' : 'Import Content'}
        </button>
        {seedMsg && <p className="text-sm text-green-400 mt-2">{seedMsg}</p>}
      </div>
    </div>
  );
}
