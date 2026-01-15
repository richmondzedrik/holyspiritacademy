import React, { useState, useEffect } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16 animate-pulse" />
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
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                Tuition & Fees
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The following sections summarize the schedule of fees for the academic year 2025–2026 as presented in the official
                HSAB brochure. For the most updated and detailed breakdown per item, please refer to the Registrar’s Office.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn direction="right">
              <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Grade School Department
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                  Based on the brochure’s “Schedule of Fees for the Academic Year 2025–2026” for Kindergarten and Grades 1–4. Each
                  level includes tuition, other fees, subscriptions, school organ, DSO service fee, PTA fee, and miscellaneous fees.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  <li>• Kindergarten – Schedule of fees as per official HSAB schedule (see Registrar for itemized amounts).</li>
                  <li>• Grade One – Schedule of fees as per official HSAB schedule.</li>
                  <li>• Grade Two – Schedule of fees as per official HSAB schedule.</li>
                  <li>• Grade Three – Schedule of fees as per official HSAB schedule.</li>
                  <li>• Grade Four – Schedule of fees as per official HSAB schedule.</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Note: Book sales in all grade levels are not yet included in the printed schedule of fees.
                </p>
              </section>
            </FadeIn>

            <FadeIn direction="left" delay={150}>
              <section className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  High School Department
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                  The high school schedule of fees (Junior High School and Senior High School) in the brochure lists tuition, computer
                  fees, other fees, subscriptions, student insurance, test papers, student religious services, club fees, and other
                  miscellaneous charges.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  <li>• Junior High School (JHS) – Tuition and fees as indicated in the HSAB high school fee schedule.</li>
                  <li>• Senior High School (SHS) – Tuition and fees as indicated in the HSAB high school fee schedule.</li>
                </ul>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Exact amounts may change; the printed brochure and Registrar’s Office remain the official references for billing.
                </p>
              </section>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fees;

