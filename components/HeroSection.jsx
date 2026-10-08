'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToTracking = () => {
    document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-main/90"
    >
      <div className="absolute inset-0 bg-[url('/assets/hero2.jpg')] bg-cover bg-center opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-bg-main/95 via-bg-main/70 to-red-primary/40" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] items-center px-4 py-24 sm:px-6 lg:px-8">
        <div
          className={`w-full max-w-3xl rounded-[2rem] border border-text-muted/10 bg-bg-main/70 p-8 shadow-2xl shadow-bg-main/40 backdrop-blur-lg transition duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-6 text-center sm:text-left">
            <p className="inline-flex items-center rounded-full bg-red-primary/10 px-4 py-2 text-sm font-semibold text-red-primary">
              <i className="ri-truck-line mr-2 text-lg text-red-primary" />
              Premium logistics for global commerce
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-text-white sm:text-5xl md:text-6xl">
              Speed You Can Trust. Delivery You Can Rely On
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-text-muted sm:mx-0 sm:text-lg">
              We move your goods securely with advanced tracking, streamlined freight systems, and reliable support at every step
            </p>
            <div className="flex flex-col items-center justify-start gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={scrollToTracking}
                className="inline-flex items-center justify-center rounded-full bg-red-primary px-6 py-3 text-sm font-semibold text-text-white shadow-lg shadow-red-primary/20 transition hover:bg-red-hover"
              >
                Track Your Shipment
              </button>
              {/* <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center rounded-full border border-text-muted bg-bg-secondary/5 px-6 py-3 text-sm font-semibold text-text-light transition hover:border-red-primary hover:text-red-primary"
              >
                Get a Quote
              </button> */}
            </div>
            {/* <div className="mt-6 rounded-3xl border border-slate-800 bg-white/5 p-4 shadow-sm shadow-slate-950/10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="tracking-input">
                  Tracking number
                </label>
                <input
                  id="tracking-input"
                  type="text"
                  placeholder="Enter shipment ID or tracking number"
                  className="flex-1 rounded-full border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
                >
                  Check Status
                </button>
              </div>
            </div> */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="inline-flex items-center gap-3 rounded-3xl bg-bg-secondary/5 px-4 py-3 text-sm text-text-muted">
                <i className="ri-shield-check-line text-red-primary text-lg" />
                Trusted by 5,000+ businesses worldwide
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-bg-secondary/5 px-4 py-3 text-sm text-text-muted">
                <i className="ri-bar-chart-line text-red-primary text-lg" />
                99.9% on-time delivery rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}