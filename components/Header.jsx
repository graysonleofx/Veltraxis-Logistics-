'use client';

import { useEffect, useState } from 'react';
import logo from '@/public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'tracking', label: 'Track' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`container mx-auto flex items-center justify-between gap-4 px-4 py-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          hasScrolled ? 'backdrop-blur-xl bg-bg-secondary/90 shadow-lg shadow-bg-main/10 border-b border-red-primary/20' : 'bg-bg-main/70'
        }`}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-16 md:w-16 rounded-lg overflow-hidden ring-2 ring-red-primary/60">
              <Image src={logo} alt="Logo" fill style={{ objectFit: 'cover' }} priority />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-text-white">Veltraxis  Logistics</h1>
              <p className="text-xs md:text-sm text-text-muted">Driven by Speed. Defined by Trust.</p>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-text-light">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="relative group transition text-text-light hover:text-red-primary"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#tracking"
            onClick={(e) => handleNavClick(e, 'tracking')}
            className="rounded-full border border-red-primary bg-red-primary/10 px-4 py-1.5 text-sm font-semibold text-red-primary hover:bg-red-primary/20 transition"
          >
            Track Shipment
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="rounded-full bg-red-primary px-4 py-1.5 text-sm font-semibold text-text-white hover:bg-red-hover transition"
          >
            Request Pickup
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-light border border-text-muted hover:bg-bg-secondary"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-bg-main/60 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-72 bg-bg-secondary p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              {/* <h2 className="text-lg font-semibold text-text-white"></h2> */}
              <button
                className="p-1 rounded-md text-text-light hover:text-text-white hover:bg-bg-main"
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
                  className="text-text-light text-base font-medium hover:text-red-primary transition"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#tracking"
                onClick={(e) => handleNavClick(e, 'tracking')}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-red-primary px-4 py-2 text-sm font-semibold text-text-white hover:bg-red-hover transition"
              >
                Track Shipment
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="inline-flex items-center justify-center rounded-full border border-red-primary bg-transparent px-4 py-2 text-sm font-semibold text-red-primary hover:bg-red-primary hover:text-text-white transition"
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