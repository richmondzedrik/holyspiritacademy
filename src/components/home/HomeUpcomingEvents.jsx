import React, { useEffect, useState } from 'react';
import { getEvents } from '../../services/eventService';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../common/FadeIn';

const HomeUpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const data = await getEvents();
                // Take only the first 3 events for the home preview
                setEvents(data.slice(0, 3));
            } catch (error) {
                console.error("Failed to load events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsData();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-500">Loading upcoming events...</p>
                </div>
            </section>
        );
    }

    if (events.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl -ml-20 -mb-20 opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeIn>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-block mb-4">
                                <span className="py-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm tracking-wide uppercase">
                                    Mark Your Calendars
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Events</span>
                            </h2>
                        </div>
                        <Link
                            to="/upcoming-events"
                            className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            View All Events
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {events.map((event, index) => (
                        <FadeIn key={event.id} delay={index * 100}>
                            <article className="group relative bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 h-full flex flex-col hover:-translate-y-2">
                                <div className="absolute top-8 right-8 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {event.category}
                                </div>

                                <div className="mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                        {(() => {
                                            const dateStr = event.date || '';
                                            const parts = dateStr.split(' ');
                                            const month = parts[0] ? parts[0].substring(0, 3) : '';
                                            const day = parts[1] ? parts[1].replace(',', '') : '';

                                            return (
                                                <>
                                                    <span className="text-xs font-medium uppercase opacity-90">{month}</span>
                                                    <span className="text-2xl font-bold leading-none">{day || '?'}</span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {event.title}
                                </h3>

                                <div className="space-y-3 mb-8 text-gray-600 dark:text-gray-400 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Clock size={18} className="text-blue-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin size={18} className="text-blue-500" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Link
                                        to="/upcoming-events"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                    >
                                        Event Details
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeUpcomingEvents;
