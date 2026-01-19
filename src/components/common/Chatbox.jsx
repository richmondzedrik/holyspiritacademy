import { useRef, useEffect } from 'react';
import { Send, ChevronRight, Minimize2, X, ArrowLeft } from 'lucide-react';

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
            className={`fixed z-[60] flex flex-col overflow-hidden
                ${isMobile
                    ? 'inset-0 w-full h-full bg-white dark:bg-slate-800'
                    : 'bottom-24 right-4 w-[350px] md:w-[400px] h-[500px] max-h-[70vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700'
                }
                animate-in slide-in-from-bottom-5 duration-300 ease-out`}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-3">
                    {isMobile && (
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-white/20 rounded-full transition-colors mr-1"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                        <span className="text-2xl" role="img" aria-label="mascot">🐦</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-base leading-tight">Spirit Assistant</h3>
                        <p className="text-xs text-blue-100 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close chat"
                >
                    {isMobile ? <X size={22} /> : <Minimize2 size={18} />}
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900/50 scroll-smooth">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm relative group
                                ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 rounded-tl-sm'
                                }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                            {/* Action Link */}
                            {msg.link && (
                                <button
                                    onClick={() => handleLinkClick(msg.link)}
                                    className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider 
                                        text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900/20 
                                        px-3 py-2 rounded-lg w-full transition-colors"
                                >
                                    {msg.linkText || "View Details"}
                                    <ChevronRight size={14} />
                                </button>
                            )}

                            {/* Quick Reply Chips */}
                            {msg.actions && msg.actions.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {msg.actions.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleActionClick(action.query)}
                                            className="text-xs bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 
                                                text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300
                                                px-2.5 py-1.5 rounded-full transition-colors border border-gray-200 dark:border-slate-600"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <span className="text-[10px] opacity-50 mt-1 block text-right">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start w-full">
                        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 shrink-0 ${isMobile ? 'pb-6' : ''}`}>
                <form
                    onSubmit={(e) => { e.preventDefault(); onSendMessage(inputValue); }}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-slate-900 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-400 transition-all"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="p-1.5 text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbox;
