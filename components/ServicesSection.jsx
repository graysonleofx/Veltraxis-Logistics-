'use client';

import { useEffect, useState } from 'react';
import services from '@/data/services';
import ServiceCard from '@/components/ServiceCard.jsx';

export default function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(services.map((_, index) => index));
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" className="py-20 bg-bg-main relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-primary/10 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-bg-secondary/10 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-primary/5 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-text-white font-semibold px-6 py-2 rounded-full text-lg mb-6 shadow-lg">
            Our Services
          </span>
          <h2 className="text-5xl font-bold text-text-white mb-6 leading-tight">
            From Pickup to Delivery{' '}
            <span className="text-transparent bg-clip-text bg-red-primary">
              Everything Logistics
            </span>
          </h2>
          <p className="text-text-muted text-lg max-w-3xl mx-auto leading-relaxed">
            We deliver end-to-end logistics solutions tailored to your unique business needs from freight and warehousing to distribution and specialized logistics management. Our experienced team ensures your supply chain runs smoothly with reliable, cost-efficient execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-700 transform ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-primary to-bg-secondary text-text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Have specific logistics needs?</h3>
            <p className="text-text-light mb-6 text-lg">
              Connect with our experts and get a customized solution designed for your business.
            </p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-text-white text-red-primary px-8 py-3 rounded-full font-semibold hover:bg-text-light transition-colors duration-300 shadow-lg"
            >
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}