import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import MascotAvatar from './MascotAvatar';
import Chatbox from './Chatbox';
import { processMessage, INITIAL_MESSAGE, resetConversation } from '../../services/mascotBrain';

const STORAGE_KEY = 'mascotPosition';

const Mascot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Mobile detection
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Position state - start at bottom-right
    const [position, setPosition] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn('Failed to load mascot position:', e);
        }
        return { x: 0, y: 0 };
    });

    // Refs for drag handling
    const isDragging = useRef(false);
    const hasDragged = useRef(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragStartTime = useRef(0);
    const currentDragPos = useRef({ x: 0, y: 0 });
    const mascotRef = useRef(null);
    const rafId = useRef(null);
    const windowSize = useRef({ width: window.innerWidth, height: window.innerHeight });
    const velocityRef = useRef({ x: 0, y: 0 });
    const lastDragPos = useRef({ x: 0, y: 0 });
    const lastDragTime = useRef(0);

    const MASCOT_SIZE = isMobile ? 100 : 140; // Optimized size for better appearance
    const EDGE_MARGIN = 16;
    const DRAG_THRESHOLD = isMobile ? 3 : 5;
    const TAP_TIME_THRESHOLD = isMobile ? 300 : 200;

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            windowSize.current = { width: newWidth, height: newHeight };
            setIsMobile(newWidth < 768);

            setPosition(prev => {
                const maxX = newWidth - MASCOT_SIZE - EDGE_MARGIN;
                const maxY = newHeight - MASCOT_SIZE - EDGE_MARGIN;
                return {
                    x: Math.max(EDGE_MARGIN, Math.min(prev.x, maxX)),
                    y: Math.max(EDGE_MARGIN, Math.min(prev.y, maxY))
                };
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [MASCOT_SIZE]);

    // Initialize/Validate Position
    useEffect(() => {
        const savedPos = localStorage.getItem(STORAGE_KEY);
        const maxX = windowSize.current.width - MASCOT_SIZE - EDGE_MARGIN;
        const maxY = windowSize.current.height - MASCOT_SIZE - EDGE_MARGIN;

        if (!savedPos) {
            const defaultX = windowSize.current.width - MASCOT_SIZE - EDGE_MARGIN;
            const defaultY = windowSize.current.height - MASCOT_SIZE - EDGE_MARGIN - 60;
            setPosition({ x: defaultX, y: defaultY });
        } else {
            try {
                const parsed = JSON.parse(savedPos);
                setPosition({
                    x: Math.max(EDGE_MARGIN, Math.min(parsed.x, maxX)),
                    y: Math.max(EDGE_MARGIN, Math.min(parsed.y, maxY))
                });
            } catch (e) {
                const defaultX = windowSize.current.width - MASCOT_SIZE - EDGE_MARGIN;
                const defaultY = windowSize.current.height - MASCOT_SIZE - EDGE_MARGIN - 60;
                setPosition({ x: defaultX, y: defaultY });
            }
        }
    }, [MASCOT_SIZE]);

    // Persist position (debounced for performance)
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
        }, 300); // Save after 300ms of no changes
        return () => clearTimeout(timeout);
    }, [position]);

    // Snap logic
    const snapToEdge = useCallback((x, y, velocityX = 0) => {
        const screenWidth = windowSize.current.width;
        const screenHeight = windowSize.current.height;

        const centerX = x + MASCOT_SIZE / 2;
        const threshold = screenWidth / 2;

        // Momentum influence
        const velocityInfluence = velocityX * 50;
        const adjustedCenterX = centerX + velocityInfluence;

        let finalX;
        if (adjustedCenterX < threshold) {
            finalX = EDGE_MARGIN;
        } else {
            finalX = screenWidth - MASCOT_SIZE - EDGE_MARGIN;
        }

        const finalY = Math.max(
            EDGE_MARGIN,
            Math.min(y, screenHeight - MASCOT_SIZE - EDGE_MARGIN)
        );

        return { x: finalX, y: finalY };
    }, [MASCOT_SIZE]);

    // Animation Loop
    const updateDragPosition = useCallback(() => {
        if (mascotRef.current && isDragging.current) {
            mascotRef.current.style.transform = `translate3d(${currentDragPos.current.x}px, ${currentDragPos.current.y}px, 0)`;
            mascotRef.current.style.transition = 'none';
        }
        rafId.current = null;
    }, []);

    const scheduleUpdate = useCallback(() => {
        if (rafId.current === null) {
            rafId.current = requestAnimationFrame(updateDragPosition);
        }
    }, [updateDragPosition]);

    // Input Handling
    const handleDragStart = useCallback((clientX, clientY) => {
        const mascotRect = mascotRef.current.getBoundingClientRect();

        isDragging.current = false;
        hasDragged.current = false;

        // Calculate offset from the top-left of the mascot
        dragStartPos.current = {
            x: clientX - mascotRect.left,
            y: clientY - mascotRect.top
        };

        // Current position for the transform is based on the state 'position'
        // But we want to calculate new positions relative to the drag start
        // To keep it simple, we track the mouse delta

        // Re-calculate robust offset:
        // We know the current 'position' state corresponds to where the element IS visually (ignoring CSS transitions which we kill on move)
        dragStartPos.current = {
            x: clientX,
            y: clientY
        };

        // Store original position to calculate deltas
        // We actually want the offset between mouse and element top-left
        const offsetX = clientX - position.x;
        const offsetY = clientY - position.y;

        // Store this offset to maintain it during drag
        dragStartPos.current = { offsetX, offsetY };

        currentDragPos.current = { ...position };
        dragStartTime.current = Date.now();
        lastDragPos.current = { x: clientX, y: clientY };
        lastDragTime.current = Date.now();
        velocityRef.current = { x: 0, y: 0 };
    }, [position]);

    const handleDragMove = useCallback((clientX, clientY) => {
        // Calculate new potential position based on mouse position - offset
        const newX = clientX - dragStartPos.current.offsetX;
        const newY = clientY - dragStartPos.current.offsetY;

        // Check threshold
        if (!isDragging.current) {
            const deltaX = Math.abs(newX - position.x);
            const deltaY = Math.abs(newY - position.y);
            if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
                isDragging.current = true;
                hasDragged.current = true;
                if (isOpen) setIsOpen(false); // Close chat on drag
            }
        }

        if (isDragging.current) {
            const now = Date.now();
            const dt = Math.max(1, now - lastDragTime.current);
            velocityRef.current = {
                x: (clientX - lastDragPos.current.x) / dt,
                y: (clientY - lastDragPos.current.y) / dt
            };
            lastDragPos.current = { x: clientX, y: clientY };
            lastDragTime.current = now;

            // Constrain
            const constrainedX = Math.max(
                EDGE_MARGIN,
                Math.min(newX, windowSize.current.width - MASCOT_SIZE - EDGE_MARGIN)
            );
            const constrainedY = Math.max(
                EDGE_MARGIN,
                Math.min(newY, windowSize.current.height - MASCOT_SIZE - EDGE_MARGIN)
            );

            currentDragPos.current = { x: constrainedX, y: constrainedY };
            scheduleUpdate();
        }
    }, [position, isOpen, scheduleUpdate, MASCOT_SIZE, DRAG_THRESHOLD]);

    const handleDragEnd = useCallback(() => {
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }

        const dragDuration = Date.now() - dragStartTime.current;

        if (hasDragged.current) {
            const snapped = snapToEdge(
                currentDragPos.current.x,
                currentDragPos.current.y,
                velocityRef.current.x
            );
            setPosition(snapped);

            if (mascotRef.current) {
                mascotRef.current.style.transition = 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)'; // Smooth easeOutExpoish
                mascotRef.current.style.transform = `translate3d(${snapped.x}px, ${snapped.y}px, 0)`;
            }
        } else {
            // It was a tap/click
            if (dragDuration < TAP_TIME_THRESHOLD) {
                setIsOpen(prev => !prev);
            }
        }

        setTimeout(() => {
            isDragging.current = false;
            hasDragged.current = false;
        }, 0);
    }, [snapToEdge, TAP_TIME_THRESHOLD]);

    // Mouse/Touch wiring
    const handleMouseDown = useCallback((e) => {
        if (e.button !== 0) return;
        e.preventDefault(); // Prevent text selection
        handleDragStart(e.clientX, e.clientY);

        const onMouseMove = (e) => handleDragMove(e.clientX, e.clientY);
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            handleDragEnd();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [handleDragStart, handleDragMove, handleDragEnd]);

    const handleTouchStart = useCallback((e) => {
        const touch = e.touches[0];
        // Don't prevent default immediately to allow scrolling if not grabbing mascot? 
        // Actually for the mascot itself, we want to capture it.
        // e.preventDefault(); // Moved to move handler if we want to be safe, or keep here.

        handleDragStart(touch.clientX, touch.clientY);

        const onTouchMove = (e) => {
            e.preventDefault(); // Prevent scrolling while dragging mascot
            const touch = e.touches[0];
            handleDragMove(touch.clientX, touch.clientY);
        };
        const onTouchEnd = () => {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            handleDragEnd();
        };

        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    }, [handleDragStart, handleDragMove, handleDragEnd]);


    // Message Logic
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { text, sender: 'user', timestamp: new Date() };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
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
                text: "My feathers are ruffled! Can you say that again?",
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleActionClick = (query) => handleSendMessage(query);
    const handleLinkClick = (path) => {
        navigate(path);
        if (isMobile) setIsOpen(false);
    };

    // Route hiding
    const hideOnRoutes = ['/login', '/signup', '/forgot-password'];
    if (hideOnRoutes.includes(location.pathname)) return null;

    return (
        <>
            <Chatbox
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    resetConversation(); // Reset conversation context for fresh start
                }}
                messages={messages}
                onSendMessage={handleSendMessage}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isTyping={isTyping}
                handleLinkClick={handleLinkClick}
                handleActionClick={handleActionClick}
                isMobile={isMobile}
            />

            {/* Floating Mascot */}
            <div
                ref={mascotRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                className={`fixed z-50 touch-none select-none
                    ${isMobile ? 'w-[100px] h-[100px]' : 'w-[140px] h-[140px]'}`}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    cursor: isDragging.current ? 'grabbing' : 'grab',
                    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    willChange: isDragging.current ? 'transform' : 'auto', // Only during drag for performance
                }}
                aria-label="Toggle Support Mascot"
            >
                <div className={`w-full h-full flex items-center justify-center transition-transform duration-200 ease-out 
                    ${isDragging.current ? 'scale-90 rotate-3' : 'hover:scale-105 active:scale-95'}`}>

                    <Suspense fallback={
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-xl border-4 border-white animate-pulse">
                            🐦
                        </div>
                    }>
                        <Canvas
                            camera={{ position: [0, 0.3, 3.5], fov: 50 }}
                            className="!w-full !h-full pointer-events-none"
                            gl={{
                                antialias: window.devicePixelRatio < 2, // Disable on high-DPI for performance
                                alpha: true,
                                powerPreference: "high-performance",
                                stencil: false,
                                depth: true,
                            }}
                            dpr={[1, 1.5]} // Limit pixel ratio for better performance
                            frameloop="always"
                            performance={{ min: 0.5 }} // Adaptive performance
                            style={{ background: 'transparent' }}
                        >
                            <ambientLight intensity={0.6} color="#E0E7FF" />
                            <pointLight position={[3, 4, 4]} intensity={1.2} color="#FFFFFF" />
                            <pointLight position={[-3, 1, 2]} intensity={0.4} color="#93C5FD" />
                            <pointLight position={[0, -2, -3]} intensity={0.3} color="#A5B4FC" />
                            <MascotAvatar isChatOpen={isOpen} />
                        </Canvas>
                    </Suspense>

                    {!isOpen && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 z-10 pointer-events-none">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-800"></span>
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Mascot;
