/**
 * Enhanced Mascot Brain (Intelligent Rule-Based System)
 * Features: Context awareness, multi-intent detection, natural language understanding
 */

// Conversation context storage
let conversationContext = {
    lastTopic: null,
    askedAbout: [],
    userIntent: null,
    conversationCount: 0
};

// Helper: Get time-based greeting
const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

// Helper: Detect sentiment
const detectSentiment = (message) => {
    const positive = /\b(thanks|thank you|great|awesome|perfect|excellent|good|love|appreciate)\b/i;
    const negative = /\b(bad|terrible|awful|hate|disappointed|poor|worst)\b/i;

    if (positive.test(message)) return 'positive';
    if (negative.test(message)) return 'negative';
    return 'neutral';
};

// Helper: Extract multiple intents
const extractIntents = (message) => {
    const intents = [];
    const lowerMsg = message.toLowerCase();

    // Helper for word boundary regex with plurals support
    const match = (keywords) => {
        const pattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'i');
        return pattern.test(lowerMsg);
    };

    if (match(['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'yo', 'sup'])) intents.push('greeting');
    if (match(['admission', 'admissions', 'apply', 'applying', 'enroll', 'enrollment', 'register', 'registration', 'sign up', 'application', 'join', 'entrance', 'requirement', 'requirements'])) intents.push('admissions');
    if (match(['fee', 'fees', 'tuition', 'cost', 'costs', 'price', 'prices', 'payment', 'payments', 'pay', 'money', 'expensive', 'cheap', 'scholarship', 'scholarships', 'financial aid'])) intents.push('fees');
    if (match(['event', 'events', 'calendar', 'schedule', 'upcoming', 'happening', 'activity', 'activities', 'date', 'dates', 'when'])) intents.push('events');
    if (match(['announcement', 'announcements', 'news', 'update', 'updates', 'notice', 'notices', 'latest'])) intents.push('announcements');
    if (match(['contact', 'contacts', 'phone', 'call', 'email', 'address', 'location', 'where', 'map', 'find', 'reach', 'office'])) intents.push('contact');
    if (match(['about', 'profile', 'mission', 'vision', 'history', 'who are you', 'what is', 'tell me about', 'overview'])) intents.push('about');
    if (match(['facility', 'facilities', 'gym', 'library', 'lab', 'labs', 'campus', 'gallery', 'photo', 'photos', 'picture', 'pictures', 'building', 'buildings'])) intents.push('facilities');
    if (match(['program', 'programs', 'course', 'courses', 'curriculum', 'subject', 'subjects', 'class', 'classes', 'grade', 'level', 'levels', 'strand', 'strands', 'track', 'tracks'])) intents.push('programs');
    if (match(['teacher', 'teachers', 'faculty', 'staff', 'instructor', 'instructors', 'principal', 'admin', 'administrator', 'administrators'])) intents.push('faculty');
    if (match(['student', 'students', 'pupil', 'pupils', 'learner', 'learners', 'achievement', 'achievements', 'award', 'awards', 'winner', 'winners'])) intents.push('students');
    if (match(['help', 'assist', 'assistance', 'support', 'guide', 'what can you', 'how do', 'options', 'menu'])) intents.push('help');
    if (match(['thank', 'thanks', 'appreciate', 'grateful', 'good job', 'cool', 'nice'])) intents.push('thanks');
    if (match(['yes', 'yeah', 'yep', 'sure', 'okay', 'ok', 'correct', 'right', 'please'])) intents.push('affirmative');
    if (match(['no', 'nope', 'nah', 'not', 'never', 'wrong', 'cancel'])) intents.push('negative');

    return intents;
};

export const processMessage = async (message, conversationHistory = []) => {
    const lowerMsg = message.toLowerCase().trim();
    const sentiment = detectSentiment(message);
    const intents = extractIntents(message);

    // Update conversation context
    conversationContext.conversationCount++;

    // Simulate thinking delay (shorter for follow-ups)
    const thinkingDelay = conversationContext.conversationCount > 1 ? 400 : 600;
    await new Promise((resolve) => setTimeout(resolve, thinkingDelay));

    // Handle thanks/appreciation
    if (intents.includes('thanks')) {
        const responses = [
            "You're very welcome! 😊 Is there anything else I can help you with?",
            "Happy to help! 🐦 Feel free to ask me anything else!",
            "My pleasure! Let me know if you need more information.",
            "Glad I could assist! What else would you like to know?"
        ];
        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            actions: [
                { label: "📝 Admissions", query: "admissions" },
                { label: "📅 Events", query: "events" },
                { label: "💰 Fees", query: "fees" }
            ]
        };
    }

    // Handle affirmative responses (follow-up context)
    if (intents.includes('affirmative') && conversationContext.lastTopic) {
        return {
            text: `Great! Let me show you more about ${conversationContext.lastTopic}.`,
            link: `/${conversationContext.lastTopic}`,
            linkText: `Go to ${conversationContext.lastTopic.charAt(0).toUpperCase() + conversationContext.lastTopic.slice(1)}`,
            actions: [
                { label: "📞 Contact Us", query: "contact" },
                { label: "🏠 Home", query: "home" }
            ]
        };
    }

    // Greetings with time awareness
    if (intents.includes('greeting') && intents.length === 1) {
        const greeting = getTimeBasedGreeting();
        conversationContext.lastTopic = 'greeting';
        return {
            text: `${greeting}! 👋 I'm Spirit, your friendly guide at Holy Spirit Academy. How can I brighten your day?`,
            actions: [
                { label: "📝 How to Apply", query: "admissions" },
                { label: "📅 Upcoming Events", query: "events" },
                { label: "🏫 About the School", query: "about" },
                { label: "💡 What can you help with?", query: "help" }
            ]
        };
    }

    // Multi-intent: Admissions + Fees
    if (intents.includes('admissions') && intents.includes('fees')) {
        conversationContext.lastTopic = 'admissions';
        conversationContext.askedAbout.push('admissions', 'fees');
        return {
            text: "Great question! Our admissions process is straightforward, and we offer competitive tuition rates. You can view both the admission requirements and fee structure on their respective pages.",
            link: "/admissions",
            linkText: "View Admissions & Requirements",
            actions: [
                { label: "💰 See Fee Structure", query: "fees" },
                { label: "📞 Talk to Admissions Office", query: "contact" },
                { label: "📅 Enrollment Deadlines", query: "events" }
            ]
        };
    }

    // Admissions / Enrollment
    if (intents.includes('admissions')) {
        conversationContext.lastTopic = 'admissions';
        conversationContext.askedAbout.push('admissions');

        const responses = [
            "Wonderful! We'd love to have you join the Holy Spirit Academy family. 🎓 Our admissions process is simple and our team is here to guide you every step of the way.",
            "Exciting! 🌟 Enrolling at Holy Spirit Academy is a great choice. Let me show you how to get started with your application.",
            "I'm thrilled you're interested! 📝 Our admissions team has made the application process easy to follow. Let's get you started!"
        ];

        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            link: "/admissions",
            linkText: "Start Your Application",
            actions: [
                { label: "💰 Tuition Fees", query: "fees" },
                { label: "📞 Contact Admissions", query: "contact" },
                { label: "📅 Important Dates", query: "events" }
            ]
        };
    }

    // Fees with context awareness
    if (intents.includes('fees')) {
        conversationContext.lastTopic = 'fees';
        conversationContext.askedAbout.push('fees');

        const hasAskedAdmissions = conversationContext.askedAbout.includes('admissions');
        const baseText = "We believe in providing quality education at competitive rates. Our fee structure is transparent and includes various payment options.";
        const contextText = hasAskedAdmissions
            ? " Since you're interested in admissions, you'll find all fee details clearly outlined in the enrollment process."
            : "";

        return {
            text: baseText + contextText,
            link: "/fees",
            linkText: "View Complete Fee Structure",
            actions: [
                { label: "💳 Payment Options", query: "payment methods" },
                { label: "📝 Apply Now", query: "admissions" },
                { label: "📞 Financial Questions?", query: "contact" }
            ]
        };
    }

    // Events with enhanced responses
    if (intents.includes('events')) {
        conversationContext.lastTopic = 'events';
        conversationContext.askedAbout.push('events');

        return {
            text: "There's always something exciting happening at Holy Spirit Academy! 🎉 From academic competitions to cultural celebrations, our calendar is packed with enriching activities.",
            link: "/upcoming-events",
            linkText: "See All Upcoming Events",
            actions: [
                { label: "📢 Latest Announcements", query: "announcements" },
                { label: "🏆 Student Achievements", query: "achievements" },
                { label: "📸 Event Photos", query: "gallery" }
            ]
        };
    }

    // Announcements
    if (intents.includes('announcements')) {
        conversationContext.lastTopic = 'announcements';
        return {
            text: "Stay in the loop! 📢 Our announcements page keeps you updated with the latest news, important notices, and updates from the administration.",
            link: "/announcements",
            linkText: "Read Latest Announcements",
            actions: [
                { label: "📅 Upcoming Events", query: "events" },
                { label: "🏠 Back to Home", query: "home" }
            ]
        };
    }

    // Contact with intelligent routing
    if (intents.includes('contact')) {
        conversationContext.lastTopic = 'contact';

        let contextualText = "I'd be happy to help you get in touch! 📞 ";
        if (conversationContext.askedAbout.includes('admissions')) {
            contextualText += "For admissions inquiries, our enrollment team is ready to assist you.";
        } else if (conversationContext.askedAbout.includes('fees')) {
            contextualText += "For questions about fees and payments, our finance office can provide detailed information.";
        } else {
            contextualText += "You can reach us via phone, email, or visit our campus. We're here to help!";
        }

        return {
            text: contextualText,
            link: "/contact",
            linkText: "Get Contact Information",
            actions: [
                { label: "🗺️ Campus Location", query: "map" },
                { label: "📧 Send Email", query: "email" },
                { label: "🏠 Home", query: "home" }
            ]
        };
    }

    // About / Profile / Mission
    if (intents.includes('about')) {
        conversationContext.lastTopic = 'vision-mission';
        return {
            text: "Holy Spirit Academy is more than just a school—it's a community dedicated to nurturing minds and hearts. 💙 Our Vision and Mission reflect our commitment to academic excellence and character development.",
            link: "/vision-mission",
            linkText: "Discover Our Vision & Mission",
            actions: [
                { label: "🏫 School Profile", query: "profile" },
                { label: "👥 Meet Our Faculty", query: "faculty" },
                { label: "📸 Campus Gallery", query: "gallery" }
            ]
        };
    }

    // Facilities / Gallery
    if (intents.includes('facilities')) {
        conversationContext.lastTopic = 'gallery';
        return {
            text: "Our campus is equipped with modern facilities designed to enhance learning! 🏫 From state-of-the-art science labs to our well-stocked library and sports facilities, we've got it all.",
            link: "/gallery",
            linkText: "Explore Our Campus Gallery",
            actions: [
                { label: "🔬 Academic Facilities", query: "labs" },
                { label: "⚽ Sports Facilities", query: "sports" },
                { label: "📝 Apply Now", query: "admissions" }
            ]
        };
    }

    // Programs / Curriculum
    if (intents.includes('programs')) {
        conversationContext.lastTopic = 'programs';
        return {
            text: "We offer comprehensive programs from elementary through senior high school! 📚 Our curriculum combines academic excellence with character formation and practical skills development.",
            actions: [
                { label: "🎓 Grade Levels", query: "what grade levels" },
                { label: "📖 Curriculum Details", query: "about curriculum" },
                { label: "📝 Enroll Now", query: "admissions" },
                { label: "🏫 School Profile", query: "profile" }
            ]
        };
    }

    // Faculty / Staff
    if (intents.includes('faculty')) {
        conversationContext.lastTopic = 'faculty';
        return {
            text: "Our dedicated faculty members are passionate educators committed to student success! 👨‍🏫👩‍🏫 They bring expertise, care, and innovation to every classroom.",
            link: "/school-profile",
            linkText: "Learn About Our School",
            actions: [
                { label: "🎓 Academic Excellence", query: "about academics" },
                { label: "📝 Apply Now", query: "admissions" },
                { label: "📞 Contact Us", query: "contact" }
            ]
        };
    }

    // Students / Achievements
    if (intents.includes('students')) {
        conversationContext.lastTopic = 'achievements';
        return {
            text: "Our students are our pride! 🌟 They consistently excel in academics, sports, and various competitions. Check out their amazing achievements!",
            link: "/achievements",
            linkText: "View Student Achievements",
            actions: [
                { label: "🏆 Recent Awards", query: "recent achievements" },
                { label: "📸 Student Life", query: "gallery" },
                { label: "📝 Join Us", query: "admissions" }
            ]
        };
    }

    // Help / What can you do
    if (intents.includes('help') || lowerMsg.match(/what (can|do) you/)) {
        conversationContext.lastTopic = 'help';
        return {
            text: "I'm here to help you navigate Holy Spirit Academy! 🐦 I can assist you with:\n\n• Admissions & enrollment process\n• Tuition fees & payment options\n• Upcoming events & announcements\n• School facilities & programs\n• Contact information & location\n• And much more!\n\nJust ask me anything!",
            actions: [
                { label: "📝 Start Application", query: "admissions" },
                { label: "💰 View Fees", query: "fees" },
                { label: "📅 See Events", query: "events" },
                { label: "📞 Contact School", query: "contact" }
            ]
        };
    }

    // Question words - intelligent routing
    if (lowerMsg.match(/^(what|when|where|who|why|how)/)) {
        if (lowerMsg.match(/when (is|are|do)/)) {
            return {
                text: "For important dates and schedules, check out our events calendar and announcements! 📅",
                link: "/upcoming-events",
                linkText: "View Calendar & Events",
                actions: [
                    { label: "📢 Announcements", query: "announcements" },
                    { label: "📝 Admission Deadlines", query: "admissions" }
                ]
            };
        }

        if (lowerMsg.match(/where (is|are|can)/)) {
            return {
                text: "Looking for directions or contact details? 🗺️ I can help you find us!",
                link: "/contact",
                linkText: "Get Location & Contact Info",
                actions: [
                    { label: "📞 Phone Numbers", query: "contact" },
                    { label: "🏠 Home", query: "home" }
                ]
            };
        }

        if (lowerMsg.match(/how (do|can|to)/)) {
            return {
                text: "I can guide you through various processes! The most common questions are about admissions and enrollment. What would you like to know how to do?",
                actions: [
                    { label: "📝 How to Apply", query: "admissions" },
                    { label: "💰 How to Pay Fees", query: "fees" },
                    { label: "📞 How to Contact", query: "contact" },
                    { label: "💡 Other Questions", query: "help" }
                ]
            };
        }
    }

    // Fallback with intelligent suggestions
    const fallbackResponses = [
        "Hmm, I'm not quite sure about that one yet! 🤔 I'm still learning and growing. Could you rephrase your question, or try asking about one of these topics?",
        "That's a great question, but I need a bit more clarity! 🐦 Let me suggest some topics I'm really good at helping with:",
        "I want to help, but I'm not sure I understood that correctly! 💭 Here are some things I can definitely assist you with:"
    ];

    return {
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        actions: [
            { label: "📝 Admissions Info", query: "admissions" },
            { label: "📅 Events & Calendar", query: "events" },
            { label: "💰 Tuition Fees", query: "fees" },
            { label: "🏫 About the School", query: "about" },
            { label: "💡 See All Options", query: "help" },
            { label: "📞 Talk to a Human", query: "contact" }
        ]
    };
};

// Reset conversation context (can be called when chat is closed)
export const resetConversation = () => {
    conversationContext = {
        lastTopic: null,
        askedAbout: [],
        userIntent: null,
        conversationCount: 0
    };
};

export const INITIAL_MESSAGE = {
    text: "Hi! I'm Spirit 🐦. Ask me anything about Holy Spirit Academy!",
    sender: 'bot',
    timestamp: new Date(),
    actions: [
        { label: "📝 Admissions", query: "admissions" },
        { label: "📅 Events", query: "events" },
        { label: "💰 Fees", query: "fees" }
    ]
};
