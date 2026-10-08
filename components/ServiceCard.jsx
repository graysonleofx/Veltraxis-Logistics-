import React from 'react';
import Link from 'next/link';

const ServiceCard = ({ id, title, description, icon }) => {
  return (
    <div className="group bg-bg-secondary rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 min-h-[280px] flex flex-col">
      <div className="w-16 h-16 bg-gradient-to-r from-red-primary to-bg-secondary rounded-xl flex items-center justify-center mb-6">
        <i className={`${icon} text-text-white text-3xl`}></i>
      </div>

      <h3 className="text-xl font-bold text-text-white mb-3 flex-grow">
        {title}
      </h3>

      <p className="text-text-muted leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      <Link href={`/services/${id}`}>
        <button className="w-full bg-red-primary text-text-white py-3 rounded-lg font-semibold hover:bg-red-primary/90 transition-colors duration-300">
          Learn More →
        </button>
      </Link>
    </div>
  );
};

export default ServiceCard;