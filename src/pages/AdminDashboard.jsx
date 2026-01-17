import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, LogOut, Settings, Mail, Calendar } from 'lucide-react';
import PostList from '../components/admin/PostList';
import AdminEvents from '../components/admin/AdminEvents';
import UserList from '../components/admin/UserList';
import CommentList from '../components/admin/CommentList';
import MessageList from '../components/admin/MessageList';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../services/postService';
import { getUsers } from '../services/userService';
import { getAllComments } from '../services/commentService';
import { getMessages } from '../services/feedbackService';
import { getEvents } from '../services/eventService';
import { DashboardCardSkeleton } from '../components/common/Skeletons';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();
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

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Posts', path: '/admin/posts', icon: <FileText size={20} /> },
    { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Comments', path: '/admin/comments', icon: <MessageSquare size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <Mail size={20} /> },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 pt-16 transition-colors duration-300">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg border-2 border-white dark:border-slate-800"
      >
        <LayoutDashboard size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`w-72 bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-900 dark:to-slate-900 shadow-2xl flex flex-col fixed h-full top-16 left-0 z-40 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-white">
              <Settings size={28} />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">Admin Panel</h2>
              <p className="text-xs text-blue-100">Manage School Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.disabled ? '#' : item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.disabled
                ? 'text-blue-200 cursor-not-allowed'
                : isActive(item.path)
                  ? 'bg-white/20 backdrop-blur-sm text-white shadow-lg'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
            >
              {item.icon}
              {item.name}
              {item.disabled && <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded text-blue-200">Soon</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-100 hover:bg-red-500/20 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-72 p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={
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
            } />
            <Route path="/posts" element={<PostList />} />
            <Route path="/events" element={<AdminEvents />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/comments" element={<CommentList />} />
            <Route path="/messages" element={<MessageList />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
