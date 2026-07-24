'use client';

import React, { useEffect, useState } from 'react';
import { TextField } from '@/components/admin/TextField';
import { SaveButton } from '@/components/admin/SaveButton';
import { useToast } from '@/components/admin/Toast';

interface Field {
  key: string;
  label: string;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}

interface ContentEditorProps {
  section: string;
  title: string;
  fields: Field[];
}

export function ContentEditor({ section, title, fields }: ContentEditorProps) {
  const [locale, setLocale] = useState('en');
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { showToast, ToastEl } = useToast();

  useEffect(() => {
    setFetching(true);
    fetch(`/api/admin/content?locale=${locale}&section=${section}`)
      .then(r => r.json())
      .then(({ data }) => {
        if (data && data.length > 0) {
          const v: Record<string, string> = {};
          for (const item of data) {
            v[item.key] = typeof item.value === 'string' ? item.value : JSON.stringify(item.value);
          }
          setValues(v);
        } else {
          setValues({});
        }
        setFetching(false);
      });
  }, [locale, section]);

  const handleSave = async () => {
    setLoading(true);
    let errors = 0;
    for (const field of fields) {
      const val = values[field.key] || '';
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: field.key,
          locale,
          section,
          value: val,
        }),
      });
      if (!res.ok) errors++;
    }
    setLoading(false);
    showToast(errors ? 'Some fields failed to save' : 'Saved successfully', errors ? 'error' : 'success');
  };

  const update = (key: string, val: string) => setValues(prev => ({ ...prev, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <div className="flex items-center gap-3">
          <select
            value={locale}
            onChange={e => setLocale(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
          </select>
          <SaveButton onClick={handleSave} loading={loading} />
        </div>
      </div>

      {fetching ? (
        <div className="text-white/40">Loading...</div>
      ) : (
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
          {fields.map(field => (
            <TextField
              key={field.key}
              label={field.label}
              value={values[field.key] || ''}
              onChange={val => update(field.key, val)}
              textarea={field.textarea}
              rows={field.rows}
              placeholder={field.placeholder}
            />
          ))}
        </div>
      )}
      {ToastEl}
    </div>
  );
}
