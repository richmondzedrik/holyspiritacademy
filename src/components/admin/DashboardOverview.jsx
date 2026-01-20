import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, MessageSquare, Mail, Calendar } from 'lucide-react';
import { getPosts } from '../../services/postService';
import { getUsers } from '../../services/userService';
import { getAllComments } from '../../services/commentService';
import { getMessages } from '../../services/feedbackService';
import { getEvents } from '../../services/eventService';
import { DashboardCardSkeleton } from '../common/Skeletons';

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        posts: 0,
        users: 0,
        pendingComments: 0,
        messages: 0,
        events: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [postsData, usersData, commentsData, messagesData, eventsData] = await Promise.all([
                    getPosts(),
                    getUsers(),
                    getAllComments(),
                    getMessages(),
                    getEvents()
                ]);

                setStats({
                    posts: postsData.length,
                    users: usersData.length,
                    pendingComments: commentsData.filter(c => !c.isApproved).length,
                    messages: messagesData.length,
                    events: eventsData.length
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your school portal.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    <>
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                        <DashboardCardSkeleton />
                    </>
                ) : (
                    <>
                        <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/30 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-xl">
                                    <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Posts</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {stats.posts}
                            </p>
                            <Link to="/admin/posts" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Manage Posts
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-500/30 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-xl">
                                    <Users className="text-green-600 dark:text-green-400" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-green-600 dark:text-green-300 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Users</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {stats.users}
                            </p>
                            <Link to="/admin/users" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Manage Users
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:border-yellow-200 dark:hover:border-yellow-500/30 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-yellow-100 dark:bg-yellow-900/40 p-3 rounded-xl">
                                    <MessageSquare className="text-yellow-600 dark:text-yellow-400" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">Pending</span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Comments</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {stats.pendingComments}
                            </p>
                            <Link to="/admin/comments" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Moderate
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-500/30 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-xl">
                                    <Mail className="text-purple-600 dark:text-purple-400" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Messages</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {stats.messages}
                            </p>
                            <Link to="/admin/messages" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Inbox
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:border-pink-200 dark:hover:border-pink-500/30 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-pink-100 dark:bg-pink-900/40 p-3 rounded-xl">
                                    <Calendar className="text-pink-600 dark:text-pink-400" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-pink-600 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/30 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Events</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {stats.events}
                            </p>
                            <Link to="/admin/events" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Manage Events
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardOverview;
