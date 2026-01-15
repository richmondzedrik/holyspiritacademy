import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { School, Target, Users, Building } from 'lucide-react';
import { PageHeaderSkeleton, SchoolProfileContentSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const SchoolProfile = () => {
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
          title="School Profile - Holy Spirit Academy of Bangued"
          description="Learn about Holy Spirit Academy of Bangued - our history, values, and commitment to educational excellence."
          keywords="school profile, about us, Holy Spirit Academy, Bangued, education, school history"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <SchoolProfileContentSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="School Profile - Holy Spirit Academy of Bangued"
        description="Learn about Holy Spirit Academy of Bangued - our history, values, and commitment to educational excellence."
        keywords="school profile, about us, Holy Spirit Academy, Bangued, education, school history"
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
                    <School className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  School Profile
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Learn about our school's history, values, and commitment to educational excellence.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {/* About Our School Section */}
            <FadeIn>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About Our School
                </h2>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                    Founded with a vision to nurture young minds, <span className="font-semibold text-blue-600 dark:text-blue-400">Holy Spirit Academy of Bangued</span> has been a beacon of educational excellence. 
                    We believe in a holistic approach to education that fosters intellectual growth, creativity, and moral character.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Our dedicated faculty and state-of-the-art resources ensure that every student receives personalized attention 
                    and the opportunity to thrive in a rapidly changing world.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            {/* Why Choose Us Section */}
            <FadeIn delay={200}>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="group p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 p-4 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300 inline-flex mb-4">
                      <Target size={24} />
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Excellence in Academics</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Comprehensive curriculum designed for success</p>
                  </div>
                  <div className="group p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 p-4 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300 inline-flex mb-4">
                      <Users size={24} />
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Dedicated Faculty</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Experienced teachers committed to your growth</p>
                  </div>
                  <div className="group p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 p-4 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-300 inline-flex mb-4">
                      <Building size={24} />
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Modern Facilities</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">State-of-the-art learning environment</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolProfile;
