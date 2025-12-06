'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMeta, setProfileMeta] = useState<{ id: string; name: string; avatar?: string } | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('ai-expense:me:meta');
      if (raw) setProfileMeta(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function clearProfile() {
    localStorage.removeItem('ai-expense:me:meta');
    localStorage.removeItem('ai-expense:me');
    setProfileMeta(null);
    setProfileOpen(false);
    // refresh to reflect changes
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-sm shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-semibold text-slate-900 text-lg">SplitWise</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-6">
              <Link href="/" className="text-slate-700 hover:text-slate-900 transition">
                Home
              </Link>
              <Link href="/personal" className="text-slate-700 hover:text-slate-900 transition">
                Personal
              </Link>
              <Link href="/groups" className="text-slate-700 hover:text-slate-900 transition">
                Groups
              </Link>
              <Link href="/reports" className="text-slate-700 hover:text-slate-900 transition">
                Reports
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/groups"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Create Group
            </Link>

            {/* Profile menu */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 rounded-full focus:outline-none"
                aria-label="Open profile menu"
              >
                {profileMeta?.avatar ? (
                  <Image
                    src={profileMeta.avatar}
                    alt={profileMeta.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm text-white font-semibold">
                    {profileMeta?.name ? profileMeta.name.charAt(0).toUpperCase() : 'N'}
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow py-2">
                  <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-slate-50">My Profile</Link>
                  <Link href="/personal" className="block px-3 py-2 text-sm hover:bg-slate-50">Personal Dashboard</Link>
                  <button onClick={clearProfile} className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50">Sign out</button>
                </div>
              )}
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link href="/" className="block text-slate-800 font-medium py-2">
              Home
            </Link>
              <Link href="/personal" className="block text-slate-800 font-medium py-2">
                Personal
              </Link>
            <Link href="/groups" className="block text-slate-800 font-medium py-2">
              Groups
            </Link>
            <Link href="/reports" className="block text-slate-800 font-medium py-2">
              Reports
            </Link>
            <Link href="/groups" className="block mt-2">
              <span className="inline-flex items-center justify-center w-full px-3 py-2 rounded-md bg-blue-600 text-white">
                Create Group
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
