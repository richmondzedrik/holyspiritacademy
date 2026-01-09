import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/postService';
import AnnouncementCard from '../components/common/AnnouncementCard';
import ContactForm from '../components/common/ContactForm';
import HeroSlider from '../components/common/HeroSlider';
import FadeIn from '../components/common/FadeIn';
import { PostSkeleton } from '../components/common/Skeletons';
import { Bell, BookOpen, Users, Building, Target, Phone, Mail } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Slider */}
      <section id="home">
        <HeroSlider />
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Bell className="text-blue-600" size={32} />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Latest Announcements
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Stay updated with the latest news, events, and important information from our school community.
              </p>
            </div>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <FadeIn key={post.id} delay={index * 100}>
                  <AnnouncementCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="mx-auto h-16 w-16 text-gray-300 mb-4">
                  <Bell size={64} />
                </div>
                <h3 className="text-xl font-medium text-gray-900">No announcements yet</h3>
                <p className="text-gray-500 mt-2">Check back later for school updates.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn direction="right">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <BookOpen className="text-blue-600" size={32} />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
                About Our School
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to nurture young minds, <span className="font-semibold text-blue-600">Holy Spirit Academy of Bangued</span> has been a beacon of educational excellence. 
                We believe in a holistic approach to education that fosters intellectual growth, creativity, and moral character.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our dedicated faculty and state-of-the-art resources ensure that every student receives personalized attention 
                and the opportunity to thrive in a rapidly changing world.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl font-bold text-blue-600 mb-1">20+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                  <div className="text-sm text-gray-600">Qualified Teachers</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Happy Students</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200} className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-3xl shadow-2xl">
                  <h3 className="text-3xl font-bold text-white mb-8">Why Choose Us?</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Target className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Excellence in Academics</h4>
                        <p className="text-blue-100">Comprehensive curriculum designed for success</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Users className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Dedicated Faculty</h4>
                        <p className="text-blue-100">Experienced teachers committed to your growth</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Building className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">Modern Facilities</h4>
                        <p className="text-blue-100">State-of-the-art learning environment</p>
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
      <section id="vision-mission" className="py-16 md:py-24 px-4 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Vision & Mission</h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Our guiding principles that drive educational excellence and character development.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn direction="right" delay={100} className="h-full">
              <div className="group relative bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div className="relative z-10 flex-grow">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-blue-50 leading-relaxed text-base md:text-lg">
                    To be a premier educational institution that cultivates globally competitive, 
                    socially responsible, and lifelong learners who contribute positively to society.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={300} className="h-full">
              <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 p-8 md:p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div className="relative z-10 flex-grow">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-slate-100 leading-relaxed text-base md:text-lg">
                    We are committed to providing quality education through innovative teaching, 
                    values formation, and community engagement, empowering students to achieve their full potential.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Building className="text-primary" />
                Our Facilities
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Our campus provides a conducive learning environment with modern amenities.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Facility Items - In a real app, these could come from Firestore */}
            {[1, 2, 3].map((item, index) => (
              <FadeIn key={item} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-xl h-64 shadow-md cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1580582932707-520aed937b7b' : item === 2 ? '1503676260728-1c00da094a0b' : '1509062522246-3755977927d7'}?auto=format&fit=crop&w=800&q=80`} 
                    alt="School Facility" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 flex items-end p-6 transition-opacity duration-300">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-xl font-bold mb-1">Modern Classrooms & Labs</h3>
                      <div className="h-1 w-12 bg-blue-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Administrators Section */}
      <section id="administrators" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Users className="text-primary" />
                School Administrators
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Placeholder Admin Profiles */}
            {[1, 2, 3, 4].map((item, index) => (
              <FadeIn key={item} delay={index * 100}>
                <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 shadow-md group-hover:border-blue-200 transition-colors">
                    <img 
                      src={`https://ui-avatars.com/api/?name=Admin+${item}&background=random`} 
                      alt="Administrator" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Administrator Name</h3>
                  <p className="text-primary font-medium text-sm">Position Title</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <Phone className="text-primary" />
                  Get in Touch
                </h2>
                <div className="w-24 h-1 bg-primary mt-4 rounded-full"></div>
              </div>
              <p className="text-gray-600 mb-8 text-lg">
                Have questions or feedback? We'd love to hear from you. Fill out the form, 
                and our administration will get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Building, title: "Visit Us", text: "School Street, Bangued, Abra, Philippines" },
                  { icon: Phone, title: "Call Us", text: "(123) 456-7890" },
                  { icon: Mail, title: "Email Us", text: "info@holyspiritacademy.edu.ph" }
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-4 group cursor-default">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-primary group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <contact.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{contact.title}</h3>
                      <p className="text-gray-600">{contact.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;