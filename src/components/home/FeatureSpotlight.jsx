
import React from 'react';
import { BookOpen, Users, History, ArrowRight, Star, Heart, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../common/FadeIn';

const FeatureSpotlight = () => {
    return (
        <section className="py-24 px-4 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                            Discover Our System
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 font-serif">
                            The HSA Ecosystem
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            A complete educational environment designed for holistic growth. Explore the components that make our system unique.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Component 1: Academic Programs (from Admissions) */}
                    <FadeIn delay={0} className="h-full">
                        <div className="group relative h-full bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src="/images/facilities/IMG_8119.jpg"
                                    alt="Academic Programs"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl z-20 shadow-sm">
                                    <BookOpen className="text-blue-600" size={24} />
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Academic Excellence</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                                    From Kindergarten to Senior High School. We offer specialized tracks including <span className="font-semibold text-blue-600 dark:text-blue-400">STEM, ABM, and HUMSS</span> to prepare students for the future.
                                </p>
                                <ul className="space-y-2 mb-8 text-sm text-gray-500 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <Star size={14} className="text-yellow-500" /> K-12 Compliant Curriculum
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star size={14} className="text-yellow-500" /> College Preparatory Strands
                                    </li>
                                </ul>
                                <Link to="/admissions" className="mt-auto inline-flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold hover:gap-3 transition-all">
                                    <span>View Programs</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Component 2: Student Organizations (from Organizations) */}
                    <FadeIn delay={150} className="h-full">
                        <div className="group relative h-full bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-purple-600/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src="/images/facilities/IMG_8220.jpg"
                                    alt="Student Life"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl z-20 shadow-sm">
                                    <Users className="text-purple-600" size={24} />
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Vibrant Student Life</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                                    Join a community of learners and leaders. With diverse clubs ranging from <span className="font-semibold text-purple-600 dark:text-purple-400">Academic Societies</span> to <span className="font-semibold text-purple-600 dark:text-purple-400">Performing Arts</span>.
                                </p>
                                <ul className="space-y-2 mb-8 text-sm text-gray-500 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <Trophy size={14} className="text-yellow-500" /> 20+ Student Organizations
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Trophy size={14} className="text-yellow-500" /> Leadership Development
                                    </li>
                                </ul>
                                <Link to="/organizations" className="mt-auto inline-flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold hover:gap-3 transition-all">
                                    <span>Explore Clubs</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Component 3: History & Profile (from SchoolProfile) */}
                    <FadeIn delay={300} className="h-full">
                        <div className="group relative h-full bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-green-600/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src="/images/facilities/IMG_8337.jpg"
                                    alt="History"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl z-20 shadow-sm">
                                    <History className="text-green-600" size={24} />
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Legacy & Values</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                                    Founded in 1920, HSA continues its legacy of <span className="font-semibold text-green-600 dark:text-green-400">"Truth in Love"</span>. We are dedicated to the integral formation of the youth of Abra.
                                </p>
                                <ul className="space-y-2 mb-8 text-sm text-gray-500 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <Heart size={14} className="text-red-500" /> 100+ Years of History
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Heart size={14} className="text-red-500" /> Diocesan School System
                                    </li>
                                </ul>
                                <Link to="/school-profile" className="mt-auto inline-flex items-center gap-2 text-green-700 dark:text-green-300 font-bold hover:gap-3 transition-all">
                                    <span>Read Our Story</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default FeatureSpotlight;
