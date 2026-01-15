import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Trophy, Medal, Star, Award, BookOpen, PenTool, Heart, Users } from 'lucide-react';
import { PageHeaderSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const Achievements = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

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
    return Trophy;
  };

  const renderAchievementCard = (achievement, idx) => {
    const Icon = achievement.icon || getIcon(achievement.title);
    return (
      <div key={idx} className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:bg-blue-50 dark:hover:bg-slate-700 hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm flex-shrink-0">
            <Icon size={24} className="text-yellow-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3 leading-snug">
              {achievement.title}
            </h3>
            <ul className="space-y-2">
              {achievement.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
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

  // Need to import icons that were used in the render function but not imported yet
  // We'll update the imports at the top, but we need to make sure we didn't miss any
  // Used: Trophy, Medal, Star, Award, BookOpen, PenTool, Heart, Users.
  // We need to add Heart, Users, PenTool to imports.

  return (
    <>
      <SEO
        title="Achievements - Holy Spirit Academy of Bangued"
        description="Academic, co-curricular, and extracurricular achievements of Holy Spirit Academy of Bangued."
        keywords="achievements, awards, contests, DSPC, Bible quiz, Holy Spirit Academy, Bangued"
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
                    <Trophy className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Achievements
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Celebrating the excellence and dedication of our students in various fields.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Elementary */}
            <FadeIn direction="right">
              <section className="h-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl shadow-lg">
                    <Star className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Elementary Department
                  </h2>
                </div>
                <div className="space-y-4">
                  {elementaryAchievements.map((item, idx) => renderAchievementCard(item, idx))}
                </div>
              </section>
            </FadeIn>

            {/* Secondary */}
            <FadeIn direction="left" delay={150}>
              <section className="h-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl shadow-lg">
                    <Medal className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Secondary Department
                  </h2>
                </div>
                <div className="space-y-4">
                  {secondaryAchievements.map((item, idx) => renderAchievementCard(item, idx))}
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

// Add missing imports
// We need to make sure the imports are correct at the top.
// I will start the file content again to ensure imports are perfect.

export default Achievements;

