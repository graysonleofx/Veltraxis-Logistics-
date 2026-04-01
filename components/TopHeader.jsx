// Create a professional top header bar for a logistics company using Tailwind CSS
// Include left-aligned company email and phone number
// Include right-aligned business hours with a clock icon
// Make it responsive: stack on small screens, flex on medium and above
// Use a dark background with subtle text color
// Make it look clean, modern, and corporate
export default function TopHeader() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-800/95 backdrop-blur border-b border-slate-700 text-slate-100 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 px-4 py-2 md:px-12 md:py-2">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center text-xs md:text-sm">
          <a href="mailto:contact-us@globalaxislogistics.online" className="inline-flex items-center gap-2 hover:text-cyan-300 transition-colors">
            <i className="ri-mail-line text-cyan-300 text-base"></i>
            contact-us@globalaxislogistics.com
          </a>
          <a href="tel:+15156358402" className="inline-flex items-center gap-2 hover:text-cyan-300 transition-colors">
            <i className="ri-phone-line text-cyan-300 text-base"></i>
            +1 (000) 000-0000
          </a>
          <span className="inline-flex items-center gap-2 text-slate-300">
            <i className="ri-time-line text-cyan-300 text-base"></i>
            24/7 Support
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs md:text-sm">
          <span className="inline-flex items-center gap-2 text-slate-300 bg-slate-900/40 backdrop-blur rounded-full px-3 py-1">
            <i className="ri-truck-line text-cyan-300 text-base"></i>
            Fast Global Delivery
          </span>
          <a href="#contact" className="rounded-full border border-cyan-300 bg-cyan-600/10 px-4 py-1.5 font-semibold text-cyan-200 hover:bg-cyan-500 hover:text-white transition" aria-label="Get a quote">
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}