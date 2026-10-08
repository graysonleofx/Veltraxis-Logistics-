'use client';

import fedx from './src/assets/hero.jpeg'

const partners = [
  { name: 'FedEx', logo: 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png' },
  { name: 'DHL', logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg' },
  { name: 'UPS', logo: 'https://www.ups.com/webassets/icons/logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
];

export default function TrustedBySection() {
  return (
    <section id="trusted" className="py-16 bg-bg-main">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-text-white">Trusted by Global Partners</h3>
        </div>

        <div className="mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-bg-secondary border border-text-muted rounded-xl p-4 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 max-w-[110px] object-contain filter grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}