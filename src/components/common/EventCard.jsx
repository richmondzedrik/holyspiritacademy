import React from 'react';
import { Calendar, Clock, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const EventCard = ({ event }) => {
    // Robust date parsing
    const getEventDate = () => {
        try {
            // If it's already a Date object
            if (event.date instanceof Date) return event.date;

            // If it's a Firestore timestamp
            if (event.date?.toDate) return event.date.toDate();

            // If it's a string, try parsing
            const parsed = new Date(event.date);
            if (!isNaN(parsed.getTime())) return parsed;

            // Fallback for custom formats if needed, or return current date to avoid crash
            return new Date();
        } catch (e) {
            return new Date();
        }
    };

    const dateObj = getEventDate();
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
    const day = dateObj.toLocaleDateString('en-US', { day: 'numeric' });
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

    // Sanitize description if it exists
    const cleanDescription = event.description ? DOMPurify.sanitize(event.description) : '';

    return (
        <div className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500">
            {/* Top accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <div className="p-6 md:p-8 flex flex-col h-full relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                    <Calendar size={120} className="text-blue-600" />
                </div>

                <div className="flex justify-between items-start mb-6 z-10">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-700 border border-blue-100 dark:border-slate-600 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300 shadow-sm group-hover:shadow-md">
                        <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">{month}</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors">{day}</span>
                    </div>
                    {event.category && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-xs font-semibold text-blue-600 dark:text-blue-300">
                            <Tag size={12} />
                            {event.category}
                        </span>
                    )}
                </div>

                <div className="mb-4 z-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">{weekday}</p>
                </div>

                <div className="space-y-3 mb-6 z-10">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center text-blue-500 shrink-0">
                            <Clock size={16} />
                        </div>
                        <span className="font-medium">{event.time || "Time not specified"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center text-indigo-500 shrink-0">
                            <MapPin size={16} />
                        </div>
                        <span className="font-medium">{event.location || "Location not specified"}</span>
                    </div>
                </div>

                {/* Description snippet if available */}
                {event.description && (
                    <div
                        className="mt-auto mb-6 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 prose prose-sm dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: cleanDescription }}
                    />
                )}

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700 z-10">
                    <Link to={`/upcoming-events/${event.id}`} className="w-full group/btn flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        Event Details
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
