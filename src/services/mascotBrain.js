/**
 * Level 1 Mascot Brain (Rule-Based)
 * This service handles user messages and returns pre-canned responses based on keywords.
 */

export const processMessage = async (message) => {
    const lowerMsg = message.toLowerCase();

    // Simulate a small "thinking" delay for realism
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 1. Greetings
    if (lowerMsg.match(/\b(hi|hello|hey|good morning|afternoon)\b/)) {
        return {
            text: "Hello there! 👋 I'm Spirit, your virtual guide. How can I help you today?",
            actions: [
                { label: "📅 Upcoming Events", query: "events" },
                { label: "📝 How to Apply", query: "admissions" },
                { label: "🏫 School Profile", query: "profile" }
            ]
        };
    }

    // 2. Admissions / Enrollment
    if (lowerMsg.match(/(admission|apply|enroll|register|sign up|application)/)) {
        return {
            text: "Our admissions are open! You can browse the requirements or start your application right here on the website.",
            link: "/admissions",
            linkText: "Go to Admissions Page",
            actions: [
                { label: "💰 Tuition Fees", query: "fees" },
                { label: "📞 Contact Us", query: "contact" }
            ]
        };
    }

    // 3. Tuition / Fees
    if (lowerMsg.match(/(fee|tuition|cost|price|payment)/)) {
        return {
            text: "We offer competitive tuition rates. You can view the full schedule of fees on our dedicated page.",
            link: "/fees",
            linkText: "View Fees",
            actions: [
                { label: "Enroll Now", query: "admissions" }
            ]
        };
    }

    // 4. Events / Calendar
    if (lowerMsg.match(/(event|calendar|schedule|upcoming|happening|activity)/)) {
        return {
            text: "There's always something exciting happening at Holy Spirit Academy! Check out our announcements and upcoming events.",
            link: "/upcoming-events",
            linkText: "See Upcoming Events",
            actions: [
                { label: "📢 Announcements", query: "announcements" }
            ]
        };
    }

    // 5. Announcements / News
    if (lowerMsg.match(/(announcement|news|update|notice)/)) {
        return {
            text: "Stay updated with the latest news from our administration.",
            link: "/announcements",
            linkText: "View Announcements",
            actions: [
                { label: "📅 Events", query: "events" }
            ]
        };
    }

    // 6. Contact / Location
    if (lowerMsg.match(/(contact|phone|email|address|location|where|map)/)) {
        return {
            text: "You can find us at our main campus. Feel free to reach out via phone or email!",
            link: "/contact",
            linkText: "Contact Information",
            actions: [
                { label: "🏠 Home", query: "home" }
            ]
        };
    }

    // 7. About / Profile / Mission
    if (lowerMsg.match(/(about|profile|mission|vision|history|who are you)/)) {
        return {
            text: "Holy Spirit Academy is dedicated to excellence. Our Vision and Mission guide everything we do.",
            link: "/vision-mission",
            linkText: "Read Vision & Mission",
            actions: [
                { label: "🏫 Gallery", query: "gallery" }
            ]
        };
    }

    // 8. Gallery
    if (lowerMsg.match(/(facility|facilities|gym|library|lab|campus|gallery|photos)/)) {
        return {
            text: "We have state-of-the-art facilities including science labs, a library, and sports grounds. Check out our gallery to see more!",
            link: "/gallery",
            linkText: "View Gallery",
            actions: [
                { label: "📝 Apply Now", query: "admissions" }
            ]
        };
    }

    // Default Fallback
    return {
        text: "I'm not quite sure about that one yet! 🐦 I'm still learning. Try asking about Admissions, Events, or Fees.",
        actions: [
            { label: "Help", query: "help" },
            { label: "Contact Human", query: "contact" }
        ]
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
