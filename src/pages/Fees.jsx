import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Banknote, CreditCard, Receipt } from 'lucide-react';
import { PageHeaderSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';

const Fees = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <SEO
          title="Tuition & Fees - Holy Spirit Academy of Bangued"
          description="Overview of tuition and other school fees for Holy Spirit Academy of Bangued."
          keywords="fees, tuition, schedule of fees, Holy Spirit Academy, Bangued"
        />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          <PageHeaderSkeleton />
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-8">
              <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded-3xl animate-pulse"></div>
              <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Tuition & Fees - Holy Spirit Academy of Bangued"
        description="Schedule of fees for the academic year as indicated in the official HSAB brochure."
        keywords="fees, tuition, schedule of fees, Holy Spirit Academy, Bangued"
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
                    <Banknote className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Tuition & Fees
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  The following sections summarize the schedule of fees for the academic year 2025–2026.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <FadeIn delay={100}>
               <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-center leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                <span className="font-semibold text-blue-600 dark:text-blue-400">Note:</span> Amounts are referenced from the official HSAB brochure. For the most updated and detailed breakdown per item, please refer to the Registrar’s Office.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn direction="right" delay={200}>
              <section className="h-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl shadow-lg">
                    <Receipt className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Grade School <span className="block text-lg font-normal text-gray-500 dark:text-gray-400 mt-1">Kindergarten – Grade 6</span>
                  </h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Fees include tuition, subscriptions, school organ, DSO service fee, PTA fee, and miscellaneous fees.
                </p>
                
                <div className="space-y-3">
                  {['Kindergarten', 'Grade One', 'Grade Two', 'Grade Three', 'Grade Four', 'Grade Five', 'Grade Six'].map((grade, idx) => (
                    <div key={idx} className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{grade}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800/50">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 flex gap-2">
                    <span className="font-bold">Note:</span> Book sales are not yet included in the printed schedule of fees.
                  </p>
                </div>
              </section>
            </FadeIn>

            <FadeIn direction="left" delay={300}>
              <section className="h-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 rounded-2xl shadow-lg">
                    <CreditCard className="text-white" size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    High School <span className="block text-lg font-normal text-gray-500 dark:text-gray-400 mt-1">Junior & Senior High</span>
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Fees include tuition, computer fees, insurance, test papers, religious services, club fees, and miscellaneous charges.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Junior High School (JHS)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Grade 7 to Grade 10</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Senior High School (SHS)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Grade 11 & Grade 12 (All Strands)</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    Financial assistance (ESC & Vouchers) available for eligible students.
                  </p>
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fees;

