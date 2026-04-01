'use client';

import woman1 from '@/public/assets/woman.jpg'
import woman2 from '@/public/assets/Stéphanie.jpg'
import man from '@/public/assets/man.jpg'
import Image from 'next/image';

const testimonials = [
  {
    name: 'Mary K. Miller',
    role: 'Manages E-commerce at ShopEase',
    feedback: 'GlobalAxis Logistics has transformed our operations. They are prompt, dependable, and always maintain professionalism.',
    avatar: woman1
  },
  {
    name: 'Charlie V. Lecroy',
    role: 'Leads Supply Chain at TechNova',
    feedback: 'Their tracking tools and support team are excellent. I highly recommend them to any expanding business.',
    avatar: man
  },
  {
    name: 'Tracey J. Kirby',
    role: 'Directs Operations at FreshMart',
    feedback: 'GlobalAxis Logistics is our trusted logistics partner. Deliveries are always timely and communication is clear.',
    avatar: woman2
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider mb-2 block">What our clients say</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Trusted by organizations around the world</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mt-4">Real customer success stories that prove our logistics platform is fast, reliable, and consistently high-performing.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white/10 border border-white/15 rounded-2xl p-8 backdrop-blur-xl shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-cyan-300"
                />
              </div>
              <p className="text-slate-100 text-center mb-4 italic">“{t.feedback}”</p>
              <div className="text-center">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-slate-300">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}