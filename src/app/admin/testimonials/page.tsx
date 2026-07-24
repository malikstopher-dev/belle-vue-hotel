'use client';

import React, { useEffect, useState } from 'react';
import { TextField } from '@/components/admin/TextField';
import { SaveButton } from '@/components/admin/SaveButton';
import { useToast } from '@/components/admin/Toast';

interface Testimonial { id: string; name: string; country: string; rating: number; text: string; text_fr: string; text_pt: string; date: string; }

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});
  const [saving, setSaving] = useState(false);
  const { showToast, ToastEl } = useToast();

  const fetchData = () => { fetch('/api/admin/testimonials').then(r => r.json()).then(d => { setItems(d.data || []); setLoading(false); }); };
  useEffect(() => { fetchData(); }, []);

  const startNew = () => { setEditing('new'); setForm({ id: '', name: '', country: '', rating: 5, text: '', text_fr: '', text_pt: '', date: '' }); };
  const startEdit = (t: Testimonial) => { setEditing(t.id); setForm({ ...t }); };

  const handleSave = async () => {
    setSaving(true);
    const isNew = editing === 'new';
    const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${editing}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, rating: Number(form.rating) }) });
    setSaving(false);
    showToast(res.ok ? 'Saved' : 'Error', res.ok ? 'success' : 'error');
    if (res.ok) { setEditing(null); fetchData(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{editing === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h1>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-white/40 hover:text-white text-sm">Cancel</button>
            <SaveButton onClick={handleSave} loading={saving} />
          </div>
        </div>
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
          <TextField label="ID" value={form.id || ''} onChange={v => setForm(p => ({ ...p, id: v }))} />
          <TextField label="Name" value={form.name || ''} onChange={v => setForm(p => ({ ...p, name: v }))} />
          <TextField label="Country" value={form.country || ''} onChange={v => setForm(p => ({ ...p, country: v }))} />
          <TextField label="Rating (1-5)" value={String(form.rating || 5)} onChange={v => setForm(p => ({ ...p, rating: Number(v) }))} />
          <TextField label="Text (EN)" value={form.text || ''} onChange={v => setForm(p => ({ ...p, text: v }))} textarea rows={3} />
          <TextField label="Text (FR)" value={form.text_fr || ''} onChange={v => setForm(p => ({ ...p, text_fr: v }))} textarea rows={3} />
          <TextField label="Text (PT)" value={form.text_pt || ''} onChange={v => setForm(p => ({ ...p, text_pt: v }))} textarea rows={3} />
          <TextField label="Date" value={form.date || ''} onChange={v => setForm(p => ({ ...p, date: v }))} />
        </div>
        {ToastEl}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <button onClick={startNew} className="px-4 py-2 bg-gold-500 text-black rounded-lg text-sm font-medium">+ New Testimonial</button>
      </div>
      {loading ? <div className="text-white/40">Loading...</div> : (
        <div className="space-y-2">
          {items.map(t => (
            <div key={t.id} className="flex items-center justify-between bg-gray-900 border border-white/10 rounded-lg p-4">
              <div>
                <div className="text-white font-medium">{t.name}</div>
                <div className="text-sm text-white/40">{t.country} — {t.rating}★ — &ldquo;{t.text?.substring(0, 60)}...&rdquo;</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(t)} className="px-3 py-1.5 text-sm bg-white/10 rounded-lg text-white hover:bg-white/20">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="px-3 py-1.5 text-sm bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
