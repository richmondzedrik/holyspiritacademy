import { useState, useRef, useEffect, Suspense } from 'react';
import { MessageCircle, X, Send, Sparkles, ChevronRight, Minimize2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import MascotAvatar from './MascotAvatar';
import { processMessage, INITIAL_MESSAGE } from '../../services/mascotBrain';

const Mascot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsg = { text, sender: 'user', timestamp: new Date() };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Get Response from Brain
            const response = await processMessage(text);

            const botMsg = {
                text: response.text,
                sender: 'bot',
                timestamp: new Date(),
                link: response.link,
                linkText: response.linkText,
                actions: response.actions
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Mascot Brain Error:", error);
            setMessages((prev) => [...prev, {
                text: "Oops! I got a little dizzy. Can you say that again?",
                sender: 'bot'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleActionClick = (query) => {
        handleSendMessage(query);
    };

    const handleLinkClick = (path) => {
        navigate(path);
        // Optionally close on mobile when navigating
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    // Do not show on auth pages if desired, or keep it everywhere. 
    // User asked for "integrated for system", usually implies everywhere except maybe strict auth flows to avoid distraction.
    // Checking App.jsx, hideNavFooter includes login/signup. We might want to respect that preference or keep mascot as help.
    // I'll keep it everywhere for now as a "Guide", but maybe hide on specific routes if it interferes.
    // Let's hide it on login/signup to be clean like the Navbar.
    const hideOnRoutes = ['/login', '/signup', '/forgot-password'];
    if (hideOnRoutes.includes(location.pathname)) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div
                    className="absolute bottom-16 right-0 w-[90vw] sm:w-[350px] md:w-[400px] 
                     h-[500px] max-h-[80vh] bg-white dark:bg-slate-800 
                     rounded-2xl shadow-2xl flex flex-col overflow-hidden
                     border border-gray-200 dark:border-slate-700
                     animate-in slide-in-from-bottom-5 fade-in duration-300 origin-bottom-right"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
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
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Close chat"
                        >
                            <Minimize2 size={18} />
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

                                    {/* Action Link (if any) */}
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

                                    {/* Quick Reply Chips (if any) */}
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
                    <div className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 shrink-0">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
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
            )}

            {/* Floating Button (Toggle) */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer transition-all duration-500 ease-out absolute
                   ${isOpen
                        ? 'bottom-[510px] sm:bottom-[510px] right-0 w-20 h-20 md:w-24 md:h-24'
                        : 'bottom-0 right-0 w-24 h-24 md:w-28 md:h-28'
                    }
                   flex items-center justify-center
                   hover:scale-110 active:scale-95`}
                aria-label="Toggle Support Mascot"
            >
                {/* 3D Scene */}
                <Suspense fallback={
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-xl border-4 border-white animate-pulse">
                        🐦
                    </div>
                }>
                    <Canvas
                        camera={{ position: [0, 0.2, 3.2], fov: 50 }}
                        className="!w-full !h-full pointer-events-none"
                        gl={{ antialias: true, alpha: true }}
                    >
                        {/* Soft ambient for base illumination */}
                        <ambientLight intensity={0.6} color="#E0E7FF" />

                        {/* Key light - warm from top-right */}
                        <pointLight position={[3, 4, 4]} intensity={1.2} color="#FFFFFF" />

                        {/* Fill light - cool from left */}
                        <pointLight position={[-3, 1, 2]} intensity={0.4} color="#93C5FD" />

                        {/* Rim light - subtle back glow */}
                        <pointLight position={[0, -2, -3]} intensity={0.3} color="#A5B4FC" />

                        <MascotAvatar isChatOpen={isOpen} />
                    </Canvas>
                </Suspense>

                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-800"></span>
                    </span>
                )}
            </div>

            {/* Close button that appears when open, replacing the FAB visual effectively 
          (Actually, I just hid the FAB above when open, but on mobile it's nice to have a way to close quickly if the header is high up.
           The header has a close button. Let's keep it simple.)
      */}
        </div>
    );
};

export default Mascot;
