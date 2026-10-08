import services from '@/data/services';
import { TruckIcon, ClockIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function FeatureSection({ params }) {
  const service = services.find((service) => service.id === params.id);

  const features = [
    { icon: TruckIcon, title: 'Express Delivery', desc: 'Priority-curated transport routes for reduced transit time.' },
    { icon: ClockIcon, title: 'Precise Timing', desc: 'Flexible delivery windows with guaranteed on-time arrival.' },
    { icon: ShieldCheckIcon, title: 'Secure Handling', desc: 'AWS-style safety protocol with full chain-of-custody visibility.' },
    { icon: PhoneIcon, title: 'Support Assurance', desc: '24/7 support line with a dedicated logistics coordinator.' },
  ];

  return (
    <section id="features" className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Key Features</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-10">
        {service.title} delivers a balanced mix of speed, visibility, and safety to meet enterprise-level logistics expectations.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex items-start gap-4 transition-shadow duration-300 hover:shadow-2xl"
            >
              <span className="bg-red-primary text-white rounded-xl p-3">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}