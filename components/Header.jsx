'use client';

import { useState } from 'react';
import logo from '@/public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'tracking', label: 'Track' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-[140px] md:top-[60px] z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-12 md:py-4 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-16 md:w-16 rounded-lg overflow-hidden ring-2 ring-cyan-500/60">
              <Image src={logo} alt="Logo" fill style={{ objectFit: 'cover' }} priority />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900">GlobalAxis Logistics</h1>
              <p className="text-xs md:text-sm text-slate-500">Reliable freight & delivery solutions</p>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="relative group transition text-slate-700 hover:text-cyan-600"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#tracking"
            onClick={(e) => handleNavClick(e, 'tracking')}
            className="rounded-full border border-cyan-500 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-700 hover:bg-cyan-100 transition"
          >
            Track Shipment
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="rounded-full bg-cyan-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-cyan-500 transition"
          >
            Request Pickup
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 border border-slate-300 hover:bg-slate-100"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-72 bg-slate-900 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Navigation</h2>
              <button
                className="p-1 rounded-md text-slate-200 hover:text-white hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-slate-100 text-base font-medium hover:text-cyan-300 transition"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#tracking"
                onClick={(e) => handleNavClick(e, 'tracking')}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 transition"
              >
                Track Shipment
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="inline-flex items-center justify-center rounded-full border border-cyan-500 bg-transparent px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-700 transition"
              >
                Request Pickup
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}