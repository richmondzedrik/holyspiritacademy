import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, FileText, CheckCircle, HelpCircle, School, BookOpen } from 'lucide-react';
import SEO from '../components/common/SEO';

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState(null);

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

  return (
    <>
      <SEO 
        title="Admissions - Holy Spirit Academy of Bangued"
        description="Join Holy Spirit Academy of Bangued. Learn about our admission process, requirements, and enrollment procedures. Start your journey to excellence today."
        keywords="admissions, enrollment, Holy Spirit Academy, Bangued, school application, requirements"
      />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Admissions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join the Holy Spirit Academy family. Your journey to excellence starts here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Admission Process */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-lg">
                  <School className="text-blue-600" size={24} />
                </span>
                Admission Process
              </h2>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  Register Online Now
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-lg">
                  <HelpCircle className="text-blue-600" size={24} />
                </span>
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="text-blue-600" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                Requirements
              </h3>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800 font-medium mb-1">Need assistance?</p>
                <p className="text-xs text-blue-600">
                  Contact our Admissions Office:<br/>
                  (123) 456-7890<br/>
                  admissions@holyspiritacademy.edu.ph
                </p>
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
