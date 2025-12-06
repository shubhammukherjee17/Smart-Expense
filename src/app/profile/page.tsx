'use client';

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-expense:me';

export default function ProfilePage() {
  const [meta, setMeta] = useState<{ id: string; name: string; avatar?: string } | null>(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(`${STORAGE_KEY}:meta`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
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
    const payload = { id, name: name.trim() || 'Me', avatar: avatar.trim() || undefined } as any;
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="bg-white p-6 rounded shadow grid grid-cols-1 gap-4">
        <label className="text-sm">Display name</label>
        <input className="border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="text-sm">Avatar URL (optional)</label>
        <input className="border rounded px-3 py-2" value={avatar} onChange={(e) => setAvatar(e.target.value)} />

        {avatar && (
          <div className="mt-2">
            <div className="text-sm text-slate-600">Preview</div>
            <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full mt-2" />
          </div>
        )}

        <div className="flex gap-3 justify-end mt-4">
          <button className="px-3 py-1 rounded-md bg-slate-100" onClick={clearProfile}>Clear</button>
          <button className="px-3 py-1 rounded-md bg-slate-900 text-white" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
