'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupMode, setSetupMode] = useState(false);
  const [setupMsg, setSetupMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Login failed');
      setLoading(false);
      return;
    }

    router.push('/admin');
  };

  const handleSetup = async () => {
    if (!email || !password) {
      setError('Enter email and password to create admin account');
      return;
    }
    setLoading(true);
    setSetupMsg('');
    setError('');

    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Setup failed');
    } else {
      setSetupMsg(data.message || 'Admin account created! You can now log in.');
      setSetupMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Belle Vie CMS</h1>
          <p className="text-white/40 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 bg-gray-900 p-6 rounded-xl border border-white/10">
          <div>
            <label className="block text-sm text-white/60 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold-500/50"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {setupMsg && <p className="text-green-400 text-sm">{setupMsg}</p>}

          {setupMode ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSetup}
                disabled={loading}
                className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Admin Account'}
              </button>
              <button
                type="button"
                onClick={() => setSetupMode(false)}
                className="w-full py-2 text-white/40 text-sm hover:text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gold-500 text-black font-medium rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => setSetupMode(true)}
                className="w-full py-2 text-white/40 text-sm hover:text-white"
              >
                Setup Admin Account
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
