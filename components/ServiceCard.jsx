import React from 'react';
import Link from 'next/link';

const ServiceCard = ({ id, title, description, image, icon }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Icon Overlay */}
        <div className="absolute top-4 left-4 w-14 h-14 bg-gradient-to-r from-cyan-600 to-slate-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <i className={`${icon} text-white text-2xl`}></i>
        </div>

        {/* Hover Content */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Link href={`/services/${id}`}>
            <button className="w-full bg-white/90 backdrop-blur-sm hover:bg-white text-cyan-600 px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
              Learn More →
            </button>
          </Link>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative Line */}
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-slate-500 rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500 delay-200"></div>
    </div>
  );
};

export default ServiceCard;