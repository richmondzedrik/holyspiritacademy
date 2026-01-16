import React, { useState } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Trophy, Medal, Star, Award, BookOpen, PenTool, Heart, Users, Music } from 'lucide-react';
import { PageHeaderSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { usePageLoader } from '../hooks/usePageLoader';

const Achievements = () => {
  const loading = usePageLoader(400);
  const [activeTab, setActiveTab] = useState('all');

  const elementaryAchievements = [
    {
      title: 'Elementary English – Academic Year 2024–2025',
      icon: Award,
      items: [
        'Champion – Declamation (English, Provincial)',
        '2nd Place – Essay Writing (English, Provincial)',
        '3rd Place – Pagbasa ng Sanaysay (Provincial)',
        'Finalist – Solo Vocal (Provincial)',
      ],
    },
    {
      title: 'FLAME – Official School Publication',
      icon: BookOpen,
      items: [
        '1st Place – Layout and Page Design',
        '1st Place – Science and Technology Section',
        '2nd Place – Sports Section',
        '2nd Place – Editorial Section',
        '3rd Place – Feature Section',
        '4th Place – News Section',
      ],
    },
    {
      title: 'SIKLAB – Press Conference',
      icon: PenTool,
      items: [
        '1st Place – Science and Technology Writing',
        '1st Place – News Writing',
        '2nd Place – Editorial Writing',
        '2nd Place – Column Writing',
        '5th Place – Radio Broadcasting',
      ],
    },
    {
      title: 'Bible Quiz Bee',
      icon: Star,
      items: ['Champion – Bible Quiz Bee (Elementary Division)'],
    },
  ];

  const secondaryAchievements = [
    {
      title: 'Hearts on Fire 2025',
      icon: Heart,
      items: [
        'Champion – Gospel Song Writing Competition',
        'Champion – Bible Quiz Bee (Open Category, JHS Team)',
        'Second Place – Bible Quiz Bee (HS Category, SHS Team)',
        'Third Place – Bible Quiz Bee (Open Category, Religious Team)',
        'Second Place – Dance Drama Competition',
      ],
    },
    {
      title: 'DSPC 2025 – Individual Events',
      icon: PenTool,
      items: [
        'Champion – Editorial Cartooning (Filipino)',
        'Second Place – Editorial Writing (Filipino)',
        'Third Place – News Writing (English)',
        'Fourth Place – News Writing (Filipino)',
        'Fifth Place – Editorial Cartooning (English)',
        'Fifth Place – Editorial Writing (English)',
      ],
    },
    {
      title: 'DSPC 2025 – Group Events',
      icon: Users,
      items: [
        'Third Place – Collaborative Desktop Publishing (Filipino)',
        'Fifth Place – Online Publishing (English)',
      ],
    },
    {
      title: 'School Paper – “The Trail”',
      icon: BookOpen,
      items: [
        'Features Section – Third Place',
        'Sports Section – Third Place',
        'Sci-Tech Section – Fourth Place',
        'News Section – Fifth Place',
        'Page and Layout – Fourth Place',
        'Overall Fourth Runner-up – Secondary (English)',
      ],
    },
  ];

  // Helper icons for the loop if not defined in array
  const getIcon = (title) => {
    if (title.includes("Press") || title.includes("Paper")) return BookOpen;
    if (title.includes("Bible") || title.includes("Hearts")) return Star;
    if (title.includes("Song") || title.includes("Dance")) return Music;
    return Trophy;
  };

  const tabs = [
    { id: 'all', label: 'All Achievements', icon: Trophy },
    { id: 'elementary', label: 'Elementary', icon: Star },
    { id: 'secondary', label: 'High School', icon: Medal },
  ];

  const renderAchievementCard = (achievement, idx, colorClass) => {
    const Icon = achievement.icon || getIcon(achievement.title);
    return (
      <FadeIn key={idx} delay={idx * 100}>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-slate-700 h-full">
          <div className="flex items-start gap-4">
            <div className={`bg-gradient-to-br ${colorClass} p-3 rounded-2xl shadow-md shrink-0`}>
              <Icon size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 leading-snug border-b border-gray-100 dark:border-slate-700 pb-2">
                {achievement.title}
              </h3>
              <ul className="space-y-3">
                {achievement.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm group">
                    <div className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${colorClass} shrink-0 group-hover:scale-125 transition-transform`} />
                    <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>
    );
  };

  if (loading) {
    return (
      <>
        <SEO
          title="Achievements - Holy Spirit Academy of Bangued"
          description="Academic, co-curricular, and extracurricular achievements of Holy Spirit Academy of Bangued."
          keywords="achievements, awards, contests, DSPC, Bible quiz, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4 mt-12 space-y-8">
            <div className="h-96 bg-gray-200 dark:bg-slate-700 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </>
    );
  }

  const showElementary = activeTab === 'all' || activeTab === 'elementary';
  const showSecondary = activeTab === 'all' || activeTab === 'secondary';

  return (
    <>
      <SEO
        title="Achievements - Holy Spirit Academy of Bangued"
        description="Academic, co-curricular, and extracurricular achievements of Holy Spirit Academy of Bangued."
        keywords="achievements, awards, contests, DSPC, Bible quiz, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
        {/* Hero Header */}
        <div className="text-white py-20 mb-12 relative overflow-hidden">
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
                    <Trophy className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Achievements
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Celebrating the excellence, talent, and dedication of our students.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">

          {/* Tabs */}
          <FadeIn delay={100}>
            <div className="flex justify-center mb-16">
              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 inline-flex flex-wrap justify-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="space-y-20">
            {/* Elementary */}
            {showElementary && (
              <FadeIn direction="up">
                <section>
                  <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                      <Star className="text-white" size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Elementary Department
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {elementaryAchievements.map((item, idx) => renderAchievementCard(item, idx, 'from-yellow-400 to-orange-500'))}
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Secondary */}
            {showSecondary && (
              <FadeIn direction="up" delay={100}>
                <section>
                  <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                      <Medal className="text-white" size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      High School Department
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {secondaryAchievements.map((item, idx) => renderAchievementCard(item, idx, 'from-blue-500 to-indigo-600'))}
                  </div>
                </section>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievements;
