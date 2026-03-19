import { Link } from "react-router-dom";
import { useState } from "react";
import formPreview from "../../public/images/formforgepost.png";
import { fast, insight, internet } from "../assets/index";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      
      <header className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white">
       
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

            
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl 
                    opacity-0 group-hover:opacity-100 transition 
                    bg-gradient-to-br from-yellow-500/5 to-transparent"
              />
            </div>

            
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

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-cinzel mb-4">Trusted by Teams Worldwide</h2>
            <p className="text-gray-600 font-mono">Join thousands of companies using FormForge</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
              <p className="text-gray-600 font-mono text-sm">Active Forms</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">2M+</div>
              <p className="text-gray-600 font-mono text-sm">Responses Collected</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <p className="text-gray-600 font-mono text-sm">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <p className="text-gray-600 font-mono text-sm">Support</p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-cinzel">Perfect For Every Use Case</h2>
            <p className="text-gray-600 font-mono max-w-2xl mx-auto">Use FormForge for customer feedback, surveys, event registrations, and more</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Customer Feedback", desc: "Collect actionable feedback to improve your products" },
              { title: "Event Registration", desc: "Streamline signups and manage attendee information" },
              { title: "Surveys & Polls", desc: "Understand customer preferences and market trends" },
              { title: "Job Applications", desc: "Simplify hiring with custom application forms" },
              { title: "Contact Forms", desc: "Professional inquiry forms for your website" },
              { title: "Lead Generation", desc: "Capture qualified leads with smart forms" }
            ].map((useCase, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition">
                <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600 font-mono">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-cinzel">Powerful Features Built In</h2>
            <p className="text-gray-600 font-mono">Everything you need to create professional forms</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "50+ Field Types", desc: "Text, email, file upload, rating, matrix, and more" },
              { title: "Smart Branching", desc: "Create personalized experiences with conditional logic" },
              { title: "Custom Branding", desc: "Add your logo and customize colors to match your brand" },
              { title: "Mobile Optimized", desc: "Forms look perfect on any device automatically" },
              { title: "Response Analytics", desc: "Real-time charts and insights from your data" },
              { title: "Integrations", desc: "Connect with Slack, Gmail, webhooks, and more" }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-600 text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 font-mono">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-indigo-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-cinzel">Loved by Our Users</h2>
            <p className="text-gray-600 font-mono">See what teams are saying about FormForge</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", company: "TechCorp", quote: "FormForge saved us hours on feedback collection. It's incredibly intuitive!" },
              { name: "Marcus Rodriguez", company: "EventHub", quote: "Best form builder we've used. Customer support is outstanding." },
              { name: "Emma Williams", company: "StartupXYZ", quote: "Finally a form tool that doesn't require coding. Highly recommend!" }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 font-mono italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 font-mono">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-cinzel">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 font-mono">Choose the perfect plan for your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "$0", features: ["Up to 10 forms", "100 responses/month", "Basic branding", "Email support"], color: "emerald" },
              { name: "Pro", price: "$29", features: ["Unlimited forms", "50K responses/month", "Custom branding", "Priority support", "Advanced analytics"], highlighted: true, color: "blue" },
              { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Unlimited responses", "Dedicated account manager", "Custom integrations", "SLA support"], color: "orange" }
            ].map((plan, idx) => {
              const colorMap = {
                emerald: { border: "border-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-400", text: "text-emerald-600", button: "bg-emerald-600 hover:bg-emerald-700" },
                blue: { border: "border-blue-600", bg: "bg-blue-50", ring: "ring-blue-400", text: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700" },
                orange: { border: "border-orange-600", bg: "bg-orange-50", ring: "ring-orange-400", text: "text-orange-600", button: "bg-orange-600 hover:bg-orange-700" }
              };
              const colors = colorMap[plan.color];
              
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedPlan(idx)}
                  className={`rounded-lg p-8 border transition cursor-pointer ${
                    selectedPlan === idx 
                      ? `${colors.border} ${colors.bg} shadow-lg ring-2 ${colors.ring} transform scale-105` 
                      : plan.highlighted 
                      ? `${colors.border} ${colors.bg} shadow-lg ring-2 ${colors.ring}`
                      : "border-gray-200 bg-white hover:shadow-lg hover:border-gray-300"
                  }`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className={`text-3xl font-bold ${colors.text} mb-6`}>{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm text-gray-600 font-mono`}>
                        <span className={colors.text}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-lg font-semibold transition text-white ${
                    selectedPlan === idx
                      ? `${colors.button} shadow-md`
                      : plan.highlighted 
                      ? colors.button
                      : "border border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}>
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-cinzel">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Do I need coding skills?", a: "No! FormForge is designed for everyone. Our drag-and-drop builder requires zero coding." },
              { q: "Can I export my data?", a: "Yes! Export all responses as CSV or connect to other tools via integrations." },
              { q: "Is there a free trial?", a: "Start with our Free plan with 10 forms and 100 responses/month." },
              { q: "How secure is my data?", a: "Your data is encrypted and stored securely. We're GDPR and CCPA compliant." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 font-mono">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-cinzel">Ready to Transform Your Forms?</h2>
          <p className="text-lg text-indigo-100 mb-8 font-mono max-w-2xl mx-auto">Join thousands of businesses creating amazing forms with FormForge. Start free, no credit card required.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <a href="#" className="px-8 py-4 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition border border-indigo-500">
              Watch Demo
            </a>
          </div>
          <p className="text-indigo-200 text-sm mt-8 font-mono">No credit card required. Takes 2 minutes to get started.</p>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}
