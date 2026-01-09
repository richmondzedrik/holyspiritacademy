import React, { useState } from 'react';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import CommentSection from './CommentSection';
import DOMPurify from 'dompurify';

const AnnouncementCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Sanitize content
  const cleanContent = DOMPurify.sanitize(post.content);

  // Check if content is long (simple heuristic based on length)
  const isLongContent = post.content.length > 200;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 flex flex-col h-full animate-fade-in">
      {post.imageUrl && (
        <div className="h-56 overflow-hidden relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <Calendar size={14} className="text-blue-600" />
            <span className="font-medium text-blue-600">
              {post.createdAt?.seconds 
                ? new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })
                : 'Just now'}
            </span>
          </div>
        </div>
        
        <div 
          className={`text-gray-600 mb-4 prose prose-sm max-w-none leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        
        <div className="flex items-center justify-between mt-auto pt-4">
          {isLongContent && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm group/read"
            >
              {expanded ? 'Show Less' : 'Read More'}
              <ArrowRight size={16} className="group-hover/read:translate-x-1 transition-transform" />
            </button>
          )}

          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium ml-auto bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <MessageSquare size={16} />
            {showComments ? 'Hide' : 'View'} Comments
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection postId={post.id} />
      )}
    </div>
  );
};

export default AnnouncementCard;
