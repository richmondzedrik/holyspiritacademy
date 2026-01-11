import React from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Target } from 'lucide-react';

const VisionMission = () => {
  return (
    <>
      <SEO 
        title="Vision & Mission - Holy Spirit Academy of Bangued"
        description="Our vision and mission guide our commitment to educational excellence and character development at Holy Spirit Academy of Bangued."
        keywords="vision, mission, educational goals, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-white pt-24 pb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Target className="text-blue-600" size={32} />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
                Vision & Mission
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                Our guiding principles that drive educational excellence and character development.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn direction="right" delay={100}>
              <div className="group relative bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div className="relative z-10 flex-grow">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Our Vision
                  </h2>
                  <p className="text-blue-50 leading-relaxed text-base md:text-lg">
                    To be a premier educational institution that cultivates globally competitive, 
                    socially responsible, and lifelong learners who contribute positively to society.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={300}>
              <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 p-8 md:p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div className="relative z-10 flex-grow">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Our Mission
                  </h2>
                  <p className="text-slate-100 leading-relaxed text-base md:text-lg">
                    We are committed to providing quality education through innovative teaching, 
                    values formation, and community engagement, empowering students to achieve their full potential.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionMission;
