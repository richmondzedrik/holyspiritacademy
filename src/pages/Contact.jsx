import React from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import ContactForm from '../components/common/ContactForm';
import { Phone, Mail, Building } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us - Holy Spirit Academy of Bangued"
        description="Get in touch with Holy Spirit Academy of Bangued. We'd love to hear from you and answer any questions you may have."
        keywords="contact, get in touch, school contact, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Phone className="text-blue-600" size={32} />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Contact Us
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Fill out the form below, 
                and our administration will get back to you as soon as possible.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn direction="right">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Get in Touch
                </h2>
                
                <div className="space-y-8">
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
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="bg-blue-100 p-4 rounded-xl text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                        <contact.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{contact.title}</h3>
                        <p className="text-gray-700 font-medium mb-1">{contact.text}</p>
                        <p className="text-gray-500 text-sm">{contact.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={200}>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
