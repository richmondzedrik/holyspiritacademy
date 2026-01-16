import React, { useEffect, useState } from 'react';
import { getEvents } from '../../services/eventService';
import FadeIn from '../common/FadeIn';
import AnnouncementCard from '../common/AnnouncementCard';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Failed to load events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsData();
    }, []);

    return (
        <section className="py-24 px-4 bg-white dark:bg-slate-900 relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <FadeIn direction="right">
                        <div className="sticky top-24">
                            <div className="inline-block mb-6">
                                <span className="py-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm tracking-wide uppercase">
                                    Mark Your Calendars
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                                Upcoming Events
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Don't miss out on what's happening at Holy Spirit Academy. Join us for these upcoming activities.
                            </p>

                            <div className="bg-blue-50 dark:bg-slate-800 p-8 rounded-3xl border border-blue-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Attend?</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Connect with fellow students and parents",
                                        "Witness student talents and achievements",
                                        "Stay involved in your child's education"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0">✓</div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="left" delay={200}>
                        <div className="space-y-6">
                            {loading ? (
                                <div className="text-center py-10">Loading events...</div>
                            ) : events.length > 0 ? (
                                events.map((event) => {
                                    // Parse date string to Date object for timestamp
                                    // Assuming "Feb 14, 2026" format
                                    const eventDate = new Date(event.date);
                                    let seconds = Math.floor(Date.now() / 1000); // Default to now if invalid

                                    if (!isNaN(eventDate.getTime())) {
                                        seconds = Math.floor(eventDate.getTime() / 1000);
                                    }

                                    const post = {
                                        id: event.id,
                                        title: event.title,
                                        content: `
                                            <p class="mb-2"><strong class="text-blue-600 dark:text-blue-400">Category:</strong> ${event.category}</p>
                                            <p class="mb-2"><strong>Date:</strong> ${event.date}</p>
                                            <p class="mb-2"><strong>Time:</strong> ${event.time}</p>
                                            <p class="mb-2"><strong>Location:</strong> ${event.location}</p>
                                            ${event.description ? `<p class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">${event.description}</p>` : ''}
                                        `,
                                        createdAt: { seconds },
                                        imageUrl: null
                                    };

                                    return (
                                        <AnnouncementCard key={event.id} post={post} />
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-3xl">
                                    <p className="text-gray-500">No upcoming events scheduled at the moment.</p>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
