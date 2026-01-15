import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Eye, Target, BookOpen } from 'lucide-react';
import { PageHeaderSkeleton, VisionMissionContentSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <VisionMissionContentSkeleton />
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
                    <Target className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Vision & Mission
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Our guiding principles that drive educational excellence and character development.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
          
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <FadeIn delay={100}>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="inline-flex mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl">
                    <Eye className="text-white" size={32} />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Vision
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg flex-grow">
                  To be a premier educational institution that cultivates globally competitive, 
                  socially responsible, and lifelong learners who contribute positively to society.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="inline-flex mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl">
                    <BookOpen className="text-white" size={32} />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg flex-grow">
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
