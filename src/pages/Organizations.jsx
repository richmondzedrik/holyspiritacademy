import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';

const Organizations = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const elementaryClubs = {
    title: 'Grade School Organizations & Clubs',
    groups: [
      {
        name: 'School Organizations',
        items: [
          'Arts Club',
          'Book Lovers Club',
          'English–Filipino Club',
          'Kids’ Crew Club',
          'Mathematics–Science Club',
          'Knights of the Altar',
          'Children of Mary',
          'Boy Scouts of the Philippines',
          'Drum and Lyre Corps',
          'Sports Club',
          'Young Movers Club',
          'E-Pen Club',
          'I Can Read Club',
          'I Can Count Club',
        ],
      },
    ],
  };

  const highSchoolClubs = {
    title: 'High School Organizations & Clubs',
    groups: [
      {
        name: 'Academic Clubs',
        items: [
          'Filipiniana Club',
          'Writers’ Guild',
          'Math–Science Club',
          'Homemakers Club',
          'Book Lovers Club',
        ],
      },
      {
        name: 'Religious Clubs',
        items: [
          'Catholic Women’s League (CWL)',
          'HSABAI Chorale',
          'Knights / Handmaids of the Altar',
          'Junior Lay Ministers',
        ],
      },
      {
        name: 'Special Clubs',
        items: [
          'E-Club',
          'Drum and Lyre Corps (DLC)',
          'Sports Club',
          'Performing Arts Club',
          'Peer Counseling',
        ],
      },
    ],
  };

  if (loading) {
    return (
      <>
        <SEO
          title="School Organizations - Holy Spirit Academy of Bangued"
          description="Student clubs and organizations at Holy Spirit Academy of Bangued."
          keywords="organizations, clubs, student life, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16 animate-pulse" />
      </>
    );
  }

  const renderGroup = (group) => (
    <div key={group.name} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">{group.name}</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm md:text-base">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <SEO
        title="School Organizations - Holy Spirit Academy of Bangued"
        description="Student clubs and organizations of the elementary and high school departments of Holy Spirit Academy of Bangued."
        keywords="organizations, clubs, student life, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                School Organizations & Clubs
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                HSAB offers a rich student life through academic, religious, and special-interest organizations that nurture talents,
                leadership, and service.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn direction="right">
              <section className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {elementaryClubs.title}
                </h2>
                {elementaryClubs.groups.map(renderGroup)}
              </section>
            </FadeIn>

            <FadeIn direction="left" delay={150}>
              <section className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {highSchoolClubs.title}
                </h2>
                {highSchoolClubs.groups.map(renderGroup)}
              </section>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizations;

