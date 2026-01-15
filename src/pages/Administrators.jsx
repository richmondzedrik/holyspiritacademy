import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Users } from 'lucide-react';
import { PageHeaderSkeleton, AdministratorCardSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const Administrators = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Sample administrators data - In a real app, this could come from Firestore
  const administrators = [
    { id: 1, name: 'Dr. Maria Santos', position: 'School Principal', image: 'https://ui-avatars.com/api/?name=Maria+Santos&background=0ea5e9&color=fff&size=200' },
    { id: 2, name: 'Mr. John Dela Cruz', position: 'Vice Principal', image: 'https://ui-avatars.com/api/?name=John+Dela+Cruz&background=3b82f6&color=fff&size=200' },
    { id: 3, name: 'Ms. Anna Garcia', position: 'Academic Coordinator', image: 'https://ui-avatars.com/api/?name=Anna+Garcia&background=6366f1&color=fff&size=200' },
    { id: 4, name: 'Mr. Robert Torres', position: 'Student Affairs Director', image: 'https://ui-avatars.com/api/?name=Robert+Torres&background=8b5cf6&color=fff&size=200' }
  ];

  if (loading) {
    return (
      <>
        <SEO 
          title="School Administrators - Holy Spirit Academy of Bangued"
          description="Meet the dedicated administrators leading Holy Spirit Academy of Bangued towards educational excellence."
          keywords="administrators, school leadership, principal, vice principal, Holy Spirit Academy"
        />
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[1, 2, 3, 4].map((i) => (
                <AdministratorCardSkeleton key={i} />
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
        title="School Administrators - Holy Spirit Academy of Bangued"
        description="Meet the dedicated administrators leading Holy Spirit Academy of Bangued towards educational excellence."
        keywords="administrators, school leadership, principal, vice principal, Holy Spirit Academy"
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
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
                    <Users className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  School Administrators
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Meet the dedicated leaders who guide our school towards excellence in education.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {administrators.map((admin, index) => (
              <FadeIn key={admin.id} delay={index * 100}>
                <div className="group text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-slate-700">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50 shadow-xl group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all duration-300 group-hover:scale-105">
                      <img 
                        src={admin.image} 
                        alt={admin.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {admin.name}
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{admin.position}</p>
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

export default Administrators;
