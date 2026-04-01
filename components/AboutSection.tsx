'use client';

import { useState, useEffect } from 'react';
import logisticsWorker from '@/public/assets/delivery.jpg'
import Image from 'next/image';

export default function AboutSection() {
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    { number: 80000, label: 'Successful Delivery', icon: 'ri-truck-line' },
    { number: 456, label: 'Top Freight', icon: 'ri-ship-line' },
    { number: 45, label: 'Countries of Operation', icon: 'ri-global-line' },
    { number: 325, label: 'Satisfaction Clients', icon: 'ri-user-star-line' }
  ];

  const services = [
    'Container Freight',
    'Frozen Goods Transport',
    'Intermodal Logistics',
    'Sea Road Trucking',
    'Rail Freight Services',
    'Project Cargo Shipping'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => prev.map((count, index) => {
        if (count < stats[index].number) {
          return count + Math.ceil(stats[index].number / 100);
        }
        return stats[index].number;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-slate-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section with Animation */}
        <div className="bg-gradient-to-r from-cyan-600 to-slate-700 rounded-3xl p-8 mb-16 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <div className="text-4xl font-bold text-white mb-2 font-mono">
                  {counters[index].toLocaleString()}{stat.number === 80000 ? 'k' : ''}
                </div>
                <div className="text-cyan-100 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-cyan-100 text-cyan-800 font-semibold px-4 py-2 rounded-full text-sm mb-4">
                Who We Are
              </span>
              <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                We ensure your items arrive{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-slate-600">
                  safely and intact
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                  GlobalAxis Logistics offers expert air freight services, providing the insight and solutions needed to optimize every mile of your supply chain. Experience enhanced transport and logistics efficiency with our advanced supply chain technology and expertise.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-slate-500 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-check-line text-white text-lg"></i>
                  </div>
                  <span className="text-slate-800 font-medium">{service}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-cyan-600 to-slate-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-phone-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-cyan-100">Have Questions?</p>
                  <p className="text-2xl font-bold">Call Us Any Time</p>
                </div>
              </div>
              <p className="text-white text-xl font-semibold">+1 223-000-0000</p>
            </div>
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
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl z-20 animate-pulse">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">40</div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Years of Experience</div>
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-slate-500 mx-auto mt-2 rounded-full"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-cyan-200 rounded-full opacity-50 animate-bounce"></div>
            <div className="absolute top-1/4 -right-8 w-12 h-12 bg-slate-300 rounded-full opacity-70 animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
}