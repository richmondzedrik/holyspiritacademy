import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/postService';
import HeroSlider from '../components/common/HeroSlider';
import SchoolMap from '../components/common/SchoolMap';
import SEO from '../components/common/SEO';
import StudentLifeHighlights from '../components/home/StudentLifeHighlights';
import HomeUpcomingEvents from '../components/home/HomeUpcomingEvents';

import FeatureSpotlight from '../components/home/FeatureSpotlight';
import AcademicPrograms from '../components/home/AcademicPrograms';
import AnnouncementCard from '../components/common/AnnouncementCard';
// Footer import
import Footer from '../components/layout/Footer';
import FadeIn from '../components/common/FadeIn';
import { PostSkeleton } from '../components/common/Skeletons';
import { Link } from 'react-router-dom';
import { ArrowRight, Bell } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO
        title="Holy Spirit Academy of Bangued - Educational Excellence"
        description="Official website of Holy Spirit Academy of Bangued. A premier institution deducated to holistic education and character formation."
        keywords="Holy Spirit Academy, Bangued, Education, School, Private School, Abra"
      />
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 font-sans text-gray-900 dark:text-gray-100">

        {/* 1. Hero Section - Preserved (First Part) */}
        <section id="home" className="relative">
          <HeroSlider />
        </section>



        {/* 3. Feature Spotlight - Replaces Welcome Message */}
        <FeatureSpotlight />

        {/* 4. Academic Offerings */}
        <AcademicPrograms />

        {/* 5. Stats Strip */}


        {/* 6. Upcoming Events */}
        <div className="bg-white dark:bg-slate-900">
          <HomeUpcomingEvents />
        </div>

        {/* 7. Latest Announcements */}
        <section className="py-24 px-4 bg-gray-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 font-serif">Latest News & Updates</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-xl">Stay connected with the latest happenings at Holy Spirit Academy.</p>
                </div>
                <Link to="/announcements" className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all">
                  <span>View All News</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </FadeIn>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <PostSkeleton key={i} />)}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(0, 3).map((post, index) => (
                  <FadeIn key={post.id} delay={index * 100}>
                    <AnnouncementCard post={post} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
                <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No recent announcements.</p>
              </div>
            )}
          </div>
        </section>

        {/* 8. Student Life */}
        <StudentLifeHighlights />

        {/* 9. Location & Contact - Cleaned, Map Accessible */}
        <section className="py-0 relative z-10">
          <div className="w-full relative grayscale hover:grayscale-0 transition-all duration-700">
            <SchoolMap
              googleMapsLink="https://maps.app.goo.gl/1kAoUXMiy6RfpJoP6"
              address="School Street, Bangued, Abra"
              schoolName="Holy Spirit Academy"
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;