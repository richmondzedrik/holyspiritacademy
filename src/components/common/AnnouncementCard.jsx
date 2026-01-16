import React, { useState } from 'react';
import { Calendar, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import CommentSection from './CommentSection';
import DOMPurify from 'dompurify';

const AnnouncementCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Sanitize content
  const cleanContent = DOMPurify.sanitize(post.content);

  // Check if content is long (simple heuristic based on length)
  const isLongContent = post.content.length > 200;

  // Format date with relative time
  const formatDate = () => {
    if (!post.createdAt?.seconds) return 'Just now';

    const date = new Date(post.createdAt.seconds * 1000);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays > 0 && diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 0 && diffInDays > -7) {
      // Optional: Handle "In X days" if desired, or just fall through to date
      // For now, let's fall through to full date for clarity on future events
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formattedDate = formatDate();

  return (
    <article className="group bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 flex flex-col h-full animate-fade-in transform hover:-translate-y-2">
      {post.imageUrl && (
        <div className="h-64 overflow-hidden relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-4 left-4">
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 flex-grow flex flex-col">
        {!post.imageUrl && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 px-4 py-2 rounded-full">
              <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{formattedDate}</span>
            </div>
          </div>
        )}

        <h3 className="text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2">
          {post.title}
        </h3>

        <div
          className={`text-gray-600 dark:text-gray-300 mb-6 prose prose-sm dark:prose-invert max-w-none leading-relaxed ${!expanded ? 'line-clamp-4' : ''}`}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-slate-700">
          {isLongContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="group/read inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold rounded-lg transition-all duration-300 text-sm hover:shadow-md"
            >
              {expanded ? (
                <>
                  Show Less
                  <ArrowRight size={16} className="rotate-180 group-hover/read:-translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Read More
                  <ArrowRight size={16} className="group-hover/read:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setShowComments(!showComments)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${showComments ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'} font-semibold rounded-lg transition-all duration-300 text-sm shadow-sm hover:shadow-md`}
          >
            <MessageSquare size={16} />
            <span>{showComments ? 'Hide Comments' : 'Comments'}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <CommentSection postId={post.id} />
        </div>
      )}
    </article>
  );
};

export default AnnouncementCard;
