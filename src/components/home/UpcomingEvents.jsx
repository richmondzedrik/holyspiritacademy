import React, { useEffect, useState } from 'react';
import { getEvents, getEvent } from '../../services/eventService';
import FadeIn from '../common/FadeIn';
import EventCard from '../common/EventCard';
import { PostSkeleton } from '../common/Skeletons';
import { Calendar, Search, ArrowLeft, Clock, MapPin, Tag, Share2 } from 'lucide-react';
import schoolImage from '../../assets/hsab.jpg';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

const UpcomingEvents = () => {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [singleEvent, setSingleEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (id) {
                    const eventData = await getEvent(id);
                    setSingleEvent(eventData);
                } else {
                    const data = await getEvents();
                    setEvents(data);
                    setFilteredEvents(data);
                }
            } catch (error) {
                console.error("Failed to load events", error);
                if (id) toast.error("Failed to load event details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (!id) {
            const results = events.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredEvents(results);
        }
    }, [searchTerm, events, id]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: singleEvent?.title || 'Event',
                    text: 'Check out this event at Holy Spirit Academy',
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                }
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    if (id) {
        if (loading) return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-16 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

        if (!singleEvent) return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-16 flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Event Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The event you are looking for does not exist or has been removed.</p>
                    <Link to="/upcoming-events" className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
                        <ArrowLeft size={20} /> Back to Events
                    </Link>
                </div>
            </div>
        );

        const cleanDescription = singleEvent.description ? DOMPurify.sanitize(singleEvent.description) : '';

        // Safely parse date for single view
        const getEventDate = () => {
            try {
                if (singleEvent.date instanceof Date) return singleEvent.date;
                if (singleEvent.date?.toDate) return singleEvent.date.toDate();
                const parsed = new Date(singleEvent.date);
                if (!isNaN(parsed.getTime())) return parsed;
                return new Date();
            } catch (e) { return new Date(); }
        };
        const dateObj = getEventDate();
        const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <Link to="/upcoming-events" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-8 transition-colors group">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full group-hover:-translate-x-1 transition-transform">
                                <ArrowLeft size={20} />
                            </div>
                            Back to Updated Events
                        </Link>

                        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
                            {/* Header Gradient */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 md:h-48 relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white opacity-20">
                                    <Calendar size={120} />
                                </div>
                            </div>

                            <div className="px-8 md:px-12 py-10 -mt-20 relative z-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Date Badge */}
                                    <div className="bg-white dark:bg-slate-700 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-600 text-center min-w-[120px]">
                                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                                            {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                                        </div>
                                        <div className="text-5xl font-black text-gray-900 dark:text-white mb-1">
                                            {dateObj.getDate()}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
                                            {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        {singleEvent.category && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm font-bold mb-4 border border-blue-100 dark:border-blue-800">
                                                <Tag size={14} />
                                                {singleEvent.category}
                                            </span>
                                        )}
                                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                                            {singleEvent.title}
                                        </h1>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
                                                <Clock className="text-blue-500" size={20} />
                                                <span className="font-medium text-lg">{singleEvent.time || 'Time TBD'}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
                                                <MapPin className="text-indigo-500" size={20} />
                                                <span className="font-medium text-lg">{singleEvent.location || 'Location TBD'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-10 border-t border-gray-100 dark:border-slate-700">
                                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                                        <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
                                    </div>

                                    <div className="mt-12 flex justify-end">
                                        <button
                                            onClick={handleShare}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            <Share2 size={18} />
                                            Share Event
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
            {/* Hero Header matching Announcements */}
            <div className="text-white py-20 mb-20 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${schoolImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <FadeIn>
                        <div className="text-center">
                            <div className="inline-block mb-6">
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-3xl border border-white/30 shadow-xl">
                                    <Calendar className="text-white" size={40} />
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
                                Upcoming Events
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                                Don't miss out on what's happening at Holy Spirit Academy. Join us for these upcoming activities.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <FadeIn delay={100}>
                    <div className="mb-12 relative -mt-32 z-20">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <PostSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event, index) => (
                            <FadeIn key={event.id} delay={index * 50}>
                                <EventCard event={event} />
                            </FadeIn>
                        ))}
                    </div>
                ) : (
                    <FadeIn>
                        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="bg-gray-100 dark:bg-slate-700 p-6 rounded-full">
                                    <Calendar size={48} className="text-gray-400 dark:text-gray-500" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {searchTerm ? 'No events found' : 'No upcoming events'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                                {searchTerm ? `We couldn't find any events matching "${searchTerm}"` : 'Check back later for school updates and scheduled activities.'}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-6 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    </FadeIn>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;
