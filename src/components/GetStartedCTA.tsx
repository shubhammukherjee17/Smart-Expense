'use client';

import React, { useState } from 'react';
import GetStartedModal from './GetStartedModal';

export default function GetStartedCTA({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <span className="text-6xl sm:text-8xl">💰</span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
        Split Expenses <span className="text-blue-600">Effortlessly</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
        Stop worrying about who owes what. Automatically categorize expenses, split intelligently, and settle payments with your friends and roommates.
      </p>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Get Started
      </button>
      <GetStartedModal open={open} onClose={() => setOpen(false)} />
      {children}
    </div>
  );
}
