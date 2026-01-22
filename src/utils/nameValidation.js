/**
 * Name Validation Utility
 * Prevents users from registering with restricted admin-related names
 * Detects variations with spaces, special characters, and case differences
 */

// Comprehensive list of restricted terms
const RESTRICTED_TERMS = [
    // Administrative roles
    'admin',
    'administrator',
    'root',
    'superuser',
    'superadmin',
    'sysadmin',
    'system',
    'systemadmin',

    // Moderator roles
    'moderator',
    'mod',
    'webmaster',
    'webadmin',

    // Ownership roles
    'owner',
    'founder',
    'ceo',
    'president',
    'director',
    'principal',
    'headmaster',
    'superintendent',

    // Staff roles
    'staff',
    'teacher',
    'faculty',
    'instructor',
    'professor',
    'dean',

    // Technical roles
    'developer',
    'dev',
    'programmer',
    'engineer',
    'tech',
    'technician',
    'support',
    'helpdesk',

    // Generic service accounts
    'service',
    'bot',
    'automated',
    'system',
    'official',
    'verified',

    // Contact/Info accounts
    'info',
    'information',
    'contact',
    'help',
    'support',
    'sales',
    'billing',
    'accounts',
    'finance',

    // Security-related
    'security',
    'audit',
    'compliance',
    'legal',

    // School-specific roles
    'registrar',
    'admissions',
    'enrollment',
    'guidance',
    'counselor',
    'librarian',
    'nurse',

    // Generic privileged terms
    'master',
    'chief',
    'head',
    'lead',
    'senior',
    'executive',
    'manager',
    'supervisor',
    'coordinator',
    'assistant',

    // Potential impersonation
    'hsab',
    'holyspirit',
    'academy',
    'school',
    'bangued',
];

/**
 * Normalizes a string by removing spaces, dots, hyphens, underscores
 * and converting to lowercase for comparison
 * @param {string} str - String to normalize
 * @returns {string} Normalized string
 */
const normalizeString = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[\s._\-]/g, '') // Remove spaces, dots, underscores, hyphens
        .trim();
};

/**
 * Checks if a string contains any restricted terms
 * @param {string} str - String to check
 * @returns {object} { isRestricted: boolean, matchedTerm: string|null }
 */
const containsRestrictedTerm = (str) => {
    const normalized = normalizeString(str);

    for (const term of RESTRICTED_TERMS) {
        const normalizedTerm = normalizeString(term);

        // Check if the normalized string equals the term exactly
        // or starts with the term followed by numbers/special chars
        if (normalized === normalizedTerm ||
            normalized.startsWith(normalizedTerm) && /^\d/.test(normalized.slice(normalizedTerm.length))) {
            return { isRestricted: true, matchedTerm: term };
        }
    }

    return { isRestricted: false, matchedTerm: null };
};

/**
 * Validates a full name (first, middle, last)
 * @param {string} firstName - First name
 * @param {string} middleName - Middle name (optional)
 * @param {string} lastName - Last name
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateName = (firstName, middleName, lastName) => {
    // Check first name
    const firstNameCheck = containsRestrictedTerm(firstName);
    if (firstNameCheck.isRestricted) {
        return {
            isValid: false,
            message: `The name "${firstNameCheck.matchedTerm}" or its variations are not allowed for security reasons. Please use your real name.`
        };
    }

    // Check middle name (if provided)
    if (middleName && middleName.trim()) {
        const middleNameCheck = containsRestrictedTerm(middleName);
        if (middleNameCheck.isRestricted) {
            return {
                isValid: false,
                message: `The name "${middleNameCheck.matchedTerm}" or its variations are not allowed for security reasons. Please use your real name.`
            };
        }
    }

    // Check last name
    const lastNameCheck = containsRestrictedTerm(lastName);
    if (lastNameCheck.isRestricted) {
        return {
            isValid: false,
            message: `The name "${lastNameCheck.matchedTerm}" or its variations are not allowed for security reasons. Please use your real name.`
        };
    }

    // Check full name combination
    const fullName = `${firstName} ${middleName} ${lastName}`;
    const fullNameCheck = containsRestrictedTerm(fullName);
    if (fullNameCheck.isRestricted) {
        return {
            isValid: false,
            message: `The name "${fullNameCheck.matchedTerm}" or its variations are not allowed for security reasons. Please use your real name.`
        };
    }

    return { isValid: true, message: '' };
};

/**
 * Validates an email address for restricted terms
 * @param {string} email - Email address to validate
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
    if (!email) {
        return { isValid: true, message: '' };
    }

    // Extract the local part (before @)
    const localPart = email.split('@')[0];

    const emailCheck = containsRestrictedTerm(localPart);
    if (emailCheck.isRestricted) {
        return {
            isValid: false,
            message: `Email addresses containing "${emailCheck.matchedTerm}" or its variations are not allowed for security reasons. Please use a different email address.`
        };
    }

    return { isValid: true, message: '' };
};

/**
 * Validates both name and email together
 * @param {string} firstName - First name
 * @param {string} middleName - Middle name (optional)
 * @param {string} lastName - Last name
 * @param {string} email - Email address
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateUserRegistration = (firstName, middleName, lastName, email) => {
    // Validate name
    const nameValidation = validateName(firstName, middleName, lastName);
    if (!nameValidation.isValid) {
        return nameValidation;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        return emailValidation;
    }

    return { isValid: true, message: '' };
};

/**
 * Get list of restricted terms (for reference/documentation)
 * @returns {Array<string>} Array of restricted terms
 */
export const getRestrictedTerms = () => {
    return [...RESTRICTED_TERMS];
};
