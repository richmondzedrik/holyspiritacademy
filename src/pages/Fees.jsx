import React, { useState } from 'react';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { Banknote, Receipt, ChevronDown, ChevronUp, AlertCircle, School, GraduationCap } from 'lucide-react';
import { PageHeaderSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { usePageLoader } from '../hooks/usePageLoader';

const FeeItem = ({ label, amount, isTotal = false, isSubtotal = false }) => (
  <div className={`flex justify-between items-center py-2 ${isTotal ? 'border-t-2 border-gray-200 dark:border-slate-600 mt-2 font-bold text-lg text-blue-600 dark:text-blue-400' : isSubtotal ? 'border-t border-gray-100 dark:border-slate-700 mt-1 font-semibold text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-300 text-sm'}`}>
    <span>{label}</span>
    <span>{amount}</span>
  </div>
);

const FeeCard = ({ grade, total, items, delay }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FadeIn delay={delay}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div
          className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-800 cursor-pointer flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{grade}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Fees</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{total}</span>
            <div className={`p-2 rounded-full bg-blue-50 dark:bg-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={20} className="text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 pt-0 border-t border-gray-100 dark:border-slate-700">
            <div className="mt-4 space-y-1">
              {items.map((item, idx) => (
                item.isSection ? (
                  <h4 key={idx} className="font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">{item.label}</h4>
                ) : (
                  <FeeItem key={idx} label={item.label} amount={item.amount} isSubtotal={item.isSubtotal} />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const Fees = () => {
  const loading = usePageLoader(400);
  const [activeTab, setActiveTab] = useState('grade_school');

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

  const tabs = [
    { id: 'grade_school', label: 'Grade School', icon: School },
    { id: 'high_school', label: 'High School', icon: GraduationCap },
  ];

  return (
    <>
      <SEO
        title="Tuition & Fees - Holy Spirit Academy of Bangued"
        description="Schedule of fees for the academic year as indicated in the official HSAB brochure."
        keywords="fees, tuition, schedule of fees, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
        {/* Hero Header */}
        <div className="text-white py-20 mb-12 relative overflow-hidden">
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
                  Academic Year 2025–2026 Schedule of Fees
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">

          {/* Tabs */}
          <FadeIn delay={100}>
            <div className="flex justify-center mb-12">
              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 inline-flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Important Note */}
          <FadeIn delay={200}>
            <div className="mb-10 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 flex gap-3 items-start">
              <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <span className="font-bold">Note:</span> Amounts are referenced from the official HSAB brochure. Booksale in all grade levels are not yet included. For the most updated breakdown, please refer to the Registrar’s Office.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {activeTab === 'grade_school' ? (
              <>
                <FeeCard
                  grade="Kindergarten"
                  total="₱ 9,825.00"
                  delay={300}
                  items={[
                    { label: "Tuition fee", amount: "₱ 7,500.00" },
                    { label: "Other fees", amount: "₱ 1,000.00" },
                    { label: "School Organ", amount: "₱ 80.00" },
                    { label: "DSO Service fee", amount: "₱ 145.00" },
                    { label: "PTA fee", amount: "₱ 100.00" },
                    { label: "Achievement fee", amount: "₱ 300.00" },
                    { label: "Stud. Insurance", amount: "₱ 40.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "SRS", amount: "₱ 50.00" },
                    { label: "Test Papers", amount: "₱ 500.00" },
                    { label: "Misc.", amount: "₱ 10.00" },
                  ]}
                />
                <FeeCard
                  grade="Grade One"
                  total="₱ 10,415.00"
                  delay={350}
                  items={[
                    { label: "Tuition fee", amount: "₱ 8,000.00" },
                    { label: "Other fees", amount: "₱ 950.00" },
                    { label: "Subscription", amount: "₱ 380.00" },
                    { label: "School Organ", amount: "₱ 80.00" },
                    { label: "DSO Service fee", amount: "₱ 145.00" },
                    { label: "PTA fee", amount: "₱ 100.00" },
                    { label: "Stud. Insurance", amount: "₱ 40.00" },
                    { label: "Club fee", amount: "₱ 60.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "SRS", amount: "₱ 50.00" },
                    { label: "Test Papers", amount: "₱ 500.00" },
                    { label: "Misc.", amount: "₱ 10.00" },
                  ]}
                />
                <FeeCard
                  grade="Grade Two"
                  total="₱ 10,265.00"
                  delay={400}
                  items={[
                    { label: "Tuition fee", amount: "₱ 8,000.00" },
                    { label: "Other fees", amount: "₱ 950.00" },
                    { label: "Subscription", amount: "₱ 230.00" },
                    { label: "School Organ", amount: "₱ 80.00" },
                    { label: "DSO Service fee", amount: "₱ 145.00" },
                    { label: "PTA fee", amount: "₱ 100.00" },
                    { label: "Stud. Insurance", amount: "₱ 40.00" },
                    { label: "Club fee", amount: "₱ 60.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "SRS", amount: "₱ 50.00" },
                    { label: "Test Papers", amount: "₱ 500.00" },
                    { label: "Misc.", amount: "₱ 10.00" },
                  ]}
                />
                <FeeCard
                  grade="Grade Three"
                  total="₱ 10,315.00"
                  delay={450}
                  items={[
                    { label: "Tuition fee", amount: "₱ 8,000.00" },
                    { label: "Other fees", amount: "₱ 950.00" },
                    { label: "Subscription", amount: "₱ 230.00" },
                    { label: "School Organ", amount: "₱ 80.00" },
                    { label: "DSO Service fee", amount: "₱ 145.00" },
                    { label: "PTA fee", amount: "₱ 100.00" },
                    { label: "Stud. Insurance", amount: "₱ 40.00" },
                    { label: "Club fee", amount: "₱ 60.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "SPS", amount: "₱ 100.00" },
                    { label: "Test Papers", amount: "₱ 500.00" },
                    { label: "Misc.", amount: "₱ 10.00" },
                  ]}
                />
                <FeeCard
                  grade="Grade Four to Grade Six"
                  total="₱ 11,665.00"
                  delay={500}
                  items={[
                    { label: "Tuition fee", amount: "₱ 8,000.00" },
                    { label: "Other fees", amount: "₱ 1,150.00" },
                    { label: "Computer fee", amount: "₱ 850.00" },
                    { label: "Subscription", amount: "₱ 530.00" },
                    { label: "School Organ", amount: "₱ 80.00" },
                    { label: "DSO Service fee", amount: "₱ 145.00" },
                    { label: "PTA fee", amount: "₱ 100.00" },
                    { label: "Stud. Insurance", amount: "₱ 40.00" },
                    { label: "Club fee", amount: "₱ 60.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "SPS", amount: "₱ 100.00" },
                    { label: "Test Papers", amount: "₱ 500.00" },
                    { label: "Misc.", amount: "₱ 10.00" },
                  ]}
                />
              </>
            ) : (
              <>
                <FeeCard
                  grade="Junior High School (JHS)"
                  total="₱ 12,825.00"
                  delay={300}
                  items={[
                    { isSection: true, label: "I. Tuition Fee" },
                    { label: "Tuition Fee", amount: "₱ 9,000.00" },
                    { label: "Computer Fee", amount: "₱ 850.00" },
                    { label: "Subtotal", amount: "₱ 9,850.00", isSubtotal: true },

                    { isSection: true, label: "II. Other Fees" },
                    { label: "Registration Fee", amount: "₱ 300.00" },
                    { label: "Library Fee", amount: "₱ 200.00" },
                    { label: "Athletic Fee", amount: "₱ 150.00" },
                    { label: "Medical Fee", amount: "₱ 150.00" },
                    { label: "Guidance Fee", amount: "₱ 150.00" },
                    { label: "Laboratory Fee", amount: "₱ 200.00" },
                    { label: "Audio Visual Fee", amount: "₱ 150.00" },
                    { label: "DSO Service Fee", amount: "₱ 145.00" },
                    { label: "Subtotal", amount: "₱ 1,445.00", isSubtotal: true },

                    { isSection: true, label: "III. Subscription and Others" },
                    { label: "PTA Fee", amount: "₱ 100.00" },
                    { label: "School Organ", amount: "₱ 80.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "Student Insurance", amount: "₱ 40.00" },
                    { label: "Test Paper", amount: "₱ 500.00" },
                    { label: "Student Religious Services", amount: "₱ 100.00" },
                    { label: "Club Fee", amount: "₱ 60.00" },
                    { label: "Student Subscription", amount: "₱ 530.00" },
                    { label: "Miscellaneous", amount: "₱ 20.00" },
                    { label: "Subtotal", amount: "₱ 1,530.00", isSubtotal: true },
                  ]}
                />

                <FeeCard
                  grade="Senior High School (SHS)"
                  total="₱ 18,665.00"
                  delay={350}
                  items={[
                    { isSection: true, label: "I. Tuition Fee" },
                    { label: "Tuition Fee", amount: "₱ 14,500.00" },
                    { label: "Computer Fee", amount: "₱ 900.00" },
                    { label: "Subtotal", amount: "₱ 15,400.00", isSubtotal: true },

                    { isSection: true, label: "II. Other Fees" },
                    { label: "Registration Fee", amount: "₱ 300.00" },
                    { label: "Library Fee", amount: "₱ 300.00" },
                    { label: "Athletic Fee", amount: "₱ 200.00" },
                    { label: "Medical Fee", amount: "₱ 150.00" },
                    { label: "Guidance Fee", amount: "₱ 150.00" },
                    { label: "Laboratory Fee", amount: "₱ 300.00" },
                    { label: "Audio Visual Fee", amount: "₱ 150.00" },
                    { label: "DSO Service Fee", amount: "₱ 145.00" },
                    { label: "Subtotal", amount: "₱ 1,695.00", isSubtotal: true },

                    { isSection: true, label: "III. Subscription and Others" },
                    { label: "PTA Fee", amount: "₱ 100.00" },
                    { label: "School Organ", amount: "₱ 100.00" },
                    { label: "ID", amount: "₱ 100.00" },
                    { label: "Student Insurance", amount: "₱ 40.00" },
                    { label: "Test Paper", amount: "₱ 500.00" },
                    { label: "Student Religious Services", amount: "₱ 100.00" },
                    { label: "Club Fee", amount: "₱ 80.00" },
                    { label: "Student Subscription", amount: "₱ 500.00" },
                    { label: "Miscellaneous", amount: "₱ 50.00" },
                    { label: "Subtotal", amount: "₱ 1,570.00", isSubtotal: true },
                  ]}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fees;
