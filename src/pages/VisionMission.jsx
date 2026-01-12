import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { PageHeaderSkeleton } from '../components/common/Skeletons';

const VisionMission = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <SEO 
          title="Vision & Mission - Holy Spirit Academy of Bangued"
          description="Our vision and mission guide our commitment to educational excellence and character development at Holy Spirit Academy of Bangued."
          keywords="vision, mission, educational goals, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-4xl mx-auto px-4 space-y-16 animate-pulse">
            <div className="bg-gray-50 dark:bg-slate-800 p-8 md:p-10 rounded-lg border border-gray-200 dark:border-slate-700">
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-8 md:p-10 rounded-lg border border-gray-200 dark:border-slate-700">
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Vision & Mission - Holy Spirit Academy of Bangued"
        description="Our vision and mission guide our commitment to educational excellence and character development at Holy Spirit Academy of Bangued."
        keywords="vision, mission, educational goals, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
        {/* Hero Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white py-16 mb-12">
          <div className="max-w-4xl mx-auto px-4">
            <FadeIn>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Vision & Mission
                </h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                  Our guiding principles that drive educational excellence and character development.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
          
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            <FadeIn delay={100}>
              <div className="bg-gray-50 dark:bg-slate-800 p-8 md:p-10 rounded-lg border border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Vision
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  To be a premier educational institution that cultivates globally competitive, 
                  socially responsible, and lifelong learners who contribute positively to society.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="bg-gray-50 dark:bg-slate-800 p-8 md:p-10 rounded-lg border border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  We are committed to providing quality education through innovative teaching, 
                  values formation, and community engagement, empowering students to achieve their full potential.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionMission;
