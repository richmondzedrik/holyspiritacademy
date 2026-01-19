import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

const OptimizedImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false, // If true, eager load
    placeholder = 'blur', // 'blur', 'empty', or custom ReactNode
    objectFit = 'cover',
    onLoad,
    onError,
    ...props
}) => {
    const [loading, setLoading] = useState(!priority);
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState(priority ? src : null);

    // If priority is true, we don't need intersection observer or lazy loading effects for the src
    // But we still might want the fade-in effect.

    useEffect(() => {
        if (priority) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setLoading(false);
                if (onLoad) onLoad();
            };
            img.onerror = () => {
                setError(true);
                if (onError) onError();
            };
            return;
        }

        let observer;
        let didCancel = false;

        // Small delay to ensure we don't trigger for images immediately scrolled past
        const timeoutId = setTimeout(() => {
            if (didCancel) return;

            const image = new Image();
            image.src = src;

            image.onload = () => {
                if (!didCancel) {
                    setImageSrc(src);
                    setLoading(false);
                    if (onLoad) onLoad();
                }
            };

            image.onerror = () => {
                if (!didCancel) {
                    setError(true);
                    setLoading(false);
                    if (onError) onError();
                }
            };
        }, 100);

        return () => {
            didCancel = true;
            clearTimeout(timeoutId);
        };
    }, [src, priority, onLoad, onError]);

    // Construct standard img props
    const imgProps = {
        src: priority ? src : imageSrc || (typeof placeholder === 'string' ? '' : null),
        alt,
        className: `transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} ${className}`,
        width,
        height,
        loading: priority ? 'eager' : 'lazy',
        decoding: 'async',
        style: { objectFit },
        ...props
    };

    if (error) {
        return (
            <div
                className={`bg-gray-200 dark:bg-slate-700 flex items-center justify-center ${className}`}
                style={{ width, height }}
            >
                <ImageOff className="text-gray-400 dark:text-slate-500" size={24} />
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
            {/* Placeholder / Skeleton */}
            {loading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 animate-pulse" />
            )}

            {/* Actual Image */}
            {(priority || imageSrc) && (
                <img
                    {...imgProps}
                />
            )}
        </div>
    );
};

export default OptimizedImage;
