import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPosts, getPost } from '../services/postService';
import FadeIn from '../components/common/FadeIn';
import SEO from '../components/common/SEO';
import { PostSkeleton, SinglePostSkeleton, PageHeaderSkeleton } from '../components/common/Skeletons';
import CommentSection from '../components/common/CommentSection';
import { Bell, Search, Calendar, Clock, Share2, FileText, ArrowLeft, Megaphone } from 'lucide-react';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import hsabImage from '../assets/hsab.jpg';

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
          {loading ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <SinglePostSkeleton />
            </div>
          ) : post ? (
            <>
              {/* Optional: We could have a hero header here too, but for reading a specific article, focusing on the article content is often better. 
                  However, to maintain "premium feel", let's wrap the content in a nice container. */}

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                  <Link
                    to="/announcements"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-8 transition-colors group"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full group-hover:-translate-x-1 transition-transform">
                      <ArrowLeft size={20} />
                    </div>
                    Back to Announcements
                  </Link>

                  <article className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
                    {/* Banner Image */}
                    {post.imageUrl && (
                      <div className="relative h-64 md:h-96 w-full">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    <div className="p-8 md:p-12">
                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-slate-700 pb-8">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400">
                            <Calendar size={18} />
                          </div>
                          <span className="font-medium">{dateTime.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400">
                            <Clock size={18} />
                          </div>
                          <span className="font-medium">{dateTime.time}</span>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-slate-700"></div>
                        <div className="text-gray-500 dark:text-gray-400 font-medium">
                          Posted by <span className="text-gray-900 dark:text-white font-bold ml-1">System Administrator</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
                        {post.title}
                      </h1>

                      {/* Content */}
                      <div
                        className="prose prose-lg md:prose-xl dark:prose-invert max-w-none mb-12 text-gray-700 dark:text-gray-300 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                      />

                      {/* Tags and Share */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800/50">
                          <Megaphone size={18} className="text-blue-600 dark:text-blue-400" />
                          <span className="font-bold text-blue-700 dark:text-blue-300 text-sm">Official Announcement</span>
                        </div>
                        <button
                          onClick={handleShare}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Share2 size={18} />
                          Share Post
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* Comments Section */}
                  <div className="mt-12">
                    <CommentSection postId={post.id} />
                  </div>
                </FadeIn>
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-gray-100 dark:border-slate-700">
                  <div className="bg-gray-100 dark:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="text-gray-400 dark:text-gray-500" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Announcement not found</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">The announcement you are looking for has been removed or does not exist.</p>
                  <Link to="/announcements" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Back to Announcements
                  </Link>
                </div>
              </FadeIn>
            </div>
          )}
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
                    <Bell className="text-white" size={40} />
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Announcements
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                  Latest news, updates, and upcoming events from the Holy Spirit Academy of Bangued.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <FadeIn delay={100}>
            <div className="mb-12 relative -mt-32 z-20">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-blue-500/25">
                  Search
                </button>
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post, index) => {
                const dateTime = formatDateTime(post.createdAt);
                const cleanContent = DOMPurify.sanitize(post.content);
                // Create a text-only preview
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = cleanContent;
                const textContent = tempDiv.textContent || tempDiv.innerText || "";
                const preview = textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent;

                return (
                  <FadeIn key={post.id} delay={index * 100}>
                    <Link
                      to={`/announcements/${post.id}`}
                      className="block bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 group hover:-translate-y-1"
                    >
                      <div className="flex flex-col md:flex-row h-full">
                        {post.imageUrl && (
                          <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                          </div>
                        )}
                        <div className={`p-8 md:p-10 flex flex-col ${post.imageUrl ? 'md:w-3/5' : 'w-full'}`}>
                          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1.5 bg-blue-50 dark:bg-slate-700/50 px-3 py-1 rounded-lg text-blue-600 dark:text-blue-400 font-semibold">
                              <Calendar size={14} />
                              {dateTime.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} />
                              {dateTime.time}
                            </span>
                          </div>

                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                            {post.title}
                          </h2>

                          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3 flex-grow">
                            {preview}
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700 mt-auto">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                                <FileText size={14} className="text-gray-500 dark:text-gray-400" />
                              </div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Read more</span>
                            </div>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                              <ArrowLeft size={20} className="rotate-[135deg]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="bg-gray-100 dark:bg-slate-700 p-6 rounded-full">
                    <Megaphone size={48} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {searchTerm ? 'No results found' : 'No announcements yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                  {searchTerm ? `We couldn't find any announcements matching "${searchTerm}"` : 'Check back later for school updates and important news.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-6 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </>
  );
};

export default Announcements;
