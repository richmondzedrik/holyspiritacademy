import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Settings, ChevronRight, Sun, Moon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({}); // Track expanded mobile menus
  const { currentUser, userData, logout, isAdmin } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Us', 
      path: '/school-profile',
      children: [
        { name: 'School Profile', path: '/school-profile' },
        { name: 'Vision & Mission', path: '/vision-mission' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Administrators', path: '/administrators' },
      ]
    },
    { 
      name: 'Admissions', 
      path: '/admissions',
      children: [
         { name: 'Admission Process', path: '/admissions' },
         { name: 'Apply Now', path: '/signup' },
         { name: 'Student Portal', path: '/login' },
      ]
    },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Contact', path: '/contact' },
  ];

  // Helper to handle navigation
  const handleNavClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const toggleMobileMenu = (name) => {
    setMobileExpanded(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const navBackground = isHome && !isScrolled 
    ? 'bg-transparent shadow-none border-transparent dark:bg-transparent' 
    : 'bg-white dark:bg-slate-800 shadow-md border-b border-gray-100 dark:border-slate-700';
  const linkColor = isHome && !isScrolled 
    ? 'text-white hover:text-blue-200 hover:bg-white/10' 
    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700';
  const dropdownTextColor = 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400';
  const logoTitleColor = isHome && !isScrolled ? 'text-white' : 'text-gray-900 dark:text-white';
  const logoSubtitleColor = isHome && !isScrolled ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400';
  const mobileMenuButtonColor = isHome && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group hover:opacity-90 transition-all">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white shadow-md border-2 border-white/20">
              <img src={logo} alt="HSA Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-bold text-lg tracking-tight transition-colors ${logoTitleColor}`}>Holy Spirit Academy</span>
              <span className={`text-xs font-medium transition-colors ${logoSubtitleColor}`}>of Bangued</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.children ? (
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-1 ${linkColor}`}
                    >
                      {link.name}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.path)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${linkColor}`}
                    >
                      {link.name}
                    </button>
                  )}

                  {/* Desktop Dropdown */}
                  {link.children && (
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                      <div className="py-2">
                        {link.children.map((child) => (
                          <button
                            key={child.name}
                            onClick={() => handleNavClick(child.path)}
                            className={`block w-full text-left px-4 py-2 text-sm ${dropdownTextColor} hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors`}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                isHome && !isScrolled
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border shadow-sm ${
                    isHome && !isScrolled 
                      ? 'border-white/20 hover:bg-white/10 text-white' 
                      : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    {userData?.photoURL ? (
                      <img src={userData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-white" />
                    )}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className={`text-sm font-semibold ${isHome && !isScrolled ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{userData?.fullName || 'User'}</div>
                    <div className={`text-xs font-medium ${isHome && !isScrolled ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'}`}>{isAdmin ? 'Administrator' : 'Student'}</div>
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''} ${isHome && !isScrolled ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 py-2 text-gray-800 dark:text-gray-200 animate-fade-in z-50">
                    <Link 
                      to="/account" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors mx-2 rounded-lg"
                    >
                      <User size={18} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">My Account</span>
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border-t border-gray-100 dark:border-slate-700 mx-2 rounded-lg"
                      >
                        <Settings size={18} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium">Admin Panel</span>
                      </Link>
                    )}
                    <div className="border-t border-gray-100 dark:border-slate-700 my-1"></div>
                    <button 
                      onClick={() => { setIsUserMenuOpen(false); handleLogout(); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left mx-2 rounded-lg"
                    >
                      <LogOut size={18} className="text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isHome && !isScrolled 
                      ? 'text-white hover:text-blue-200 hover:bg-white/10' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-colors ${mobileMenuButtonColor}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 px-4 py-3 rounded-lg text-base font-semibold transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileMenu(link.name)}
                      className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 px-4 py-3 rounded-lg text-base font-semibold transition-colors"
                    >
                      {link.name}
                      <ChevronRight size={20} className={`transform transition-transform ${mobileExpanded[link.name] ? 'rotate-90' : ''}`} />
                    </button>
                    {mobileExpanded[link.name] && (
                      <div className="pl-4 space-y-1">
                        {link.children.map((child) => (
                          <button
                            key={child.name}
                            onClick={() => handleNavClick(child.path)}
                            className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 px-4 py-3 rounded-lg text-base font-semibold transition-colors"
                  >
                    {link.name}
                  </button>
                )}
              </div>
            ))}

            {/* User Section */}
            {currentUser ? (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700 space-y-1">
                <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                  Signed in as <span className="font-bold text-gray-900 dark:text-white">{userData?.fullName}</span>
                </div>
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  My Account
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={18} />
                    Admin Panel
                  </Link>
                )}
                <button 
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700 space-y-2">
                <Link 
                  to="/login" 
                  className="block px-4 py-3 text-base font-semibold text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-4 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg text-center transition-all shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
