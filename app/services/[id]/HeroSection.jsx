import services from '@/data/services';

export default function HeroSection({ params }) {
  const service = services.find((service) => service.id === params.id);

  return (
    <section className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] overflow-hidden"
      style={{
          top: '-98px',
          objectFit: 'cover',
        }}
    >
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 via-slate-900/50 to-cyan-900/70" />

      <div className="relative top-12 z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl text-center mx-auto">
          <span className="text-cyan-300 font-semibold uppercase tracking-widest text-sm sm:text-base">
            Service spotlight
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {service.title}
          </h1>
          <p className="mt-4 text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed">
            {service.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#overview"
              className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-3 font-semibold shadow-lg transition-all"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="rounded-full border border-cyan-400 text-cyan-100 hover:bg-cyan-500/25 px-7 py-3 font-semibold transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}