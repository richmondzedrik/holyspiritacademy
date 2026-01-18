import React from 'react';
import { Quote } from 'lucide-react';
import FadeIn from '../common/FadeIn';

const WelcomeSection = () => {
    return (
        <section className="py-20 px-4 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FadeIn direction="right">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 text-blue-100 dark:text-slate-800">
                                <Quote size={120} />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Welcome Message</h2>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                    Educating the Mind, <br />
                                    <span className="italic text-gray-400 font-light">Transforming the Heart</span>
                                </h3>
                                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                                    <p>
                                        Welcome to <strong className="text-gray-900 dark:text-white font-semibold">Holy Spirit Academy of Bangued</strong>. For decades, we have dedicated ourselves to nurturing not just brilliant minds, but compassionate leaders who will shape the future.
                                    </p>
                                    <p>
                                        Our commitment goes beyond academic excellence; we strive to instill values that will guide our students through life's challenges. We invite you to be part of our growing family.
                                    </p>
                                </div>
                                <div className="mt-10 flex items-center gap-6">
                                    {/* Placeholder for Principal's Signature/Image */}
                                    <div className="h-16 w-16 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Photo</div>
                                    </div>
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-bold text-xl font-serif">Rev. Fr. Name Here</p>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm uppercase tracking-wider">School Director</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="left" delay={200}>
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                                alt="School Building"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
