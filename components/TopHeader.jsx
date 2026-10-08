export default function TopHeader() {
  return (
    <div className="bg-bg-main text-text-light">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:contact@veltraxislogistics.online"
            className="inline-flex items-center gap-2 text-text-light transition hover:text-red-primary"
          >
            <i className="ri-mail-line text-sm text-red-primary"></i>
            contact@veltraxislogistics.online
          </a>
          <a
            href="tel:+18255726366"
            className="inline-flex items-center gap-2 text-text-light transition hover:text-red-primary"
          >
            <i className="ri-phone-line text-sm text-red-primary"></i>
            +1 (825) 000-0000
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-end">
          <span className="inline-flex items-center gap-2 text-text-muted">
            <i className="ri-time-line text-sm text-red-primary"></i>
            24/7 Support
          </span>
          <a href="#tracking" className="text-red-primary transition hover:text-text-white">
            Track Shipment
          </a>
        </div>
      </div>
    </div>
  );
}