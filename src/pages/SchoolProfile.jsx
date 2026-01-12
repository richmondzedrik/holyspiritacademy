import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { PageHeaderSkeleton } from '../components/common/Skeletons';

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
        <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-4xl mx-auto px-4 space-y-16 animate-pulse">
            <div>
              <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
            <div>
              <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-l-4 border-blue-600 dark:border-blue-400 pl-6 space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                  </div>
                ))}
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
        title="School Profile - Holy Spirit Academy of Bangued"
        description="Learn about Holy Spirit Academy of Bangued - our history, values, and commitment to educational excellence."
        keywords="school profile, about us, Holy Spirit Academy, Bangued, education, school history"
      />
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
        {/* Hero Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white py-16 mb-12">
          <div className="max-w-4xl mx-auto px-4">
            <FadeIn>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  School Profile
                </h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                  Learn about our school's history, values, and commitment to educational excellence.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            {/* About Our School Section */}
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About Our School
                </h2>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Founded with a vision to nurture young minds, <span className="font-semibold text-blue-600 dark:text-blue-400">Holy Spirit Academy of Bangued</span> has been a beacon of educational excellence. 
                    We believe in a holistic approach to education that fosters intellectual growth, creativity, and moral character.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our dedicated faculty and state-of-the-art resources ensure that every student receives personalized attention 
                    and the opportunity to thrive in a rapidly changing world.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            {/* Why Choose Us Section */}
            <FadeIn delay={200}>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="border-l-4 border-blue-600 dark:border-blue-400 pl-6">
                    <h4 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">Excellence in Academics</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Comprehensive curriculum designed for success</p>
                  </div>
                  <div className="border-l-4 border-blue-600 dark:border-blue-400 pl-6">
                    <h4 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">Dedicated Faculty</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Experienced teachers committed to your growth</p>
                  </div>
                  <div className="border-l-4 border-blue-600 dark:border-blue-400 pl-6">
                    <h4 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">Modern Facilities</h4>
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
