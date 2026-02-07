import { Link } from "react-router-dom";
import formPreview from "../../public/images/formforgepost.png";
import { fast, insight, internet } from "../assets/index";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white">
        {/* Faded overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 font-cinzel">
            Build Forms Effortlessly with{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              FormFroge
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-mono">
            Create, share, and collect responses in minutes. No coding required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="relative inline-block px-6 py-3 font-semibold text-gray-900 rounded-lg overflow-hidden shadow-lg bg-yellow-400 hover:shadow-xl transition duration-200"
            >
              <span className="relative z-10">Get Started</span>

              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"></span>
            </Link>

            <Link
              to="/signup"
              className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition duration-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <section className="flex-1 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div
              className="group relative rounded-2xl bg-white/70 backdrop-blur border border-gray-200 
                  p-8 shadow-sm transition-all duration-300 
                  hover:-translate-y-2 hover:shadow-xl hover:border-yellow-300"
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl 
                    bg-gradient-to-br from-yellow-500 to-yellow-600 text-white 
                    "
              >
                <img src={fast} className="w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast & Intuitive
              </h3>
              <p className="text-sm text-gray-600 font-mono leading-relaxed">
                Build forms instantly with a drag-and-drop experience designed
                for speed, clarity, and zero learning curve.
              </p>

              {/* subtle hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl 
                    opacity-0 group-hover:opacity-100 transition 
                    bg-gradient-to-br from-yellow-500/5 to-transparent"
              />
            </div>

            {/* Card 2 */}
            <div
              className="group relative rounded-2xl bg-white/70 backdrop-blur border border-gray-200 
                  p-8 shadow-sm transition-all duration-300 
                  hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300"
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl 
                    bg-gradient-to-br from-emerald-500 to-emerald-600 text-white 
                    "
              >
                <img src={insight} className="w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Insights
              </h3>
              <p className="text-sm text-gray-600 font-mono leading-relaxed">
                Collect and analyze responses as they arrive. Export clean,
                structured data anytime with a single click.
              </p>

              <div
                className="pointer-events-none absolute inset-0 rounded-2xl 
                    opacity-0 group-hover:opacity-100 transition 
                    bg-gradient-to-br from-emerald-500/5 to-transparent"
              />
            </div>

            {/* Card 3 */}
            <div
              className="group relative rounded-2xl bg-white/70 backdrop-blur border border-gray-200 
                  p-8 shadow-sm transition-all duration-300 
                  hover:-translate-y-2 hover:shadow-xl hover:border-orange-300"
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl 
                    bg-gradient-to-br from-orange-500 to-orange-600 text-white 
                    "
              >
                <img src={internet} className="w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Share Anywhere
              </h3>
              <p className="text-sm text-gray-600 font-mono leading-relaxed">
                Publish instantly with a public link or embed forms directly
                into your website — fully responsive by default.
              </p>

              <div
                className="pointer-events-none absolute inset-0 rounded-2xl 
                    opacity-0 group-hover:opacity-100 transition 
                    bg-gradient-to-br from-orange-500/5 to-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-gradient-to-t from-indigo-200 via-white border-t to-indigo-100 border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6  font-cinzel">
              Design. Share. Collect.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-mono">
              FormFroge helps you focus on collecting meaningful data, while we
              take care of design, responsiveness, and integrations.
            </p>
            <Link
              to="/signup"
              className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition duration-200"
            >
              Try It Now
            </Link>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-xl h-72 flex items-center justify-center shadow-inner">
            {/* Placeholder for screenshot */}
            <div className="bg-gray-100 border border-gray-200 rounded-xl h-80 flex items-center justify-center shadow-inner overflow-hidden">
              <img
                src={formPreview}
                alt="Form preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FormFroge. All rights reserved.
          </p>
          <div className="space-x-6 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
