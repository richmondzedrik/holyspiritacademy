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
import {
  Bell,
  BookOpen,
  Users,
  Building,
  Target,
  Phone,
  Mail,
  ArrowRight,
  MapPin,
  Star,
  CheckCircle,
  ShieldCheck,
  Trophy,
  GraduationCap
} from 'lucide-react';

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
        {/* Hero Section - Slider (Untouched) */}
        <section id="home">
          <HeroSlider />
        </section>

        {/* Announcements Section */}
        <section id="announcements" className="relative py-24 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 overflow-hidden">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.05] bg-[size:30px_30px] -z-10" />

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn>
              <div className="text-center mb-16 md:mb-20">
                <div className="inline-block mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-3xl border border-blue-200 dark:border-blue-700/50 shadow-inner">
                    <Bell className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                  Latest Announcements
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
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
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold rounded-2xl border-2 border-blue-100 dark:border-blue-900 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span>View All Announcements</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </FadeIn>
              </>
            ) : (
              <FadeIn>
                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 max-w-2xl mx-auto">
                  <div className="bg-gray-50 dark:bg-slate-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bell size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No announcements yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Check back later for school updates.</p>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-24 px-4 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="inline-block mb-6">
                    <span className="py-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm tracking-wide uppercase">
                      About Us
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
                    Shaping Futures Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Excellence</span>
                  </h2>

                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                    <p>
                      Founded with a vision to nurture young minds, <span className="font-bold text-gray-900 dark:text-white">Holy Spirit Academy of Bangued</span> has been a beacon of educational excellence for over two decades.
                    </p>
                    <p>
                      We believe in a holistic approach to education that fosters intellectual growth, creativity, and moral character. Our dedicated faculty ensures every student thrives in a rapidly changing world.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {[
                      { number: "20+", label: "Years Impact" },
                      { number: "100+", label: "Expert Faculty" },
                      { number: "1k+", label: "Graduates" }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
                        <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">{stat.number}</div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/school-profile"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[2rem] opacity-20 blur-2xl animate-pulse"></div>
                  <div className="relative bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-blue-600 rounded-xl text-white">
                        <Star size={24} fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h3>
                    </div>

                    <ul className="space-y-6">
                      {[
                        { icon: ShieldCheck, title: "Values-Based Education", desc: "Instilling moral character alongside academic rigor." },
                        { icon: Users, title: "Dedicated Faculty", desc: "Expert teachers committed to student success." },
                        { icon: Trophy, title: "Proven Excellence", desc: "Consistently recognized for academic achievement." },
                        { icon: GraduationCap, title: "Future Ready", desc: "Curriculum designed for the challenges of tomorrow." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                              <item.icon size={20} />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section id="vision-mission" className="relative py-24 px-4 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-md">
                    <Target className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                  Vision & Mission
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our guiding principles that drive educational excellence.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              <FadeIn direction="right" delay={100} className="h-full">
                <div className="h-full bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-bl-[10rem] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400">
                      <Target size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      To be a premier educational institution that cultivates globally competitive, socially responsible, and lifelong learners who contribute positively to society.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200} className="h-full">
                <div className="h-full bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-[10rem] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400">
                      <BookOpen size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      We are committed to providing quality education through innovative teaching, values formation, and community engagement, empowering students to achieve their full potential.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="relative py-24 px-4 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/5 dark:to-transparent -z-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-2xl">
                    <Building className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                  Our Facilities
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  A conducive learning environment with modern amenities.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { img: "1580582932707-520aed937b7b", title: "Modern Classrooms" },
                { img: "1503676260728-1c00da094a0b", title: "Science Labs" },
                { img: "1509062522246-3755977927d7", title: "Library & Study Areas" }
              ].map((item, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div className="group relative rounded-3xl overflow-hidden h-80 shadow-lg cursor-pointer">
                    <img
                      src={`https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&w=800&q=80`}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                      <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={400}>
              <div className="text-center">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-4 transition-all"
                >
                  <span>Explore All Facilities</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Administrators Section */}
        <section id="administrators" className="relative py-24 px-4 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm">
                    <Users className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                  School Administrators
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Meet the dedicated leaders guiding our institution.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[1, 2, 3, 4].map((item, index) => (
                <FadeIn key={item} delay={index * 100}>
                  <div className="group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:-translate-y-2 text-center">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-50 dark:border-blue-900/50 mb-6 group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors">
                      <img
                        src={`https://ui-avatars.com/api/?name=Admin+${item}&background=random`}
                        alt="Administrator"
                        className="w-full h-full object-cover relative z-10"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Administrator Name</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm bg-blue-50 dark:bg-blue-900/20 py-1 px-3 rounded-full inline-block">Position Title</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={400}>
              <div className="text-center">
                <Link
                  to="/administrators"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-4 transition-all"
                >
                  <span>View Full Administration</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-4 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeIn direction="right">
                <div className="sticky top-24">
                  <div className="inline-block mb-6">
                    <span className="py-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm tracking-wide uppercase">
                      Contact Us
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                    Get in Touch With Us
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                    Have questions? We'd love to hear from you. Reach out to us through any of the following channels.
                  </p>

                  <div className="space-y-6 mb-10">
                    {[
                      { icon: MapPin, title: "Visit Us", text: "School Street, Bangued, Abra" },
                      { icon: Phone, title: "Call Us", text: "(123) 456-7890" },
                      { icon: Mail, title: "Email Us", text: "info@holyspiritacademy.edu.ph" }
                    ].map((contact, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <contact.icon size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">{contact.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{contact.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <span>Visit Contact Page</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200}>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Location Map Section */}
        <section id="location" className="relative py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                  Visit Our Campus
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  We look forward to welcoming you to Holy Spirit Academy of Bangued.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                <SchoolMap
                  googleMapsLink="https://maps.app.goo.gl/1kAoUXMiy6RfpJoP6"
                  address="School Street, Bangued, Abra, Philippines"
                  schoolName="Holy Spirit Academy of Bangued"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;