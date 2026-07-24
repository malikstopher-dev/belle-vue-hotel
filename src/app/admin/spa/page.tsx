'use client';

import React, { useEffect, useState } from 'react';
import { TextField } from '@/components/admin/TextField';
import { SaveButton } from '@/components/admin/SaveButton';
import { useToast } from '@/components/admin/Toast';

interface Treatment { id: string; name: string; name_fr: string; name_pt: string; description: string; description_fr: string; description_pt: string; duration: number; price: number; category: string; image: string; }

export default function AdminSpa() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Treatment>>({});
  const [saving, setSaving] = useState(false);
  const { showToast, ToastEl } = useToast();

  const fetchData = () => {
    fetch('/api/admin/spa').then(r => r.json()).then(d => { setTreatments(d.data || []); setLoading(false); });
  };

  useEffect(() => { fetchData(); }, []);

  const startNew = () => { setEditing('new'); setForm({ id: '', name: '', name_fr: '', name_pt: '', description: '', description_fr: '', description_pt: '', duration: 60, price: 0, category: '', image: '' }); };
  const startEdit = (t: Treatment) => { setEditing(t.id); setForm({ ...t }); };

  const handleSave = async () => {
    setSaving(true);
    const isNew = editing === 'new';
    const url = isNew ? '/api/admin/spa' : `/api/admin/spa/${editing}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, duration: Number(form.duration), price: Number(form.price) }) });
    setSaving(false);
    showToast(res.ok ? 'Saved' : 'Error', res.ok ? 'success' : 'error');
    if (res.ok) { setEditing(null); fetchData(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/spa/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{editing === 'new' ? 'New Treatment' : 'Edit Treatment'}</h1>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-white/40 hover:text-white text-sm">Cancel</button>
            <SaveButton onClick={handleSave} loading={saving} />
          </div>
        </div>
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
          <TextField label="ID" value={form.id || ''} onChange={v => setForm(p => ({ ...p, id: v }))} />
          <TextField label="Name (EN)" value={form.name || ''} onChange={v => setForm(p => ({ ...p, name: v }))} />
          <TextField label="Name (FR)" value={form.name_fr || ''} onChange={v => setForm(p => ({ ...p, name_fr: v }))} />
          <TextField label="Name (PT)" value={form.name_pt || ''} onChange={v => setForm(p => ({ ...p, name_pt: v }))} />
          <TextField label="Description (EN)" value={form.description || ''} onChange={v => setForm(p => ({ ...p, description: v }))} textarea rows={3} />
          <TextField label="Description (FR)" value={form.description_fr || ''} onChange={v => setForm(p => ({ ...p, description_fr: v }))} textarea rows={3} />
          <TextField label="Description (PT)" value={form.description_pt || ''} onChange={v => setForm(p => ({ ...p, description_pt: v }))} textarea rows={3} />
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Duration (min)" value={String(form.duration || '')} onChange={v => setForm(p => ({ ...p, duration: Number(v) }))} />
            <TextField label="Price ($)" value={String(form.price || '')} onChange={v => setForm(p => ({ ...p, price: Number(v) }))} />
            <TextField label="Category" value={form.category || ''} onChange={v => setForm(p => ({ ...p, category: v }))} />
          </div>
          <TextField label="Image URL" value={form.image || ''} onChange={v => setForm(p => ({ ...p, image: v }))} />
        </div>
        {ToastEl}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Spa Treatments</h1>
        <button onClick={startNew} className="px-4 py-2 bg-gold-500 text-black rounded-lg text-sm font-medium">+ New Treatment</button>
      </div>
      {loading ? <div className="text-white/40">Loading...</div> : (
        <div className="space-y-2">
          {treatments.map(t => (
            <div key={t.id} className="flex items-center justify-between bg-gray-900 border border-white/10 rounded-lg p-4">
              <div>
                <div className="text-white font-medium">{t.name}</div>
                <div className="text-sm text-white/40">{t.name_fr} — {t.duration}min — ${t.price} — {t.category}</div>
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
