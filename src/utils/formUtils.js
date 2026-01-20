
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

/**
 * Checks individual password requirements.
 * @param {string} password - The password to check.
 * @returns {object} - Object with boolean status for each requirement.
 */
export const validatePasswordRequirements = (password) => {
    if (!password) return {
        length: false,
        uppercase: false,
        number: false,
        symbol: false
    };

    return {
        length: password.length >= 8 && password.length <= 16,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password)
    };
};

/**
 * Validates a password with strict requirements.
 * @param {string} password - The password to check.
 * @returns {object} - { isValid: boolean, message: string }
 */
export const isValidPassword = (password) => {
    if (!password) return { isValid: false, message: "Password is required" };

    const reqs = validatePasswordRequirements(password);

    if (!reqs.length) return { isValid: false, message: "Password must be 8-16 characters" };
    if (!reqs.uppercase) return { isValid: false, message: "Password must contain an uppercase letter" };
    if (!reqs.number) return { isValid: false, message: "Password must contain a number" };
    if (!reqs.symbol) return { isValid: false, message: "Password must contain a symbol" };

    return { isValid: true, message: "" };
};
