import React, { useEffect, useState } from 'react';
import { getEvents } from '../../services/eventService';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../common/FadeIn';
import EventCard from '../common/EventCard';

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
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading upcoming events...</p>
                </div>
            </section>
        );
    }

    if (events.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl -ml-20 -mb-20 opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeIn>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-block mb-4">
                                <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm tracking-wide uppercase border border-blue-200 dark:border-blue-800">
                                    <Calendar size={14} />
                                    Mark Your Calendars
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Events</span>
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
                            <EventCard event={event} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeUpcomingEvents;

