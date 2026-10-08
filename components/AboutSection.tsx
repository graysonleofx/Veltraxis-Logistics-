'use client';

import React from 'react';
import logisticsWorker from '@/public/assets/delivery.jpg'
import Image from 'next/image';

export default function AboutSection() {
  const highlights = [
    { icon: 'ri-truck-line', title: 'Fast & Reliable Delivery', desc: 'Timely and secure transportation worldwide' },
    { icon: 'ri-global-line', title: 'Global Network', desc: 'Operating in 45+ countries with extensive reach' },
    { icon: 'ri-shield-check-line', title: 'Secure Logistics', desc: 'Ensuring your items arrive safely intact' }
  ];

  return (
    <section id="about" className="py-20 bg-bg-main relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-primary rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-bg-secondary rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-red-primary/10 text-red-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
                Who We Are
              </span>
              <h2 className="text-5xl font-bold text-text-white mb-6 leading-tight">
                We ensure your goods arrive{' '}
                <span className="text-transparent bg-clip-text bg-red-primary">
                  safely and in perfect condition.
                </span>
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                  Veltraxis Logistics delivers expert air freight services, combining industry insight and advanced solutions to optimize every stage of your supply chain. Enhance efficiency with our technology-driven logistics expertise.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col items-start p-6 bg-bg-secondary rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-primary to-bg-secondary rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <i className={`${highlight.icon} text-text-white text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-text-white font-semibold mb-2">{highlight.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed">{highlight.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="bg-gradient-to-r from-red-primary to-bg-secondary text-text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-primary/90 hover:to-bg-secondary/90 transition-all duration-300 shadow-xl">
              Learn More About Us
            </button>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src={logisticsWorker}
                alt="Logistics Worker"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -right-6 bg-bg-secondary rounded-2xl p-6 shadow-2xl z-20 animate-pulse">
              <div className="text-center">
                <div className="text-4xl font-bold text-text-white mb-2">40</div>
                <div className="text-sm text-text-muted uppercase tracking-wide">Years of Experience</div>
                <div className="w-12 h-1 bg-gradient-to-r from-red-primary to-bg-secondary mx-auto mt-2 rounded-full"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-red-primary/50 rounded-full opacity-50 animate-bounce"></div>
            <div className="absolute top-1/4 -right-8 w-12 h-12 bg-bg-secondary/70 rounded-full opacity-70 animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
}