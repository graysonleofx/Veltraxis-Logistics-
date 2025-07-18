'use client';

import heroImage from './src/assets/hero1.jpeg'

export default function HeroSection() {
  const scrollToTracking = () => {
    document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToService = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${heroImage.src})`
      }}
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <div className="mb-6">
              <span className="text-orange-400 font-semibold text-lg">Pennywise Logistics Transportation Inc.</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome To Pennywise Logistics Company & Transportation Services
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Take your business to the next level with Pennywise Logistics new business management tools. Pennywise Logistics will open a new horizon for us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToTracking}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Track Shipment
              </button>
              <button
              onClick={scrollToService}
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer">
                Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}