import { Facebook, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 text-gray-300 dark:text-gray-300 pt-16 pb-8 border-t-4 border-blue-600 dark:border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white/10 group-hover:scale-105 transition-transform">
                <img src={logo} alt="HSA Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">Holy Spirit Academy</span>
                <span className="text-xs text-blue-400 font-medium tracking-wider uppercase">of Bangued</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students with knowledge, character, and faith. Join us in shaping the leaders of tomorrow through holistic education and innovation.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="bg-gray-800 dark:bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#about" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/#vision-mission" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Vision & Mission
                </a>
              </li>
              <li>
                <a href="/#facilities" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Facilities
                </a>
              </li>
              <li>
                <a href="/#administrators" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Administrators
                </a>
              </li>
              <li>
                <a href="/#contact" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Admissions
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/admissions" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admission Process
                </Link>
              </li>
              <li>
                <Link to="/signup" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Apply Now
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Student Portal
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Requirements
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Scholarships
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">School Street, Bangued, Abra, Philippines</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:info@holyspiritacademy.edu.ph" className="hover:text-blue-400 transition-colors">
                  info@holyspiritacademy.edu.ph
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-slate-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Holy Spirit Academy of Bangued. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white dark:hover:text-blue-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
