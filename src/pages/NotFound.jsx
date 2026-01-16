import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Home } from 'lucide-react';
import SEO from '../components/common/SEO';
import hsabImage from '../assets/hsab.jpg';

const NotFound = () => {
    return (
        <>
            <SEO
                title="Page Not Found - Holy Spirit Academy of Bangued"
                description="The page you are looking for does not exist."
            />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-20"
                    style={{ backgroundImage: `url(${hsabImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900/50" />

                <div className="relative z-10 max-w-2xl px-4 text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full border border-blue-200 dark:border-blue-800 animate-pulse">
                            <MapPin size={64} className="text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>

                    <h1 className="text-8xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">404</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        Lost on Campus?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg mx-auto">
                        The page you are looking for seems to have gone on a field trip. Let's get you back to the main grounds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
                        >
                            <Home size={20} />
                            Return Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-700 font-bold rounded-xl transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
