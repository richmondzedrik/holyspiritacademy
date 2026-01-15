import React from 'react';
import { Construction, Wrench, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

/**
 * UnderConstruction Component
 * 
 * A reusable component to display "Under Construction" messages for pages or sections
 * that are still being developed.
 * 
 * @example
 * // As a full page:
 * <UnderConstruction 
 *   fullPage={true}
 *   title="Page Under Construction"
 *   message="This page is currently being developed. Check back soon!"
 *   showBackButton={true}
 *   backButtonLink="/"
 * />
 * 
 * @example
 * // As a section within a page:
 * <UnderConstruction 
 *   title="Feature Coming Soon"
 *   message="This feature is under development."
 * />
 * 
 * @example
 * // With custom icon:
 * import { Settings } from 'lucide-react';
 * <UnderConstruction 
 *   icon={Settings}
 *   title="Settings Under Construction"
 *   message="Settings page is being updated."
 * />
 */
const UnderConstruction = ({ 
  title = "Under Construction",
  message = "We're working hard to bring you something amazing. This section will be available soon!",
  showBackButton = false,
  backButtonText = "Go Back",
  backButtonLink = "/",
  fullPage = false,
  icon: CustomIcon = Construction
}) => {
  const content = (
    <div className={`${fullPage ? 'min-h-screen flex items-center justify-center py-24 px-4' : 'py-16 px-4'}`}>
      <div className={`${fullPage ? 'max-w-2xl mx-auto' : 'max-w-4xl mx-auto'}`}>
        <FadeIn>
          <div className="text-center">
            {/* Icon */}
            <div className="inline-block mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-full shadow-2xl">
                  <CustomIcon className="text-white" size={48} />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className={`${fullPage ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'} font-extrabold text-gray-900 dark:text-white mb-6`}>
              {title}
            </h1>

            {/* Message */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
              {message}
            </p>

            {/* Decorative Elements */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex gap-2">
                <Wrench className="text-blue-500 dark:text-blue-400 animate-spin" size={24} style={{ animationDuration: '3s' }} />
                <Clock className="text-blue-500 dark:text-blue-400" size={24} />
                <Construction className="text-blue-500 dark:text-blue-400 animate-pulse" size={24} />
              </div>
            </div>

            {/* Back Button */}
            {showBackButton && (
              <FadeIn delay={200}>
                <Link
                  to={backButtonLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ArrowLeft size={20} />
                  {backButtonText}
                </Link>
              </FadeIn>
            )}

            {/* Progress Indicator */}
            <div className="mt-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We appreciate your patience
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24">
        {content}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 md:p-12">
      {content}
    </div>
  );
};

export default UnderConstruction;
