import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation, Phone, Mail } from 'lucide-react';
import FadeIn from './FadeIn';

/**
 * SchoolMap Component - Premium Design
 * 
 * Displays an embedded Google Map with modern glassmorphism design
 * 
 * @param {string} googleMapsLink - Google Maps link (short or full URL)
 * @param {number} latitude - Latitude coordinate (optional, used if googleMapsLink not provided)
 * @param {number} longitude - Longitude coordinate (optional, used if googleMapsLink not provided)
 * @param {string} address - School address for display
 * @param {string} schoolName - Name of the school
 */
const SchoolMap = ({
  googleMapsLink: providedLink,
  latitude = 17.5959105,
  longitude = 120.6167501,
  address = "School Street, Bangued, Abra, Philippines",
  schoolName = "Holy Spirit Academy of Bangued"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert Google Maps link to embeddable format
  let mapUrl;
  let googleMapsDirectLink;

  if (providedLink) {
    googleMapsDirectLink = providedLink;
    if (providedLink.includes('maps.app.goo.gl') || providedLink.includes('goo.gl')) {
      mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    } else if (providedLink.includes('google.com/maps')) {
      if (providedLink.includes('/place/')) {
        mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
      } else {
        mapUrl = providedLink.replace('www.google.com/maps', 'maps.google.com/maps') + '&output=embed';
        if (!mapUrl.includes('output=embed')) {
          mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
        }
      }
    } else {
      mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    }
  } else {
    mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    googleMapsDirectLink = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=17`;
  }

  return (
    <FadeIn>
      <div className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full mb-4 backdrop-blur-sm border border-blue-200/50 dark:border-blue-500/30">
                <MapPin className="text-blue-600 dark:text-blue-400" size={18} />
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Find Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Visit Our Campus
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                We're located in the heart of Bangued, Abra. Come visit us and experience our vibrant learning community.
              </p>
            </FadeIn>
          </div>

          {/* Main Map Container */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden transition-all duration-500 hover:shadow-blue-500/20 hover:shadow-3xl">

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

              {/* Map Container with Overlay */}
              <div className="relative h-[500px] overflow-hidden rounded-t-3xl">
                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent z-10 rounded-br-full" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent z-10 rounded-bl-full" />

                {/* Map iframe */}
                <iframe
                  title="School Location Map"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`w-full h-full transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                />

                {/* Floating Location Badge */}
                <div className="absolute top-6 left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 transform transition-all duration-300 hover:scale-105 z-20">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
                      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full">
                        <MapPin className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{schoolName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Footer */}
              <div className="relative p-8 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Address Section */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 group/item">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                        <Navigation className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Address</p>
                        <p className="text-gray-800 dark:text-gray-200 font-semibold leading-relaxed">{address}</p>
                      </div>
                    </div>

                    {/* Quick Contact Info */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-slate-700/60 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50">
                        <Phone size={14} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Contact Us</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-slate-700/60 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50">
                        <Mail size={14} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Email Available</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="flex flex-col justify-center items-start md:items-end gap-4">
                    <a
                      href={googleMapsDirectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                      <span className="relative z-10 flex items-center gap-3">
                        <Navigation className="group-hover/btn:rotate-45 transition-transform duration-300" size={20} />
                        <span>Get Directions</span>
                        <ExternalLink className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" size={18} />
                      </span>
                    </a>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
                      Opens in Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              📍 Easily accessible from all major routes in Bangued
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default SchoolMap;
