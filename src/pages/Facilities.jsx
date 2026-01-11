import React from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Building } from 'lucide-react';

const Facilities = () => {
  // Sample facilities data - In a real app, this could come from Firestore
  const facilities = [
    {
      id: 1,
      title: 'Modern Classrooms',
      description: 'Spacious and well-equipped classrooms designed for optimal learning',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Science Laboratories',
      description: 'State-of-the-art labs for chemistry, physics, and biology experiments',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Library & Resource Center',
      description: 'Extensive collection of books and digital resources for research and learning',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Computer Labs',
      description: 'Modern computer facilities with high-speed internet access',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Sports Facilities',
      description: 'Basketball courts, playground, and athletic facilities for physical development',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Auditorium',
      description: 'Large auditorium for assemblies, performances, and school events',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <>
      <SEO 
        title="Facilities - Holy Spirit Academy of Bangued"
        description="Explore our modern facilities and state-of-the-art learning environment at Holy Spirit Academy of Bangued."
        keywords="facilities, campus, classrooms, laboratories, library, sports facilities, Holy Spirit Academy"
      />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Building className="text-blue-600" size={32} />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Our Facilities
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
                Our campus provides a conducive learning environment with modern amenities designed to support 
                comprehensive education and student development.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <FadeIn key={facility.id} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-xl h-80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 flex items-end p-6 transition-opacity duration-300">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-xl font-bold mb-2">{facility.title}</h3>
                      <p className="text-gray-200 text-sm mb-3">{facility.description}</p>
                      <div className="h-1 w-12 bg-blue-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Facilities;
