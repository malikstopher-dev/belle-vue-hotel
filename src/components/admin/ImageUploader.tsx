'use client';

import React, { useRef } from 'react';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  folder?: string;
}

export function ImageUploader({ onUpload, folder = 'media' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.url) {
      onUpload(data.url);
    } else {
      alert(data.error || 'Upload failed');
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white hover:bg-white/20 transition-colors"
      >
        Upload Image
      </button>
    </div>
  );
}
