import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, FileText, CheckCircle, HelpCircle, School, BookOpen } from 'lucide-react';
import SEO from '../components/common/SEO';
import { PageHeaderSkeleton, AdmissionsContentSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const Admissions = () => {
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      title: "Submit Requirements",
      description: "Gather and submit all necessary documents to the Registrar's Office or upload them via our online portal.",
      icon: <FileText size={24} className="text-blue-600" />
    },
    {
      title: "Assessment & Interview",
      description: "Schedule an assessment test and interview with the guidance counselor and principal.",
      icon: <CheckCircle size={24} className="text-blue-600" />
    },
    {
      title: "Payment of Fees",
      description: "Pay the enrollment and other necessary fees at the Finance Office.",
      icon: <School size={24} className="text-blue-600" />
    },
    {
      title: "Enrollment Confirmation",
      description: "Receive your official enrollment form and class schedule.",
      icon: <BookOpen size={24} className="text-blue-600" />
    }
  ];

  const requirements = [
    "Original Report Card (Form 138)",
    "Certificate of Good Moral Character",
    "PSA Birth Certificate (Original & Photocopy)",
    "2 pcs 2x2 ID Picture (White Background)",
    "Certificate of Junior High School Completion (for SHS)"
  ];

  const faqs = [
    {
      question: "When does the enrollment period start?",
      answer: "Enrollment for the upcoming school year typically starts in May and ends in July. Early registration is encouraged to secure a slot."
    },
    {
      question: "Do you offer scholarships?",
      answer: "Yes, we offer various scholarship programs including Academic Scholarships, ESC Grants (for JHS), and Voucher Program (for SHS). Please visit the Guidance Office for more details."
    },
    {
      question: "Is there an entrance exam?",
      answer: "Yes, all new students are required to take an entrance assessment to determine their readiness and placement."
    },
    {
      question: "What are the school hours?",
      answer: "Regular classes start at 7:30 AM and end at 4:00 PM, Monday to Friday."
    },
    {
      question: "Do you accept transferees?",
      answer: "Yes, we accept transferees provided they meet the admission requirements and pass the assessment and interview."
    }
  ];

  if (loading) {
    return (
      <>
        <SEO 
          title="Admissions - Holy Spirit Academy of Bangued"
          description="Join Holy Spirit Academy of Bangued. Learn about our admission process, requirements, and enrollment procedures. Start your journey to excellence today."
          keywords="admissions, enrollment, Holy Spirit Academy, Bangued, school application, requirements"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <AdmissionsContentSkeleton />
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                  ))}
                </div>
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
        title="Admissions - Holy Spirit Academy of Bangued"
        description="Join Holy Spirit Academy of Bangued. Learn about our admission process, requirements, and enrollment procedures. Start your journey to excellence today."
        keywords="admissions, enrollment, Holy Spirit Academy, Bangued, school application, requirements"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20 pb-16">
      {/* Hero Header */}
      <div className="text-white py-20 mb-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${hsabImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-3xl border border-white/30 shadow-xl">
                <School className="text-white" size={40} />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Admissions
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
              Join the Holy Spirit Academy family. Your journey to excellence starts here.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Admission Process */}
            <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl">
                  <School className="text-white" size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Admission Process
                </h2>
              </div>
              
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="group flex gap-6 p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center font-bold text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-300 to-transparent"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-blue-600 dark:text-blue-400">{step.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-700">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
                >
                  Register Online Now
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl">
                  <HelpCircle className="text-white" size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <button
                      className="w-full px-6 py-5 text-left bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 flex justify-between items-center transition-colors focus:outline-none group"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-4">
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 p-2 rounded-lg transition-all ${openFaq === index ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500'}`}>
                        {openFaq === index ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 py-5 bg-gradient-to-br from-blue-50 to-white dark:from-slate-700 dark:to-slate-800 border-t border-gray-200 dark:border-slate-600">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Requirements Card */}
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl">
                  <FileText className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Requirements
                </h3>
              </div>
              <ul className="space-y-4 mb-8">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle className="text-green-500 dark:text-green-400" size={20} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{req}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/50 shadow-md">
                <p className="text-base text-blue-800 dark:text-blue-300 font-bold mb-3">Need assistance?</p>
                <div className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  <p className="font-semibold">Contact our Admissions Office:</p>
                  <p>(123) 456-7890</p>
                  <p>admissions@holyspiritacademy.edu.ph</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </>
  );
};

export default Admissions;
