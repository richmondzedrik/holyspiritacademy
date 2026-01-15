import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';

const Achievements = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const elementaryAchievements = [
    {
      title: 'Elementary English – Academic Year 2024–2025',
      items: [
        'Champion – Declamation (English, Provincial)',
        '2nd Place – Essay Writing (English, Provincial)',
        '3rd Place – Pagbasa ng Sanaysay (Provincial)',
        'Finalist – Solo Vocal (Provincial)',
      ],
    },
    {
      title: 'FLAME – Official School Publication (Elementary Department)',
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
      title: 'SIKLAB – Division Schools Press Conference',
      items: [
        '1st Place – Science and Technology Writing',
        '1st Place – News Writing',
        '2nd Place – Editorial Writing',
        '2nd Place – Column Writing',
        '5th Place – Radio Broadcasting',
      ],
    },
    {
      title: 'Bible Quiz Bee – Elementary Division',
      items: ['Champion – Bible Quiz Bee (Elementary Division)'],
    },
  ];

  const secondaryAchievements = [
    {
      title: 'Hearts on Fire 2025 – Secondary Department',
      items: [
        'Champion – Gospel Song Writing Competition',
        'Champion – Bible Quiz Bee (Open Category, JHS Team)',
        'Second Place – Bible Quiz Bee (HS Category, SHS Team)',
        'Third Place – Bible Quiz Bee (Open Category, Religious Team)',
        'Second Place – Dance Drama Competition',
      ],
    },
    {
      title: 'Division Schools Press Conference (DSPC) 2025 – Individual Events',
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
      items: [
        'Third Place – Collaborative Desktop Publishing (Filipino)',
        'Fifth Place – Online Publishing (English)',
      ],
    },
    {
      title: 'School Paper – “The Trail”',
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

  if (loading) {
    return (
      <>
        <SEO
          title="Achievements - Holy Spirit Academy of Bangued"
          description="Academic, co-curricular, and extracurricular achievements of Holy Spirit Academy of Bangued."
          keywords="achievements, awards, contests, DSPC, Bible quiz, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16 animate-pulse" />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Achievements - Holy Spirit Academy of Bangued"
        description="Academic, co-curricular, and extracurricular achievements of Holy Spirit Academy of Bangued."
        keywords="achievements, awards, contests, DSPC, Bible quiz, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                School Achievements
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A glimpse of the recent accomplishments of our elementary and secondary departments in academic, literary, and
                co-curricular competitions.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Elementary */}
            <FadeIn direction="right">
              <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Elementary Department
                </h2>
                <div className="space-y-6">
                  {elementaryAchievements.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">{group.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm md:text-base">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Secondary */}
            <FadeIn direction="left" delay={150}>
              <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Secondary Department
                </h2>
                <div className="space-y-6">
                  {secondaryAchievements.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">{group.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm md:text-base">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievements;

