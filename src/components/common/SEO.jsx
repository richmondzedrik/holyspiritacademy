import { useEffect } from 'react';

const SEO = ({ 
  title = 'Holy Spirit Academy of Bangued - School Information Portal',
  description = 'Official website of Holy Spirit Academy of Bangued. Stay updated with announcements, events, and school information.',
  keywords = 'Holy Spirit Academy, Bangued, school, education, Philippines, announcements',
  image = '/logo.png',
  url = '',
  type = 'website'
}) => {
  // Get current URL safely (for client-side)
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Holy Spirit Academy of Bangued');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image', image, true);
    if (currentUrl) {
      updateMetaTag('og:url', currentUrl, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (url && !canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    if (canonical && currentUrl) {
      canonical.setAttribute('href', currentUrl);
    }
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;
