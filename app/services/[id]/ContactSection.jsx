import services from '@/data/services';
import Link from 'next/link';

export default function ContactSection({ params }) {
  const service = services.find((service) => service.id === params.id);

  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 py-14 sm:py-18">
      <div className="bg-gradient-to-r from-red-primary to-bg-secondary text-white rounded-3xl shadow-2xl border border-red-primary/20 p-8 sm:p-10">
        <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-cyan-100 text-lg sm:text-xl leading-relaxed mb-6">
              Connect with a logistics specialist for {service.title} and get a custom delivery plan fast.
            </p>
            <p className="text-cyan-100 text-sm sm:text-base opacity-90">
              We provide a tailored quote and timeline, with dedicated support during the entire transit lifecycle.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href="/#contact"
              className="block w-full text-center rounded-full bg-white/95 text-red-primary font-bold px-6 py-3 hover:bg-white transition"
            >
              Contact Us
            </a>
            <a
              href="mailto:sales@shipwidelogistics.online"
              className="block w-full text-center rounded-full border border-white/70 bg-white/5 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
            >
              Email Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}