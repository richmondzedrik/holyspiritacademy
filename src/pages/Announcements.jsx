import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPosts, getPost } from '../services/postService';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { PostSkeleton } from '../components/common/Skeletons';
import CommentSection from '../components/common/CommentSection';
import { Bell, Search, Calendar, Clock, Share2, FileText, ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

const Announcements = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          // Fetch single post
          const postData = await getPost(id);
          setPost(postData);
        } else {
          // Fetch all posts
          const data = await getPosts();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to load posts", error);
        toast.error("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || 'Announcement',
          text: 'Check out this announcement',
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Copy to clipboard as fallback
          navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard!');
        }
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Format date and time
  const formatDateTime = (timestamp) => {
    if (!timestamp?.seconds) return { date: 'Just now', time: '' };
    const date = new Date(timestamp.seconds * 1000);
    return {
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  };

  // If viewing a single post
  if (id) {
    const dateTime = post ? formatDateTime(post.createdAt) : { date: '', time: '' };
    const cleanContent = post ? DOMPurify.sanitize(post.content) : '';

    return (
      <>
        <SEO 
          title={post?.title || 'Announcement - Holy Spirit Academy of Bangued'}
          description={post?.content?.substring(0, 160) || 'Read this announcement from Holy Spirit Academy of Bangued'}
          keywords="announcements, news, events, school updates"
        />
        <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="space-y-8">
                <PostSkeleton />
              </div>
            ) : post ? (
              <FadeIn>
                <Link 
                  to="/announcements"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-6 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back to Announcements
                </Link>

                {/* Banner Image */}
                {post.imageUrl && (
                  <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{dateTime.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{dateTime.time}</span>
                  </div>
                  <div className="ml-auto text-gray-500 dark:text-gray-400">
                    Posted by <span className="font-semibold text-gray-700 dark:text-gray-300">System Administrator</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
                  {post.title}
                </h1>

                {/* Content */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none mb-12 text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />

                {/* Tags and Share */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                    <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-700 dark:text-blue-300">Important Announcement</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
                  <CommentSection postId={post.id} />
                </div>
              </FadeIn>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Announcement not found</h2>
                <Link to="/announcements" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                  Go back to Announcements
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // List view
  return (
    <>
      <SEO 
        title="Announcements - Holy Spirit Academy of Bangued"
        description="Stay updated with the latest news, events, and important information from Holy Spirit Academy of Bangued."
        keywords="announcements, news, events, school updates, Holy Spirit Academy, Bangued"
      />
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                  <Bell className="text-white" size={32} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Announcements
              </h1>
            </div>
          </FadeIn>

          {/* Search Bar */}
          <FadeIn delay={100}>
            <div className="mb-8">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg placeholder-gray-400 dark:placeholder-gray-400"
                  />
                </div>
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-6">
              {filteredPosts.map((post, index) => {
                const dateTime = formatDateTime(post.createdAt);
                const cleanContent = DOMPurify.sanitize(post.content);
                const preview = post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';

                return (
                  <FadeIn key={post.id} delay={index * 100}>
                    <Link 
                      to={`/announcements/${post.id}`}
                      className="block bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 group"
                    >
                      {post.imageUrl && (
                        <div className="h-64 overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">{dateTime.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="font-medium">{dateTime.time}</span>
                          </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                        <div 
                          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
                        />
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                            <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-blue-700 dark:text-blue-300 text-sm">Important Announcement</span>
                          </div>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 transition-all inline-flex items-center gap-1">
                            Read More
                            <ArrowLeft size={16} className="rotate-180" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-200 dark:border-slate-700">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full">
                    <Bell size={48} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {searchTerm ? 'No announcements found' : 'No announcements yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchTerm ? 'Try adjusting your search terms' : 'Check back later for school updates and important news.'}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </>
  );
};

export default Announcements;
