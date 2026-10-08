import services from '@/data/services';

export default function TestimonialsSection({ params }) {
  const service = services.find((service) => service.id === params.id);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Absolutely reliable and fast! My packages always arrive on time.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Michael Lee',
      text: 'The tracking feature gives me peace of mind. Highly recommended.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Priya Singh',
      text: 'Seamless communication and transparent pricing—exactly what I need.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Customer Testimonials</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-10">
        Trusted by businesses and individuals who rely on punctual, secure delivery.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-2xl"
          >
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover shadow" />
            <p className="text-slate-700 text-center text-lg mb-3">&quot;{t.text}&quot;</p>
            <span className="text-slate-900 font-semibold">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}