'use client';


const payments = [
  { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { name: 'Visa', logo: '/assets/visa.png'},
  { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  // { name: 'American Express', logo: '../components/src/assets/dls-logo-stack.svg'}
];

export default function PaymentMethodsSection() {
  return (
    <section id="payments" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-10">
          <span className="text-cyan-600 font-semibold uppercase text-sm tracking-wider">Payment Options</span>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Flexible & Secure Payment Methods</h3>
          <p className="text-slate-600 max-w-2xl mx-auto mt-3">Choose the payment plan that fits your business needs. We support leading global networks for smooth transactions.</p>
        </div>

        <div className="mx-auto pl-[190px] grid grid-cols-2  sm:grid-cols-4 gap-6 max-w-4xl">
          {payments.map((p, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src={p.logo} alt={p.name} className="h-10 max-w-[90px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}