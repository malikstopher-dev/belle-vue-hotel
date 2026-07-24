'use client';

import React from 'react';

interface SaveButtonProps {
  onClick: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export function SaveButton({ onClick, loading, children = 'Save Changes' }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-6 py-2.5 bg-gold-500 text-black font-medium rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Saving...' : children}
    </button>
  );
}
