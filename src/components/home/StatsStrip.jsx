import React from 'react';
import FadeIn from '../common/FadeIn';

const StatsStrip = () => {
    const stats = [
        { label: "Established", value: "1954" },
        { label: "Students", value: "1,200+" },
        { label: "Faculty Members", value: "85+" },
        { label: "Programs", value: "12" },
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <FadeIn key={index} delay={index * 100}>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold mb-2 font-serif group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-blue-200 uppercase tracking-widest text-xs md:text-sm font-semibold">
                                    {stat.label}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
