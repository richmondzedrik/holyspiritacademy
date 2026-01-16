import React from 'react';
import { ArrowRight, Trophy, Users, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../common/FadeIn';

const StudentLifeHighlights = () => {
    const highlights = [
        {
            title: 'Student Organizations',
            description: 'Join over 20+ clubs ranging from academic societies to performing arts.',
            icon: Users,
            link: '/organizations',
            color: 'from-blue-500 to-blue-600',
            delay: 0
        },
        {
            title: 'Academic Achievements',
            description: 'Celebrating excellence in regional and national competitions.',
            icon: Trophy,
            link: '/achievements',
            color: 'from-yellow-400 to-orange-500',
            delay: 100
        },
        {
            title: 'Holistic Development',
            description: 'Programs designed to nurture character, faith, and leadership.',
            icon: Star,
            link: '/vision-mission',
            color: 'from-green-500 to-emerald-600',
            delay: 200
        }
    ];

    return (
        <section className="py-24 px-4 bg-gray-50 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 transform rotate-45">
                <Sparkles size={300} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-3 block">Life at HSAB</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                            Beyond the Classroom
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            We believe in educating the whole child. Our vibrant campus life offers endless opportunities for growth.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <FadeIn key={item.title} delay={item.delay}>
                            <Link
                                to={item.link}
                                className="group relative block h-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-[4rem] transition-transform group-hover:scale-150 duration-700`}></div>

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={28} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide group-hover:gap-3 transition-all">
                                    <span>Explore</span>
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentLifeHighlights;
