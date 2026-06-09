import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-light tracking-[0.2em] text-gray-900 mb-4">
              AETHEL
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Quiet luxury for the discerning contemporary wardrobe.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 tracking-[0.15em] uppercase mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Column */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 tracking-[0.15em] uppercase mb-5">
              Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 tracking-[0.15em] uppercase mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-end items-center">
          <p className="text-xs text-gray-400">
            © 2026 AETHEL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
