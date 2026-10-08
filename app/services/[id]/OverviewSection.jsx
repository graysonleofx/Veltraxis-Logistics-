import services from '@/data/services';

export default function OverviewSection({ params }) {
  const service = services.find((service) => service.id === params.id);

  return (
    <section id="overview" className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">Overview</h2>
            <p className="text-slate-700 text-lg sm:text-xl leading-relaxed mb-5">
              Our <span className="font-semibold text-red-primary">{service.title}</span> is engineered for modern supply chains that require speed, reliability, and full transparency.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-primary" />
                <span>Fast, trackable delivery with real-time status updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-primary" />
                <span>Flexible pick-up and drop-off time windows tailored to your schedule.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-primary" />
                <span>Industry-leading safety protocols for every package.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-primary" />
                <span>Dedicated support and transparent billing with no hidden fees.</span>
              </li>
            </ul>
          </div>

          <div className="p-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-red-primary/20">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-72 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}