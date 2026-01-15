import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Users, Star, Trophy, Heart, Sparkles, BookOpen, Music, PenTool } from 'lucide-react';
import { PageHeaderSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const Organizations = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const elementaryClubs = {
    title: 'Grade School Organizations',
    description: 'Nurturing young talents and building character through active participation.',
    groups: [
      {
        name: 'Academic & Special Interest',
        icon: Star,
        items: [
          'Arts Club',
          'Book Lovers Club',
          'English–Filipino Club',
          'Mathematics–Science Club',
          'E-Pen Club',
          'I Can Read Club',
          'I Can Count Club',
        ],
      },
      {
        name: 'Service & Leadership',
        icon: Heart,
        items: [
          'Kids’ Crew Club',
          'Young Movers Club',
          'Boy Scouts of the Philippines',
          'Knights of the Altar',
          'Children of Mary',
        ],
      },
      {
        name: 'Performing Arts & Sports',
        icon: Music,
        items: [
          'Drum and Lyre Corps',
          'Sports Club',
        ],
      },
    ],
  };

  const highSchoolClubs = {
    title: 'High School Organizations',
    description: 'Developing leadership skills and fostering camaraderie among students.',
    groups: [
      {
        name: 'Academic Clubs',
        icon: BookOpen,
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
        icon: Sparkles,
        items: [
          'Catholic Women’s League (CWL)',
          'HSABAI Chorale',
          'Knights / Handmaids of the Altar',
          'Junior Lay Ministers',
        ],
      },
      {
        name: 'Special Interest',
        icon: Trophy,
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="h-96 bg-gray-200 dark:bg-slate-700 rounded-3xl animate-pulse"></div>
              <div className="h-96 bg-gray-200 dark:bg-slate-700 rounded-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const renderGroup = (group, index) => (
    <div key={group.name} className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 group-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
          {React.createElement(group.icon || Users, { size: 20, className: "text-blue-600 dark:text-blue-400" })}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{group.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span key={item} className="inline-block px-3 py-1 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm rounded-full shadow-sm border border-gray-100 dark:border-slate-600">
            {item}
          </span>
        ))}
      </div>
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
                  Student Life
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Join our vibrant community of learners and leaders. Discover clubs that match your passions.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn direction="right">
              <section className="h-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {elementaryClubs.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{elementaryClubs.description}</p>
                </div>
                <div className="space-y-4">
                  {elementaryClubs.groups.map(renderGroup)}
                </div>
              </section>
            </FadeIn>

            <FadeIn direction="left" delay={150}>
              <section className="h-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {highSchoolClubs.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{highSchoolClubs.description}</p>
                </div>
                <div className="space-y-4">
                  {highSchoolClubs.groups.map(renderGroup)}
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organizations;

