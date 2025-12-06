'use client';

import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">💰</span>
            <span className="font-bold text-white text-lg sm:text-xl">SplitWise</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/groups" className="text-white hover:text-blue-100 transition">
              Groups
            </Link>
            <Link href="/reports" className="text-white hover:text-blue-100 transition">
              Reports
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-white p-2">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
