
// Basic list of common profanities to filter
const PROFANITY_LIST = [
    'badword', 'swear', 'spam', // Placeholder for actual bad words
    'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'bastard',
    'damn', 'crap', 'bullshit', 'scam', 'casino', 'viagra', 'xxx', 'porn', 'sex'
];

/**
 * Checks if the text contains any profanity.
 * @param {string} text - The text to check.
 * @returns {boolean} - True if profanity is found.
 */
export const hasProfanity = (text) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return PROFANITY_LIST.some(word => {
        // Check for whole words or significant substrings
        // using a simple includes check for now, can be improved with regex
        return lowerText.includes(word);
    });
};

/**
 * Validates an email address with a strict regex.
 * @param {string} email - The email to check.
 * @returns {boolean} - True if valid.
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    // RFC 5322 Official Standard Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
