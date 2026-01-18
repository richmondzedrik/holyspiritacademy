import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, HelpCircle, User } from 'lucide-react';
import FadeIn from '../common/FadeIn';

const QuickAccess = () => {
    const links = [
        { icon: BookOpen, label: 'Admissions', to: '/admissions', desc: 'Apply Now' },
        { icon: User, label: 'Student Portal', to: '/login', desc: 'Access Grades' },
        { icon: Calendar, label: 'School Calendar', to: '/upcoming-events', desc: 'View Events' },
        { icon: HelpCircle, label: 'Inquiries', to: '/contact', desc: 'Get Help' },
    ];

    return (
        <div className="relative z-20 -mt-16 sm:-mt-20 mb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <FadeIn delay={200}>
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-4 md:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <link.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">{link.label}</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{link.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default QuickAccess;
