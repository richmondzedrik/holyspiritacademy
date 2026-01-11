import React from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Users } from 'lucide-react';

const Administrators = () => {
  // Sample administrators data - In a real app, this could come from Firestore
  const administrators = [
    { id: 1, name: 'Dr. Maria Santos', position: 'School Principal', image: 'https://ui-avatars.com/api/?name=Maria+Santos&background=0ea5e9&color=fff&size=200' },
    { id: 2, name: 'Mr. John Dela Cruz', position: 'Vice Principal', image: 'https://ui-avatars.com/api/?name=John+Dela+Cruz&background=3b82f6&color=fff&size=200' },
    { id: 3, name: 'Ms. Anna Garcia', position: 'Academic Coordinator', image: 'https://ui-avatars.com/api/?name=Anna+Garcia&background=6366f1&color=fff&size=200' },
    { id: 4, name: 'Mr. Robert Torres', position: 'Student Affairs Director', image: 'https://ui-avatars.com/api/?name=Robert+Torres&background=8b5cf6&color=fff&size=200' }
  ];

  return (
    <>
      <SEO 
        title="School Administrators - Holy Spirit Academy of Bangued"
        description="Meet the dedicated administrators leading Holy Spirit Academy of Bangued towards educational excellence."
        keywords="administrators, school leadership, principal, vice principal, Holy Spirit Academy"
      />
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Users className="text-blue-600" size={32} />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                School Administrators
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
                Meet the dedicated leaders who guide our school towards excellence in education.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {administrators.map((admin, index) => (
              <FadeIn key={admin.id} delay={index * 100}>
                <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 shadow-md group-hover:border-blue-300 transition-colors">
                    <img 
                      src={admin.image} 
                      alt={admin.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{admin.name}</h3>
                  <p className="text-blue-600 font-medium">{admin.position}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Administrators;
