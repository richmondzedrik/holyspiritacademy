import React from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { BookOpen, Target, Users, Building } from 'lucide-react';

const SchoolProfile = () => {
  return (
    <>
      <SEO 
        title="School Profile - Holy Spirit Academy of Bangued"
        description="Learn about Holy Spirit Academy of Bangued - our history, values, and commitment to educational excellence."
        keywords="school profile, about us, Holy Spirit Academy, Bangued, education, school history"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <BookOpen className="text-blue-600" size={32} />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
                School Profile
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                Learn about our school's history, values, and commitment to educational excellence.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <FadeIn direction="right">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                  About Our School
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded with a vision to nurture young minds, <span className="font-semibold text-blue-600">Holy Spirit Academy of Bangued</span> has been a beacon of educational excellence. 
                  We believe in a holistic approach to education that fosters intellectual growth, creativity, and moral character.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Our dedicated faculty and state-of-the-art resources ensure that every student receives personalized attention 
                  and the opportunity to thrive in a rapidly changing world.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-600 mb-1">20+</div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                    <div className="text-sm text-gray-600">Qualified Teachers</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-600 mb-1">1000+</div>
                    <div className="text-sm text-gray-600">Happy Students</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200}>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl shadow-2xl">
                  <h3 className="text-3xl font-bold text-white mb-8">Why Choose Us?</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Target className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Excellence in Academics</h4>
                        <p className="text-blue-100">Comprehensive curriculum designed for success</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Users className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Dedicated Faculty</h4>
                        <p className="text-blue-100">Experienced teachers committed to your growth</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Building className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Modern Facilities</h4>
                        <p className="text-blue-100">State-of-the-art learning environment</p>
                      </div>
                    </li>
                  </ul>
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
