
/**
 * Simple keyword-based AI reply generator.
 * This simulates a smart assistant by detecting intent from the user's message.
 * 
 * @param {string} subject - The subject of the incoming message
 * @param {string} message - The body of the incoming message
 * @param {string} senderName - The name of the sender
 * @returns {string} - A suggested reply
 */
export const generateSmartReply = (subject, message, senderName) => {
    const text = (subject + " " + message).toLowerCase();
    const name = senderName || "there";

    let specificResponse = "";

    // Intent Detection
    if (text.includes("admission") || text.includes("enroll") || text.includes("apply") || text.includes("registration")) {
        specificResponse = `Thank you for your interest in joining Holy Spirit Academy of Bangued. 
    
Our admission process for the upcoming school year is currently open. You can find the detailed requirements and application forms on our "Admissions" page. If you would like to visit the campus for a tour or have specific questions about grade levels, please let us know.`;
    }
    else if (text.includes("fee") || text.includes("tuition") || text.includes("payment") || text.includes("cost")) {
        specificResponse = `Regarding your inquiry about tuition and fees, we offer several payment plans to accommodate our families. I can send you the current schedule of fees for your specific grade level interest. Please verify which grade level you are inquiring about so I can provide the most accurate information.`;
    }
    else if (text.includes("schedule") || text.includes("calendar") || text.includes("event") || text.includes("time")) {
        specificResponse = `Regarding the schedule/event you mentioned, we strive to keep our calendar updated. You can view the latest upcoming events on our home page or the "Student Life" section. If you need confirmation on a specific date, please reply with the details and I will double-check with our coordination office.`;
    }
    else if (text.includes("requirement") || text.includes("document")) {
        specificResponse = `For the requirements, we typically require a PSA Birth Certificate, Report Card (Form 138), and Good Moral Character certificate. You can submit these directly to the Registrar's Office.`;
    }
    else if (text.includes("thank")) {
        specificResponse = `You are very welcome! It is our pleasure to assist you. If there is anything else you need, please do not hesitate to ask.`;
    }
    else {
        // Default fallback
        specificResponse = `Thank you for reaching out to us. We have received your message and forwarded it to the appropriate department. One of our staff members will address your inquiry shortly and get back to you with more details.`;
    }

    return `Dear ${name},

${specificResponse}

Best regards,
The Admin Team
Holy Spirit Academy of Bangued`;
};
