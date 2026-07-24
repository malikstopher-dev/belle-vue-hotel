'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/components/admin/AdminAuthProvider';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: '--- Content ---', href: '' },
  { label: 'Hero', href: '/admin/content/hero' },
  { label: 'About', href: '/admin/content/about' },
  { label: 'Rooms', href: '/admin/content/rooms' },
  { label: 'Restaurant', href: '/admin/content/restaurant' },
  { label: 'Spa', href: '/admin/content/spa' },
  { label: 'Pool', href: '/admin/content/pool' },
  { label: 'Gym', href: '/admin/content/gym' },
  { label: 'Conference', href: '/admin/content/conference' },
  { label: 'Experiences', href: '/admin/content/experiences' },
  { label: 'Testimonials', href: '/admin/content/testimonials' },
  { label: 'Contact', href: '/admin/content/contact' },
  { label: 'Booking', href: '/admin/content/booking' },
  { label: 'Location', href: '/admin/content/location' },
  { label: '--- Data ---', href: '' },
  { label: 'Manage Rooms', href: '/admin/rooms' },
  { label: 'Menu Items', href: '/admin/menu' },
  { label: 'Spa Treatments', href: '/admin/spa' },
  { label: 'Experiences', href: '/admin/experiences' },
  { label: 'Testimonials', href: '/admin/testimonials' },
  { label: '--- Media ---', href: '' },
  { label: 'Media Library', href: '/admin/media' },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAdminAuth();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-lg font-bold text-gold-500">Belle Vie CMS</h1>
          <p className="text-xs text-white/40 mt-1">{user?.email}</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item, i) => {
            if (item.href === '') {
              return (
                <div key={i} className="pt-4 pb-1 px-2 text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                  {item.label.replace('---', '')}
                </div>
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-gold-500/10 text-gold-500'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
