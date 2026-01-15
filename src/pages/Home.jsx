import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/postService';
import AnnouncementCard from '../components/common/AnnouncementCard';
import ContactForm from '../components/common/ContactForm';
import HeroSlider from '../components/common/HeroSlider';
import SchoolMap from '../components/common/SchoolMap';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { PostSkeleton } from '../components/common/Skeletons';
import { Bell, BookOpen, Users, Building, Target, Phone, Mail, ArrowRight } from 'lucide-react';

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
        title="Holy Spirit Academy of Bangued - School Information Portal"
        description="Official website of Holy Spirit Academy of Bangued. Stay updated with the latest announcements, events, and school information. Join our community of excellence in education."
        keywords="Holy Spirit Academy, Bangued, Abra, Philippines, school, education, announcements, admissions"
      />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section - Slider */}
        <section id="home">
          <HeroSlider />
        </section>

      {/* Announcements Section */}
      <section id="announcements" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-white via-blue-50/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50/40 dark:bg-blue-800/20 rounded-full blur-3xl opacity-40"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                    <Bell className="text-white" size={36} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Latest Announcements
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest news, events, and important information from our school community.
              </p>
            </div>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
                {posts.slice(0, 3).map((post, index) => (
                  <FadeIn key={post.id} delay={index * 100}>
                    <AnnouncementCard post={post} />
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={400}>
                <div className="text-center">
                  <Link 
                    to="/announcements"
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                  >
                    <span>View All Announcements</span>
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </FadeIn>
            </>
          ) : (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 max-w-2xl mx-auto">
                <div className="inline-block mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full">
                    <Bell size={64} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No announcements yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Check back later for school updates.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 md:py-28 px-4 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn direction="right">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                    <BookOpen className="text-white" size={36} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                About Our School
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded with a vision to nurture young minds, <span className="font-semibold text-blue-600 dark:text-blue-400">Holy Spirit Academy of Bangued</span> has been a beacon of educational excellence. 
                We believe in a holistic approach to education that fosters intellectual growth, creativity, and moral character.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                Our dedicated faculty and state-of-the-art resources ensure that every student receives personalized attention 
                and the opportunity to thrive in a rapidly changing world.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-2">20+</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Years of Excellence</div>
                </div>
                <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-2">100+</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Qualified Teachers</div>
                </div>
                <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-2">1000+</div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Happy Students</div>
                </div>
              </div>
              <Link 
                to="/school-profile"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                <span>Learn More About Us</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </FadeIn>
            
            <FadeIn direction="left" delay={200} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl blur-2xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-10 rounded-3xl shadow-2xl">
                  <div className="mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Why Choose Us?</h3>
                    <div className="w-20 h-1 bg-white/30 rounded-full"></div>
                  </div>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Target className="text-white" size={28} />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-white font-bold text-xl mb-2">Excellence in Academics</h4>
                        <p className="text-blue-100 leading-relaxed">Comprehensive curriculum designed for success</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Users className="text-white" size={28} />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-white font-bold text-xl mb-2">Dedicated Faculty</h4>
                        <p className="text-blue-100 leading-relaxed">Experienced teachers committed to your growth</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Building className="text-white" size={28} />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-white font-bold text-xl mb-2">Modern Facilities</h4>
                        <p className="text-blue-100 leading-relaxed">State-of-the-art learning environment</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision-mission" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-800/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                    <Target className="text-white" size={36} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Vision & Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our guiding principles that drive educational excellence and character development.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-12">
            <FadeIn direction="right" delay={100} className="h-full">
              <div className="group relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex-grow flex flex-col">
                  <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                    <Target className="text-white" size={36} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Our Vision
                  </h3>
                  <p className="text-blue-50 leading-relaxed text-lg md:text-xl flex-grow">
                    To be a premier educational institution that cultivates globally competitive, 
                    socially responsible, and lifelong learners who contribute positively to society.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200} className="h-full">
              <div className="group relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex-grow flex flex-col">
                  <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                    <BookOpen className="text-white" size={36} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Our Mission
                  </h3>
                  <p className="text-slate-100 leading-relaxed text-lg md:text-xl flex-grow">
                    We are committed to providing quality education through innovative teaching, 
                    values formation, and community engagement, empowering students to achieve their full potential.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={400}>
            <div className="text-center">
              <Link 
                to="/vision-mission"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-blue-600 dark:border-blue-500 text-lg"
              >
                <span>Read More About Our Vision & Mission</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                    <Building className="text-white" size={36} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our Facilities
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our campus provides a conducive learning environment with modern amenities designed to support comprehensive education.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
            {/* Placeholder Facility Items - In a real app, these could come from Firestore */}
            {[1, 2, 3].map((item, index) => (
              <FadeIn key={item} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-3xl h-80 shadow-xl hover:shadow-2xl cursor-pointer border border-gray-200 dark:border-slate-700 transition-all duration-500">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1580582932707-520aed937b7b' : item === 2 ? '1503676260728-1c00da094a0b' : '1509062522246-3755977927d7'}?auto=format&fit=crop&w=800&q=80`} 
                    alt="School Facility" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 flex items-end p-8 transition-all duration-300">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                        <h3 className="text-white text-2xl font-bold mb-2">Modern Classrooms & Labs</h3>
                        <div className="h-1.5 w-16 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-x-110"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={400}>
            <div className="text-center">
              <Link 
                to="/facilities"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
              >
                <span>View All Facilities</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Administrators Section */}
      <section id="administrators" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                    <Users className="text-white" size={36} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                School Administrators
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Meet the dedicated leaders who guide our school towards excellence in education.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
            {/* Placeholder Admin Profiles */}
            {[1, 2, 3, 4].map((item, index) => (
              <FadeIn key={item} delay={index * 100}>
                <div className="group text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-slate-700">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50 shadow-xl group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all duration-300 group-hover:scale-105">
                      <img 
                        src={`https://ui-avatars.com/api/?name=Admin+${item}&background=random`} 
                        alt="Administrator" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Administrator Name
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Position Title</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={400}>
            <div className="text-center">
              <Link 
                to="/administrators"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
              >
                <span>View All Administrators</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn direction="right">
              <div className="mb-8">
                <div className="inline-block mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                      <Phone className="text-white" size={36} />
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 mt-4 rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                Have questions or feedback? We'd love to hear from you. Fill out the form, 
                and our administration will get back to you as soon as possible.
              </p>
              
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-12 text-lg"
              >
                <span>Visit Contact Page</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <div className="space-y-6">
                {[
                  { icon: Building, title: "Visit Us", text: "School Street, Bangued, Abra, Philippines" },
                  { icon: Phone, title: "Call Us", text: "(123) 456-7890" },
                  { icon: Mail, title: "Email Us", text: "info@holyspiritacademy.edu.ph" }
                ].map((contact, idx) => (
                  <div key={idx} className="group flex items-start gap-5 p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 cursor-default">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 p-4 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-700 dark:group-hover:from-blue-600 dark:group-hover:to-blue-700 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-md">
                      <contact.icon size={28} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{contact.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-base">{contact.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200}>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 hover:shadow-3xl transition-all duration-300">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section id="location" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 rounded-2xl shadow-xl">
                    <Building className="text-white" size={36} />
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Find Us
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Visit us at our campus location. We welcome visitors during school hours.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <SchoolMap 
              googleMapsLink="https://maps.app.goo.gl/1kAoUXMiy6RfpJoP6"
              address="School Street, Bangued, Abra, Philippines"
              schoolName="Holy Spirit Academy of Bangued"
            />
          </FadeIn>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;