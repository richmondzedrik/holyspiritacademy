import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import ContactForm from '../components/common/ContactForm';
import SchoolMap from '../components/common/SchoolMap';
import { Phone, Mail, Building } from 'lucide-react';
import { PageHeaderSkeleton, ContactFormSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <SEO 
          title="Contact Us - Holy Spirit Academy of Bangued"
          description="Get in touch with Holy Spirit Academy of Bangued. We'd love to hear from you and answer any questions you may have."
          keywords="contact, get in touch, school contact, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-10"></div>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700">
                <ContactFormSkeleton />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Contact Us - Holy Spirit Academy of Bangued"
        description="Get in touch with Holy Spirit Academy of Bangued. We'd love to hear from you and answer any questions you may have."
        keywords="contact, get in touch, school contact, Holy Spirit Academy, Bangued"
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
                    <Phone className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Contact Us
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Have questions or feedback? We'd love to hear from you. Fill out the form below, 
                  and our administration will get back to you as soon as possible.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <FadeIn direction="right">
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl">
                    <Phone className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Get in Touch
                  </h2>
                </div>
                
                <div className="space-y-6 mb-10">
                  {[
                    { 
                      icon: Building, 
                      title: "Visit Us", 
                      text: "School Street, Bangued, Abra, Philippines",
                      detail: "We welcome visitors during school hours"
                    },
                    { 
                      icon: Phone, 
                      title: "Call Us", 
                      text: "(123) 456-7890",
                      detail: "Monday to Friday, 8:00 AM - 5:00 PM"
                    },
                    { 
                      icon: Mail, 
                      title: "Email Us", 
                      text: "info@holyspiritacademy.edu.ph",
                      detail: "We'll respond within 24 hours"
                    }
                  ].map((contact, idx) => (
                    <div key={idx} className="group flex items-start gap-4 p-5 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 p-4 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-700 dark:group-hover:from-blue-600 dark:group-hover:to-blue-700 group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-md">
                        <contact.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{contact.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">{contact.text}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{contact.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Office Hours
                  </h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-slate-800">
                      <span className="font-semibold">Monday - Friday</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-slate-800">
                      <span className="font-semibold">Saturday</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-slate-800">
                      <span className="font-semibold">Sunday</span>
                      <span className="text-gray-400 dark:text-gray-500 font-bold">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200}>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700">
                <ContactForm />
              </div>
            </FadeIn>
          </div>

          {/* Map Section */}
          <FadeIn delay={400}>
            <div className="mt-16">
              <SchoolMap 
                googleMapsLink="https://maps.app.goo.gl/1kAoUXMiy6RfpJoP6"
                address="School Street, Bangued, Abra, Philippines"
                schoolName="Holy Spirit Academy of Bangued"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
};

export default Contact;
