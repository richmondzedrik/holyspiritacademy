import { useRef, useEffect } from 'react';
import { Send, ChevronRight, X, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';

const Chatbox = ({
    isOpen,
    onClose,
    messages,
    onSendMessage,
    inputValue,
    setInputValue,
    isTyping,
    handleLinkClick,
    handleActionClick,
    isMobile
}) => {
    const messagesEndRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, isTyping]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed z-[60] flex flex-col overflow-hidden font-sans
                ${isMobile
                    ? 'inset-0 w-full h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md'
                    : 'bottom-24 right-6 w-[380px] h-[600px] max-h-[75vh] rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80'
                }
                animate-in slide-in-from-bottom-5 fade-in duration-300 ease-out ring-1 ring-black/5 dark:ring-white/10`}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10"></div>
            </div>

            {/* Header */}
            <div className="relative pt-4 px-4 pb-3 flex items-center justify-between shrink-0 border-b border-gray-100/50 dark:border-slate-700/50 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}

                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <span className="text-xl animate-bounce-slow">🐦</span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full">
                            <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></span>
                        </span>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-white leading-tight flex items-center gap-1.5">
                            Spirit Assistant
                            <Sparkles size={14} className="text-yellow-500 fill-yellow-500" />
                        </h3>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Always here to help
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200 text-gray-500 dark:text-gray-400 group"
                    aria-label="Close chat"
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-backwards`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                    >
                        <div
                            className={`max-w-[85%] p-3.5 text-sm relative group transition-all duration-200 hover:shadow-md
                                ${msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm shadow-blue-500/20 shadow-lg'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-slate-700'
                                }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                            {/* Action Link */}
                            {msg.link && (
                                <button
                                    onClick={() => handleLinkClick(msg.link)}
                                    className={`mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider 
                                        w-full p-2.5 rounded-xl transition-all duration-200 group-hover:translate-x-1 border
                                        ${msg.sender === 'user'
                                            ? 'bg-white/20 hover:bg-white/30 text-white border-white/20'
                                            : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800'
                                        }`}
                                >
                                    <span className="flex-1 text-left truncate">{msg.linkText || "View Details"}</span>
                                    <ChevronRight size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start w-full animate-in fade-in zoom-in duration-300">
                        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}

                {/* Last Message Chips */}
                {messages.length > 0 && messages[messages.length - 1].actions && (
                    <div className="flex flex-wrap gap-2 mt-2 px-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {messages[messages.length - 1].actions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => handleActionClick(action.query)}
                                className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 
                                    bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 
                                    text-blue-600 dark:text-blue-400 shadow-sm hover:shadow-md
                                    hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500
                                    active:scale-95 transform whitespace-nowrap"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-white/20 dark:border-slate-700/50 shrink-0">
                <form
                    onSubmit={(e) => { e.preventDefault(); onSendMessage(inputValue); }}
                    className="relative group"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything..."
                        className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 
                            text-gray-800 dark:text-white placeholder:text-gray-400 text-sm rounded-full 
                            pl-4 pr-12 py-3 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                            transition-all duration-200 outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-blue-600 text-white 
                            disabled:bg-gray-200 dark:disabled:bg-slate-700 disabled:text-gray-400 disabled:cursor-not-allowed
                            hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/30"
                    >
                        <Send size={16} className={inputValue.trim() ? 'ml-0.5' : ''} />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center justify-center gap-1">
                        <MessageCircle size={10} />
                        Powered by Spirit AI
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
