import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, LogOut, Settings, Mail, Calendar, X } from 'lucide-react';
import PostList from '../components/admin/PostList';
import AdminEvents from '../components/admin/AdminEvents';
import UserList from '../components/admin/UserList';
import CommentList from '../components/admin/CommentList';
import MessageList from '../components/admin/MessageList';
import DashboardOverview from '../components/admin/DashboardOverview';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();

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
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg border-2 border-white dark:border-slate-800 transition-all hover:scale-110 active:scale-95"
      >
        {isMobileMenuOpen ? <X size={24} /> : <LayoutDashboard size={24} />}
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
      <main className="flex-grow md:ml-72 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
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

