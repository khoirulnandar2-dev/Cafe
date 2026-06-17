'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-amber-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-bold text-amber-900">
            ☕
          </div>
          <Link href="/" className="text-2xl font-bold">
            Cafe Shop
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link href="/menu" className="hover:text-amber-300 transition">
            Menu
          </Link>
          <Link href="/orders" className="hover:text-amber-300 transition">
            Pesanan Saya
          </Link>
          <Link href="/login" className="bg-amber-400 text-amber-900 px-4 py-2 rounded hover:bg-amber-300 transition">
            Login
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 px-4 py-3 space-y-2">
          <Link href="/menu" className="block hover:text-amber-300 transition">
            Menu
          </Link>
          <Link href="/orders" className="block hover:text-amber-300 transition">
            Pesanan Saya
          </Link>
          <Link href="/login" className="block bg-amber-400 text-amber-900 px-4 py-2 rounded hover:bg-amber-300 transition">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
