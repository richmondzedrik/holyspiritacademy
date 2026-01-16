import React from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { School, Target, Users, Building } from 'lucide-react';
import { PageHeaderSkeleton, SchoolProfileContentSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { usePageLoader } from '../hooks/usePageLoader';

const SchoolProfile = () => {
  const loading = usePageLoader();

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
            {/* History Section */}
            <FadeIn>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  History
                </h2>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                    The <span className="font-semibold text-blue-600 dark:text-blue-400">Holy Spirit Academy of Bangued</span> traces its origin to the former Colegio del Sagrado Corazon, Girls’ Department, founded in 1920 through the initiative of the Society of the Divine Word (SVD). In 1923, the supervision of the elementary department was entrusted to the Missionary Servants of the Holy Spirit (SSpS).
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    In 1929, the school graduated its first batch of high school alumnae. Classes were interrupted during World War II and resumed only in 1947 when the colegio was rebuilt. The high school was later taken over completely by the Sisters and, in 1965, the former Sacred Heart of Jesus Academy was renamed the Holy Spirit Academy of Bangued.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    On May 6, 2003, in accordance with their Chapter Resolution, the Sisters handed over the school to the ownership and administration of the Diocese of Bangued. As part of the Diocesan School System and treasuring its exemplary legacy from the SSpS Congregation, HSAB continues to strive to give quality Christian education to the youth of Abra in line with its enduring motto, <span className="font-semibold text-blue-600 dark:text-blue-400">“Truth in Love.”</span>
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* HSAB Hymn */}
            <FadeIn delay={300}>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  HSAB Hymn
                </h2>
                <p className="text-sm uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 mb-6">
                  O Alma Mater, Kind and Dear
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  <div className="space-y-4">
                    <p>
                      O Alma Mater, kind and dear<br />
                      We sing your praises far and near<br />
                      At home, at school, on land and sea<br />
                      The thought of you is dear to me.
                    </p>
                    <p className="font-semibold">
                      Refrain:
                    </p>
                    <p>
                      O HSA in joy we sing<br />
                      Our hearts with love for you we bring.<br />
                      Stand, stand for the HSA for Truth in Love;<br />
                      Stand, stand for the HSA for Truth in Love.<br />
                      Your loyal children here we stand,<br />
                      With you we link our hearts and hands;<br />
                      Beneath your banner here today<br />
                      The pledge of loyalty we pay.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-semibold">
                      (Refrain)
                    </p>
                    <p>
                      Someday when far from you we roam,<br />
                      Our thoughts will surely travel home;<br />
                      And mem’ries sweet will be to me<br />
                      Those dear old days that used to be.
                    </p>
                    <p className="font-semibold">
                      (Refrain)
                    </p>
                  </div>
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
