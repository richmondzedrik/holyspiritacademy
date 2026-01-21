import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const GallerySlider = ({ items, autoPlayInterval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Filter unique items and use all of them
    const sliderItems = React.useMemo(() => {
        const seen = new Set();
        return items.filter(item => {
            const duplicate = seen.has(item.image);
            seen.add(item.image);
            return !duplicate;
        });
    }, [items]);

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500); // Match transition duration
    }, [isAnimating, sliderItems.length]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, sliderItems.length]);

    const goToSlide = (index) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        let interval;
        if (!isPaused) {
            interval = setInterval(nextSlide, autoPlayInterval);
        }
        return () => clearInterval(interval);
    }, [isPaused, nextSlide, autoPlayInterval]);

    if (!sliderItems.length) return null;

    return (
        <div
            className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-2xl group border border-gray-100 dark:border-slate-700"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides Container */}
            <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {sliderItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="w-full h-full flex-shrink-0 relative"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${index === currentIndex ? 'scale-110' : 'scale-100'
                                }`}
                            loading="eager"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-10 border border-white/20"
                aria-label="Previous slide"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-10 border border-white/20"
                aria-label="Next slide"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots and Controls */}
            <div className="absolute bottom-8 right-8 flex items-center space-x-3 z-20">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
                >
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                </button>

                <div className="flex space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full overflow-x-auto max-w-[200px] md:max-w-[400px] scrollbar-hide">
                    {sliderItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GallerySlider;
