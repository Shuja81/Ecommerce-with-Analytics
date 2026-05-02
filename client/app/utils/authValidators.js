/**
 * Authentication Form Validators
 * Reusable validation functions for Login and Signup forms
 */

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates Pakistani mobile phone number
 * Accepts formats:
 * - 03001234567 (local format)
 * - +923001234567 (international with +)
 * - 00923001234567 (international with 00)
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid Pakistan phone format
 */
export const validatePakistaniPhone = (phone) => {
  // Remove all whitespace
  const cleanPhone = phone.replace(/\s/g, '');
  const phoneRegex = /^(?:\+92|0092|0)3[0-9]{9}$/;
  return phoneRegex.test(cleanPhone);
};

export const validateInternationalPhone = (phone) => {
  const normalizedPhone = (phone || '').replace(/[\s().-]/g, '');
  const phoneRegex = /^(?:\+?[1-9]\d{7,14}|0\d{9,14})$/;
  return phoneRegex.test(normalizedPhone);
};

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 * 
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, strength: 0-4, message: string }
 */
export const validatePassword = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password)
  };

  // Calculate strength (0-4)
  let strength = 0;
  if (requirements.minLength) strength++;
  if (requirements.hasUpperCase) strength++;
  if (requirements.hasNumber) strength++;
  if (requirements.hasSpecialChar) strength++;

  const isValid = Object.values(requirements).every(req => req === true);

  const messages = {
    0: 'Very weak password',
    1: 'Weak password - add more variety',
    2: 'Fair password - add numbers and special characters',
    3: 'Strong password - good job!',
    4: 'Very strong password - excellent!'
  };

  return {
    isValid,
    strength,
    message: messages[strength],
    requirements
  };
};

/**
 * Calculates password strength level (for UI indicator)
 * @param {string} password - Password to calculate strength for
 * @returns {number} - Strength level 0-4
 */
export const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

/**
 * Gets password strength label for UI display
 * @param {number} strength - Strength level (0-4)
 * @returns {string} - Strength label
 */
export const getPasswordStrengthLabel = (strength) => {
  const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return labels[strength] || 'Weak';
};

/**
 * Gets CSS class name for password strength indicator
 * @param {number} strength - Strength level (0-4)
 * @returns {string} - CSS class name
 */
export const getPasswordStrengthClass = (strength) => {
  const classes = [
    'strength-weak',
    'strength-fair',
    'strength-good',
    'strength-strong',
    'strength-very-strong'
  ];
  return classes[strength] || 'strength-weak';
};

/**
 * Validates entire form data
 * @param {object} formData - Form data to validate
 * @param {array} requiredFields - Array of required field names
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateFormData = (formData, requiredFields = []) => {
  const errors = {};

  requiredFields.forEach(field => {
    const value = formData[field];

    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[field] = [`${field} is required`];
    } else if (field === 'email' && !validateEmail(value)) {
      errors[field] = ['Invalid email format'];
    } else if (field === 'phone' && !validatePakistaniPhone(value)) {
      errors[field] = ['Invalid Pakistan phone format'];
    } else if (field === 'password') {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        errors[field] = [passwordValidation.message];
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitizes user input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return input.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Formats phone number for display
 * Converts 03001234567 to 0300-123-4567
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneDisplay = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return phone;
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
};

export default {
  validateEmail,
  validatePakistaniPhone,
  validateInternationalPhone,
  validatePassword,
  calculatePasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthClass,
  validateFormData,
  sanitizeInput,
  formatPhoneDisplay
};
