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
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-100 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-50 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-cyan-600 to-slate-600 text-white font-semibold px-6 py-2 rounded-full text-lg mb-6 shadow-lg">
            Our Services
          </span>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            A Broad Range of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-slate-600">
              Logistics Solutions
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We are dedicated to providing end-to-end logistics services tailored to the unique requirements of each client. Our offerings cover everything from freight transport and warehousing to distribution and specialized logistics management. Rely on our experienced team to optimize your supply chain with dependable and cost-efficient solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                image={service.image}
                icon={service.icon}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-600 to-slate-600 text-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Need Custom Logistics Solutions?</h3>
            <p className="text-slate-100 mb-6 text-lg">
              Contact our experts to discuss your specific requirements and get a tailored solution.
            </p>
            <button className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors duration-300 shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}