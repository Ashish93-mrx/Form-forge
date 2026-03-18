import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4 font-cinzel">
              FormFroge
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              The modern form builder for creators, teams, and enterprises who demand excellence.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition duration-200 text-xs sm:text-sm font-semibold"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <span className="text-gray-600">·</span>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition duration-200 text-xs sm:text-sm font-semibold"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <span className="text-gray-600">·</span>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition duration-200 text-xs sm:text-sm font-semibold"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span className="text-gray-600">·</span>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition duration-200 text-xs sm:text-sm font-semibold"
                aria-label="YouTube"
              >
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@formfroge.com"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200 flex items-center gap-2"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  support@formfroge.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200 flex items-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>San Francisco, CA 94102<br />United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12 py-8 px-6 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-lg">
          <div className="max-w-md">
            <h4 className="text-white font-semibold text-sm mb-2">
              Stay Updated
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Get the latest features, updates, and tips delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} FormFroge, Inc. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                Compliance
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="text-xs text-gray-400 hover:text-indigo-400 transition"
              aria-label="Back to top"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </footer>
  );
}
