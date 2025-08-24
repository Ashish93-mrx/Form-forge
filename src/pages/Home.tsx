import { Link } from "react-router-dom";

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
                            to="/Signup"
                            className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition duration-200"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </header>


            {/* Features Section */}
            <section className="flex-1 py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl font-mono font-bold text-center mb-4">
                        Why Choose FormFroge?
                    </h2>
                    <p className="text-gray-600 text-center font-mono max-w-2xl mx-auto mb-16">
                        FormFroge is designed for makers, teams, and businesses who want a
                        fast and simple way to build forms without writing code. Whether
                        you're gathering feedback, running surveys, or managing sign-ups,
                        FormFroge makes it effortless.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-indigo-200 shadow-lg rounded-lg text-center">
                            <div className="text-blue-600 text-4xl mb-4">⚡</div>
                            <h3 className="font-semibold text-lg mb-2">Fast & Easy</h3>
                            <p className="text-gray-600 text-sm font-mono">
                                Create forms quickly with our drag-and-drop builder. No tech skills required.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-indigo-200 shadow-lg rounded-lg text-center">
                            <div className="text-green-600 text-4xl mb-4">📊</div>
                            <h3 className="font-semibold text-lg mb-2">Powerful Insights</h3>
                            <p className="text-gray-600 text-sm font-mono">
                                Collect responses in real time and export data in one click.
                            </p>
                        </div>
                        <div className="p-6 bg-white shadow-indigo-200 shadow-lg rounded-lg text-center">
                            <div className="text-indigo-600 text-4xl mb-4">🌐</div>
                            <h3 className="font-semibold text-lg mb-2">Share Anywhere</h3>
                            <p className="text-gray-600 text-sm font-mono">
                                Share your forms via link or embed them directly in your website.
                            </p>
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
                        <span className="text-gray-500">[ Form Screenshot Preview ]</span>
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
