'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function GetStartedModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Get Started</h3>
        <p className="text-sm text-slate-600 mb-4">Choose how you&apos;d like to get started.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="w-full sm:w-1/2 px-4 py-2 rounded-md bg-blue-600 text-white"
            onClick={() => {
              onClose();
              router.push('/personal');
            }}
          >
            Personal Tracker
          </button>
          <button
            className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-slate-200"
            onClick={() => {
              onClose();
              router.push('/groups');
            }}
          >
            Create/Manage Group
          </button>
        </div>
        <div className="mt-4 text-right">
          <button className="text-sm text-slate-500" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
