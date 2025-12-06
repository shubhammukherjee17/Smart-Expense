/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const STORAGE_KEY = 'ai-expense:me';

export default function ProfilePage() {
  const [meta, setMeta] = useState<{ id: string; name: string; avatar?: string } | null>(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(`${STORAGE_KEY}:meta`);
    if (raw) {
      try {
        const parsed: { id: string; name?: string; avatar?: string } = JSON.parse(raw);
        setMeta(parsed);
        setName(parsed.name ?? '');
        setAvatar(parsed.avatar ?? '');
      } catch {
        // ignore
      }
    }
  }, []);

  function save() {
    const id = meta?.id ?? `me-${Date.now()}`;
    const payload: { id: string; name: string; avatar?: string } = { id, name: name.trim() || 'Me', avatar: avatar.trim() || undefined };
    localStorage.setItem(`${STORAGE_KEY}:meta`, JSON.stringify(payload));
    localStorage.setItem(STORAGE_KEY, id);
    setMeta(payload);
    alert('Profile saved');
  }

  function clearProfile() {
    localStorage.removeItem(`${STORAGE_KEY}:meta`);
    localStorage.removeItem(STORAGE_KEY);
    setMeta(null);
    setName('');
    setAvatar('');
    alert('Profile cleared');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">My Profile</h2>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Customize your profile and preferences</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Display name</label>
            <input
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Avatar URL (optional)</label>
            <input
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Paste image URL here"
            />
            <p className="text-xs text-slate-500 mt-1">Use a direct link to an image (JPG, PNG, GIF)</p>
          </div>

          {avatar && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-sm font-medium text-slate-700 mb-3">Avatar Preview</div>
              <Image src={avatar} alt="avatar" width={80} height={80} className="w-20 h-20 rounded-full object-cover shadow-md" unoptimized />
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
            <button
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
              onClick={clearProfile}
            >
              Clear Profile
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              onClick={save}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
