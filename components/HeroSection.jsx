'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef(null);

  const slides = [
    '/assets/hero.jpg',
    '/assets/heroo.jpg',
    '/assets/herooo.jpg',
  ];

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

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const scrollToTracking = () => {
    document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
      <section
        id="home"
        ref={sectionRef}
        className="min-h-screen bg-cover bg-center bg-no-repeat relative transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${slides[activeSlide]})`,
          top: '-98px',
          objectFit: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-cyan-900/60"></div>

        <button
          onClick={goToPrevious}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-slate-900/50 text-white p-3 shadow-lg backdrop-blur-sm transition hover:bg-slate-900/70"
        >
          ‹
        </button>

        <button
          onClick={goToNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-slate-900/50 text-white p-3 shadow-lg backdrop-blur-sm transition hover:bg-slate-900/70"
        >
          ›
        </button>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all ${index === activeSlide ? 'bg-cyan-300 scale-125' : 'bg-white/60 hover:bg-white'}`}
            />
          ))}
        </div>

        <div className="relative top-10 z-10 container mx-auto px-4 py-20">
          <div className="flex items-center justify-center h-[calc(100vh-150px)]">
            <div className={` w-full max-w-4xl text-center border  p-8 shadow-2xl backdrop-blur ${isVisible ? 'animate-slideInRight' : ''}`}>
              <h1 className={`text-4xl md:text-7xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent ${isVisible ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.2s' }}>
                Fast, Reliable Logistics Solutions
              </h1>
              <p className={`text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto ${isVisible ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.4s' }}>
                GlobalAxis Logistics delivers excellence in freight management, warehousing, and global transportation. Experience seamless operations that drive your business forward.
              </p>
              <div className="flex items-center justify-center sm:flex-row gap-6">
                <button
                  onClick={scrollToTracking}
                  className={`bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 ${isVisible ? 'animate-slideInRight' : ''}`}
                  style={{ animationDelay: '0.6s' }}
                >
                  Track Your Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}