'use client';

import React from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}

export function TextField({ label, value, onChange, textarea, rows = 3, placeholder }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
        />
      )}
    </div>
  );
}
