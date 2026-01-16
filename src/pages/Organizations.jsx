import React, { useState } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Users, Star, Trophy, Heart, Sparkles, BookOpen, Music, GraduationCap, Palette, Microscope, Feather, Globe, Smile } from 'lucide-react';
import { PageHeaderSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { usePageLoader } from '../hooks/usePageLoader';
import { elementaryClubs, highSchoolClubs } from '../data/organizations';

const Organizations = () => {
  const loading = usePageLoader(400);
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Organizations', icon: Users },
    { id: 'elementary', label: 'Elementary', icon: BookOpen },
    { id: 'highschool', label: 'High School', icon: GraduationCap },
  ];

  // Helper to get a nice icon for a club based on its name
  const getClubIcon = (clubName) => {
    const name = clubName.toLowerCase();
    if (name.includes('math') || name.includes('science') || name.includes('e-pen')) return Microscope;
    if (name.includes('arts') || name.includes('painting')) return Palette;
    if (name.includes('book') || name.includes('read') || name.includes('writers')) return Feather;
    if (name.includes('music') || name.includes('lyre') || name.includes('chorale')) return Music;
    if (name.includes('scout') || name.includes('crew') || name.includes('service')) return Globe;
    if (name.includes('sport')) return Trophy;
    if (name.includes('mary') || name.includes('altar') || name.includes('religious')) return Heart;
    return Star;
  };

  const renderClubCard = (clubName, index, colorClass) => {
    const Icon = getClubIcon(clubName);
    return (
      <FadeIn key={clubName} delay={index * 30}>
        <div className="group bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center h-full relative overflow-hidden">

          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClass}`}></div>
          <div className={`absolute -right-6 -top-6 w-20 h-20 bg-gradient-to-br ${colorClass} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>

          <div className={`mb-4 p-3 rounded-full bg-gradient-to-br ${colorClass} bg-opacity-10 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} />
          </div>

          <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1 z-10">{clubName}</h4>

          <div className="mt-auto pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">View Details</span>
          </div>
        </div>
      </FadeIn>
    );
  };

  const renderSection = (title, groups, colorClass) => (
    <div className="space-y-12">
      {groups.map((group, groupIdx) => (
        <div key={group.name} className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass} text-white shadow-sm`}>
              {React.createElement(group.icon || Users, { size: 20 })}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{group.name}</h3>
            <div className="h-px flex-1 bg-gray-100 dark:bg-slate-700"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {group.items.map((item, idx) => renderClubCard(item, idx + (groupIdx * 5), colorClass))}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <>
        <SEO
          title="School Organizations - Holy Spirit Academy of Bangued"
          description="Student clubs and organizations at Holy Spirit Academy of Bangued."
          keywords="organizations, clubs, student life, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-20 bg-gray-200 dark:bg-slate-700 rounded-xl mb-12 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-40 bg-gray-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const showElementary = activeTab === 'all' || activeTab === 'elementary';
  const showHighSchool = activeTab === 'all' || activeTab === 'highschool';

  return (
    <>
      <SEO
        title="School Organizations - Holy Spirit Academy of Bangued"
        description="Student clubs and organizations of the elementary and high school departments of Holy Spirit Academy of Bangued."
        keywords="organizations, clubs, student life, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
        {/* Simple Hero Header */}
        <div className="text-white py-20 mb-12 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hsabImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="text-center">
                <div className="inline-block mb-4">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl">
                    <Users className="text-white" size={32} />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                  Student Organizations
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                  Discover your passion, build leadership skills, and make lifelong friends.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <FadeIn delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105 ring-4 ring-blue-500/20'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                    }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-24">
            {showElementary && (
              <section className="scroll-mt-24">
                <FadeIn delay={150}>
                  <div className="mb-10 text-center md:text-left">
                    <span className="text-green-600 dark:text-green-400 font-bold tracking-wider uppercase text-sm mb-2 block">Grade School</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {elementaryClubs.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                      {elementaryClubs.description}
                    </p>
                  </div>
                </FadeIn>

                {renderSection(elementaryClubs.title, elementaryClubs.groups, 'from-green-500 to-emerald-600')}
              </section>
            )}

            {showHighSchool && (
              <section className="scroll-mt-24">
                <FadeIn delay={300}>
                  <div className="mb-10 text-center md:text-left">
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block">High School</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {highSchoolClubs.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                      {highSchoolClubs.description}
                    </p>
                  </div>
                </FadeIn>

                {renderSection(highSchoolClubs.title, highSchoolClubs.groups, 'from-blue-600 to-indigo-600')}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizations;
