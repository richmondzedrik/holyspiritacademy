import React, { useState } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Building } from 'lucide-react';
import { PageHeaderSkeleton, FacilityCardSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { usePageLoader } from '../hooks/usePageLoader';
import { facilities } from '../data/facilities';

const Facilities = () => {
  const loading = usePageLoader(800);

  if (loading) {
    return (
      <>
        <SEO
          title="Facilities - Holy Spirit Academy of Bangued"
          description="Explore our modern facilities and state-of-the-art learning environment at Holy Spirit Academy of Bangued."
          keywords="facilities, campus, classrooms, laboratories, library, sports facilities, Holy Spirit Academy"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <FacilityCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Facilities - Holy Spirit Academy of Bangued"
        description="Explore our modern facilities and state-of-the-art learning environment at Holy Spirit Academy of Bangued."
        keywords="facilities, campus, classrooms, laboratories, library, sports facilities, Holy Spirit Academy"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
        {/* Hero Header */}
        <div className="text-white py-20 mb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hsabImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="text-center">
                <div className="inline-block mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-3xl border border-white/30 shadow-xl">
                    <Building className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Our Facilities
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Our campus provides a conducive learning environment with modern amenities designed to support
                  comprehensive education and student development.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {facilities.map((facility, index) => (
              <FadeIn key={facility.id} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-3xl h-96 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 dark:border-slate-700">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 flex items-end p-8 transition-all duration-300">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <h3 className="text-white text-2xl font-bold mb-3">{facility.title}</h3>
                        <p className="text-gray-200 text-sm leading-relaxed mb-4">{facility.description}</p>
                        <div className="h-1.5 w-16 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-x-110"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Facilities;
