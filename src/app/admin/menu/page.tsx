'use client';

import React, { useEffect, useState } from 'react';

interface MenuItem { id: string; name: string; name_fr: string | null; price: number | null; category_id: string; }
interface Category { id: string; name: string; name_fr: string | null; items?: MenuItem[]; }

export default function AdminMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState('');
  const [newItemCat, setNewItemCat] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const fetchData = () => {
    fetch('/api/admin/menu').then(r => r.json()).then(d => { setCategories(d.data || []); setLoading(false); });
  };

  useEffect(() => { fetchData(); }, []);

  const addCategory = async () => {
    if (!newCat) return;
    await fetch('/api/admin/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: newCat.toLowerCase().replace(/\s+/g, '-'), name: newCat }) });
    setNewCat('');
    fetchData();
  };

  const addItem = async () => {
    if (!newItemName || !newItemCat) return;
    await fetch('/api/admin/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _type: 'item', id: newItemName.toLowerCase().replace(/\s+/g, '-'), category_id: newItemCat, name: newItemName, price: Number(newItemPrice) || 0 }),
    });
    setNewItemName('');
    setNewItemPrice('');
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Menu Items</h1>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-4 mb-6">
        <h2 className="text-sm font-medium text-white/60 mb-3">Add Category</h2>
        <div className="flex gap-2">
          <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Category name" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
          <button onClick={addCategory} className="px-4 py-2 bg-gold-500 text-black rounded-lg text-sm">Add</button>
        </div>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-4 mb-6">
        <h2 className="text-sm font-medium text-white/60 mb-3">Add Menu Item</h2>
        <div className="flex gap-2 flex-wrap">
          <select value={newItemCat} onChange={e => setNewItemCat(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="Item name" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
          <input value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} placeholder="Price" className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
          <button onClick={addItem} className="px-4 py-2 bg-gold-500 text-black rounded-lg text-sm">Add</button>
        </div>
      </div>

      {loading ? <div className="text-white/40">Loading...</div> : (
        <div className="space-y-4">
          {categories.map(cat => (
            <div key={cat.id} className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-medium mb-3">{cat.name} {cat.name_fr && <span className="text-white/30">/ {cat.name_fr}</span>}</h3>
              <div className="space-y-1">
                {cat.items?.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5">
                    <span className="text-white/70 text-sm">{item.name} <span className="text-white/30">${item.price}</span></span>
                    <button onClick={() => deleteItem(item.id)} className="text-red-400 text-xs hover:text-red-300">Delete</button>
                  </div>
                ))}
                {(!cat.items || cat.items.length === 0) && <div className="text-white/20 text-sm">No items</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
