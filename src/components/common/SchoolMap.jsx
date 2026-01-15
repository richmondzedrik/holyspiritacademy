import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';

/**
 * SchoolMap Component
 * 
 * Displays an embedded Google Map with a pin marker for the school location.
 * 
 * @param {string} googleMapsLink - Google Maps link (short or full URL)
 * @param {number} latitude - Latitude coordinate (optional, used if googleMapsLink not provided)
 * @param {number} longitude - Longitude coordinate (optional, used if googleMapsLink not provided)
 * @param {string} address - School address for display
 * @param {string} schoolName - Name of the school
 */
const SchoolMap = ({ 
  googleMapsLink: providedLink,
  latitude = 17.5959105, // Bangued, Abra coordinates (from Google Maps link)
  longitude = 120.6167501, // Bangued, Abra coordinates (from Google Maps link)
  address = "School Street, Bangued, Abra, Philippines",
  schoolName = "Holy Spirit Academy of Bangued"
}) => {
  // Convert Google Maps link to embeddable format
  // If a Google Maps link is provided, use it; otherwise use coordinates
  let mapUrl;
  let googleMapsDirectLink;
  
  if (providedLink) {
    // Use the provided Google Maps link directly
    googleMapsDirectLink = providedLink;
    
    // Convert short link or full link to embed format
    if (providedLink.includes('maps.app.goo.gl') || providedLink.includes('goo.gl')) {
      // For short links, we need to extract the place ID or use coordinates
      // Since we have coordinates as fallback, use them for embed with higher zoom
      mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=18&ie=UTF8&iwloc=&output=embed`;
    } else if (providedLink.includes('google.com/maps')) {
      // Convert full Google Maps URL to embed format
      if (providedLink.includes('/place/')) {
        // Extract place name or use coordinates with higher zoom
        mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=18&ie=UTF8&iwloc=&output=embed`;
      } else {
        // Try to convert to embed format
        mapUrl = providedLink.replace('www.google.com/maps', 'maps.google.com/maps') + '&output=embed';
        if (!mapUrl.includes('output=embed')) {
          mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=18&ie=UTF8&iwloc=&output=embed`;
        }
      }
    } else {
      // Fallback to coordinates with higher zoom
      mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=18&ie=UTF8&iwloc=&output=embed`;
    }
  } else {
    // Use coordinates to generate map URL with higher zoom
    mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=18&ie=UTF8&iwloc=&output=embed`;
    googleMapsDirectLink = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=18`;
  }

  return (
    <FadeIn>
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <MapPin className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Our Location</h3>
              <p className="text-blue-100 text-sm">{schoolName}</p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div className="aspect-video w-full">
            <iframe
              title="School Location Map"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Footer with Address and Link */}
        <div className="p-6 bg-gray-50 dark:bg-slate-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <MapPin className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-1">Address</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{address}</p>
              </div>
            </div>
            <a
              href={googleMapsDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm whitespace-nowrap"
            >
              <span>View on Google Maps</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default SchoolMap;
