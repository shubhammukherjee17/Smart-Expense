/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { useExpense } from '@/context/ExpenseContext';
import { Person } from '@/types';

const STORAGE_KEY = 'ai-expense:me';

export default function ProfileSelector({ onChange }: { onChange?: (id: string | null) => void }) {
  const { groups } = useExpense();
  const [members, setMembers] = useState<Person[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');

  useEffect(() => {
    const map = new Map<string, Person>();
    groups.forEach((g) => g.members.forEach((m) => map.set(m.id, m)));
    const arr = Array.from(map.values());
    setMembers(arr);
  }, [groups]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelected(saved);
  }, []);

  useEffect(() => {
    if (selected) localStorage.setItem(STORAGE_KEY, selected);
    else localStorage.removeItem(STORAGE_KEY);
    onChange?.(selected ?? null);
  }, [selected, onChange]);

  function handleCreateCustom() {
    if (!customName.trim()) return;
    // create a synthetic id and persist a small record in localStorage under STORAGE_KEY + ':meta'
    const id = `me-${Date.now()}`;
    const meta = { id, name: customName.trim() };
    localStorage.setItem(`${STORAGE_KEY}:meta`, JSON.stringify(meta));
    setCustomName('');
    setSelected(id);
  }

  function getMeta(): { id: string; name: string } | null {
    const raw = localStorage.getItem(`${STORAGE_KEY}:meta`);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  const meta = getMeta();

  return (
    <div className="flex items-center gap-3">
      <select
        value={selected ?? ''}
        onChange={(e) => setSelected(e.target.value || null)}
        className="border rounded-md px-3 py-1"
      >
        <option value="">Select profile</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
        {meta && <option value={meta.id}>{meta.name} (You)</option>}
      </select>

      <div className="flex items-center gap-2">
        <input
          placeholder="Add a name as 'me'"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        />
        <button
          className="px-3 py-1 rounded-md bg-slate-900 text-white text-sm"
          onClick={handleCreateCustom}
        >
          Save
        </button>
      </div>
    </div>
  );
}
