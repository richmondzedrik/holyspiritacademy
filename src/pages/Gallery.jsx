import React, { useState } from 'react';
import FadeIn from '../components/common/FadeIn';
import OptimizedImage from '../components/common/OptimizedImage';
import SEO from '../components/common/SEO';
import { Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeaderSkeleton, FacilityCardSkeleton } from '../components/common/Skeletons';
import hsabImage from '../assets/hsab.jpg';
import { usePageLoader } from '../hooks/usePageLoader';
import { gallery } from '../data/gallery';

const Gallery = () => {
    const loading = usePageLoader(800);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrevious(e);
        if (e.key === 'ArrowRight') goToNext(e);
    };

    React.useEffect(() => {
        if (lightboxOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [lightboxOpen]);

    if (loading) {
        return (
            <>
                <SEO
                    title="Gallery - Holy Spirit Academy of Bangued"
                    description="Explore our campus through our photo gallery at Holy Spirit Academy of Bangued."
                    keywords="gallery, photos, campus, Holy Spirit Academy"
                />
                <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
                    <PageHeaderSkeleton />
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <FacilityCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO
                title="Gallery - Holy Spirit Academy of Bangued"
                description="Explore our campus through our photo gallery at Holy Spirit Academy of Bangued."
                keywords="gallery, photos, campus, Holy Spirit Academy"
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
                                        <Images className="text-white" size={40} />
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    Photo Gallery
                                </h1>
                                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                                    Explore our campus, facilities, and memorable moments at Holy Spirit Academy of Bangued.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {gallery.map((item, index) => (
                            <FadeIn key={item.id} delay={index * 50}>
                                <div
                                    onClick={() => openLightbox(index)}
                                    className="group relative overflow-hidden rounded-2xl h-72 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 dark:border-slate-700"
                                >
                                    <OptimizedImage
                                        src={item.image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Hover overlay with zoom icon */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                                        <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                                            <Images className="text-blue-600 dark:text-blue-400" size={24} />
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
                        aria-label="Close"
                    >
                        <X size={28} />
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={gallery[currentIndex].image}
                            alt={`Gallery image ${currentIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                        <p className="text-gray-400 text-sm mt-4">
                            {currentIndex + 1} / {gallery.length}
                        </p>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="absolute right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300"
                        aria-label="Next"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            )}
        </>
    );
};

export default Gallery;
