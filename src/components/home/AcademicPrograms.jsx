import React from 'react';
import { ArrowRight, Book, GraduationCap, Shapes, Sparkles } from 'lucide-react';
import FadeIn from '../common/FadeIn';

const AcademicPrograms = () => {
    const programs = [
        {
            title: "Preschool",
            subtitle: "Early Childhood Education",
            desc: "Nurturing curiosity and creativity in a safe, play-based environment designed for our youngest learners.",
            icon: Shapes,
            color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
        },
        {
            title: "Grade School",
            subtitle: "Primary Education",
            desc: "Building a strong foundation in core subjects while developing essential social and critical thinking skills.",
            icon: Book,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        },
        {
            title: "High School",
            subtitle: "Junior & Senior High",
            desc: "Prepare for college and career with specialized tracks (STEM, ABM, HUMSS) and rigorous academic training.",
            icon: GraduationCap,
            color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
        }
    ];

    return (
        <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
                <FadeIn>
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 font-serif">Academic Offerings</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                            We offer a complete educational journey, supporting students at every stage of their development.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <FadeIn key={index} delay={index * 150} className="h-full">
                            <div className="group bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 dark:border-slate-700 relative overflow-hidden flex flex-col">
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform group-hover:scale-150 duration-700 ${program.color.split(' ')[0]}`}></div>

                                <div className={`w-16 h-16 rounded-2xl ${program.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <program.icon size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 font-serif">{program.title}</h3>
                                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">{program.subtitle}</p>

                                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed flex-grow">
                                    {program.desc}
                                </p>

                                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold group-hover:gap-4 transition-all mt-auto cursor-pointer">
                                    <span>Learn More</span>
                                    <ArrowRight size={18} className="text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicPrograms;
