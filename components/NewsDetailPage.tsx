import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Send, ThumbsUp, User } from 'lucide-react';
import { NewsItem, Comment } from '../types';
import { generateNewsContent } from '../services/geminiService';

interface NewsDetailPageProps {
  newsItem: NewsItem;
  onBack: () => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsItem, onBack }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [hasLiked, setHasLiked] = useState(false);
  // Initialize with some mock comments, or those from the news item if they existed
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', author: 'Sarah Jenkins', avatar: 'https://picsum.photos/100/100?random=10', text: 'Great news! Excited to see this happening.', date: '10m ago' },
    { id: '2', author: 'Mike Ross', avatar: 'https://picsum.photos/100/100?random=11', text: 'Does this impact the Q4 roadmap?', date: '1h ago' }
  ]);
  const [newComment, setNewComment] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const text = await generateNewsContent(newsItem.title, newsItem.summary);
      setContent(text);
      setLoading(false);
    };
    fetchContent();
  }, [newsItem]);

  const handleLike = () => {
    setLikes(prev => hasLiked ? prev - 1 : prev + 1);
    setHasLiked(!hasLiked);
  };

  const handleShare = () => {
    // Mock copy to clipboard
    navigator.clipboard.writeText(`Check out this news: ${newsItem.title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Create new comment object
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Alex (You)',
      avatar: 'https://picsum.photos/100/100?random=user',
      text: newComment,
      date: 'Just now'
    };
    
    // Prepend to list to show at top
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Company': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200';
      case 'Industry': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200';
      case 'Event': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6 text-sm font-medium group"
      >
        <div className="p-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-500 transition-colors">
            <ArrowLeft size={16} /> 
        </div>
        Back to Newsroom
      </button>

      {/* Article Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-6">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 w-full relative">
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/50 to-transparent">
                <span className={`inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md mb-3 ${getCategoryColor(newsItem.category)} bg-opacity-90 border-none`}>
                    {newsItem.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{newsItem.title}</h1>
                <p className="text-white/90 text-sm font-medium">{newsItem.date} • by Nebula Internal Comms</p>
            </div>
        </div>

        {/* Article Body */}
        <div className="p-8">
            {loading ? (
                <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-32 bg-slate-50 dark:bg-slate-700/50 rounded w-full my-6"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-4/5"></div>
                </div>
            ) : (
                <div 
                    className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${hasLiked ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                    <Heart size={18} className={hasLiked ? "fill-current" : ""} />
                    {likes} Likes
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-semibold transition-all">
                    <MessageCircle size={18} />
                    {comments.length} Comments
                </button>
                <button 
                    onClick={handleShare}
                    className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-sm font-semibold transition-all"
                >
                    <Share2 size={18} />
                    {copied ? "Link Copied!" : "Share"}
                </button>
            </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            Discussion <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({comments.length})</span>
        </h3>
        
        {/* Input */}
        <form onSubmit={handlePostComment} className="flex gap-4 mb-8">
            <img src="https://picsum.photos/100/100?random=user" alt="You" className="w-10 h-10 rounded-full border border-white dark:border-slate-700 shadow-sm" />
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add to the discussion..." 
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 outline-none transition-all shadow-sm placeholder-slate-400"
                />
                <button 
                    type="submit"
                    disabled={!newComment.trim()}
                    className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                >
                    <Send size={16} />
                </button>
            </div>
        </form>

        {/* List */}
        <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full border border-white dark:border-slate-700 shadow-sm" />
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{comment.author}</span>
                            <span className="text-xs text-slate-400">• {comment.date}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-slate-100 dark:border-slate-700 shadow-sm inline-block">
                            {comment.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};