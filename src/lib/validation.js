import { z } from 'zod';

const COMMON_WEAK_PASSWORDS = [
  'password', 'password123', '12345678', 'qwerty123', 'letmein',
  'welcome', 'admin123', 'abc12345', 'password1', '123456789',
  'iloveyou', 'sunshine', 'princess', 'football', 'monkey123'
];

const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.com', 'guerrillamail.com', 'mailinator.com',
  '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
  'tempail.com', 'dispostable.com', 'maildrop.cc', 'yopmail.com'
];

const EMAIL_TYPOS = {
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.vom': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'outlook.con': 'outlook.com',
};

const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .min(5, 'Email is too short')
  .max(254, 'Email is too long')
  .email('Please enter a valid email address')
  .refine(email => !email.includes(' '), 'Email cannot contain spaces')
  .refine(email => (email.match(/@/g) || []).length === 1, 'Email must contain exactly one @ symbol')
  .refine(email => {
    const [localPart] = email.split('@');
    return localPart && localPart.length <= 64;
  }, 'Email username is too long')
  .refine(email => {
    const [localPart] = email.split('@');
    return localPart && !localPart.startsWith('.') && !localPart.endsWith('.');
  }, 'Email cannot start or end with a dot')
  .refine(email => !email.includes('..'), 'Email cannot contain consecutive dots')
  .refine(email => {
    const domain = email.split('@')[1];
    return domain && domain.includes('.') && domain.length >= 3;
  }, 'Email domain must include a valid extension')
  .refine(email => {
    const domain = email.split('@')[1];
    return domain && !domain.startsWith('.') && !domain.endsWith('.') && !domain.startsWith('-');
  }, 'Invalid email domain format')
  .refine(email => {
    const domain = email.split('@')[1];
    const tld = domain?.split('.').pop();
    return tld && tld.length >= 2 && /^[a-z]+$/i.test(tld);
  }, 'Email must have a valid domain extension')
  .refine(email => {
    const domain = email.split('@')[1]?.toLowerCase();
    return !DISPOSABLE_EMAIL_DOMAINS.includes(domain);
  }, 'Please use a permanent email address')
  .transform(email => email.trim().toLowerCase());

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .refine(pwd => /[A-Z]/.test(pwd), 'Password must contain at least one uppercase letter')
  .refine(pwd => /[a-z]/.test(pwd), 'Password must contain at least one lowercase letter')
  .refine(pwd => /\d/.test(pwd), 'Password must contain at least one number')
  .refine(pwd => /[!@#$%^&*(),.?":{}|<>_+=;'`~\-[\]\\]/.test(pwd), 'Password must contain at least one special character')
  .refine(pwd => !COMMON_WEAK_PASSWORDS.includes(pwd.toLowerCase()), 'This password is too common');

const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-ZÀ-ÿ\u0600-\u06FF\s'-]+$/, 'Name contains invalid characters')
  .refine(name => !/(.)\1{3,}/.test(name), 'Name contains invalid repeated characters')
  .transform(name => name.trim());

const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine(phone => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7;
  }, 'Phone number must be at least 7 digits')
  .refine(phone => {
    const digits = phone.replace(/\D/g, '');
    return digits.length <= 15;
  }, 'Phone number cannot exceed 15 digits')
  .refine(phone => {
    const digits = phone.replace(/\D/g, '');
    return !/^(\d)\1{6,}$/.test(digits);
  }, 'Please enter a valid phone number')
  .refine(phone => /^[\d\s\-().+]+$/.test(phone), 'Phone number contains invalid characters');

const cardNumberSchema = z
  .string()
  .min(1, 'Card number is required')
  .transform(val => val.replace(/\D/g, ''))
  .refine(num => num.length >= 13, 'Card number is too short')
  .refine(num => num.length <= 19, 'Card number is too long')
  .refine(num => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }, 'Invalid card number');

const expirySchema = z
  .string()
  .min(1, 'Expiry date is required')
  .refine(val => {
    const cleaned = val.replace(/\D/g, '');
    return cleaned.length >= 3 && cleaned.length <= 4;
  }, 'Enter expiry as MM/YY')
  .refine(val => {
    const cleaned = val.replace(/\D/g, '');
    const month = cleaned.length === 3
      ? parseInt(cleaned.substring(0, 1), 10)
      : parseInt(cleaned.substring(0, 2), 10);
    return month >= 1 && month <= 12;
  }, 'Invalid month (01-12)')
  .refine(val => {
    const cleaned = val.replace(/\D/g, '');
    const month = cleaned.length === 3
      ? parseInt(cleaned.substring(0, 1), 10)
      : parseInt(cleaned.substring(0, 2), 10);
    const year = cleaned.length === 3
      ? parseInt(cleaned.substring(1), 10)
      : parseInt(cleaned.substring(2), 10);
    const fullYear = year + (year < 100 ? 2000 : 0);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    return fullYear > currentYear || (fullYear === currentYear && month >= currentMonth);
  }, 'Card has expired');

const cvvSchema = z
  .string()
  .min(1, 'CVV is required')
  .transform(val => val.replace(/\D/g, ''))
  .refine(num => num.length >= 3, 'CVV is too short')
  .refine(num => num.length <= 4, 'CVV is too long');

const cardHolderSchema = z
  .string()
  .min(1, 'Card holder name is required')
  .min(3, 'Card holder name is too short')
  .max(26, 'Card holder name is too long')
  .regex(/^[A-Za-z\s\-.']+$/, 'Card holder name contains invalid characters')
  .refine(name => name.trim().split(/\s+/).filter(w => w.length > 0).length >= 2, 'Please enter first and last name')
  .transform(name => name.trim().toUpperCase());

const checkEmailTypo = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  const suggestion = EMAIL_TYPOS[domain];
  if (suggestion) {
    const localPart = email.split('@')[0];
    return `Did you mean ${localPart}@${suggestion}?`;
  }
  return null;
};

const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: 'None', color: '#e5e7eb' };
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>_+=;'`~\-[\]\\]/.test(password)) strength++;
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;
  
  strength = Math.min(strength, 5);
  
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
  
  return {
    strength,
    label: labels[strength - 1] || 'Very Weak',
    color: colors[strength - 1] || '#ef4444'
  };
};

const detectCardType = (cardNumber) => {
  const num = cardNumber.replace(/\D/g, '');
  if (/^4/.test(num)) return 'visa';
  if (/^5[1-5]|^2[2-7]/.test(num)) return 'mastercard';
  if (/^3[47]/.test(num)) return 'amex';
  if (/^6(?:011|5)/.test(num)) return 'discover';
  if (/^3(?:0[0-5]|[68])/.test(num)) return 'diners';
  if (/^(?:2131|1800|35)/.test(num)) return 'jcb';
  return 'unknown';
};

const formatCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
};

export const validateEmail = (email) => {
  try {
    const typoHint = checkEmailTypo(email || '');
    if (typoHint) return { isValid: false, error: typoHint };
    
    emailSchema.parse(email);
    return { isValid: true, error: null };
  } catch (err) {
    return { isValid: false, error: err.errors?.[0]?.message || 'Invalid email' };
  }
};

export const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    const strengthInfo = getPasswordStrength(password);
    return { isValid: true, error: null, errors: [], strength: strengthInfo.strength };
  } catch (err) {
    const errors = err.errors?.map(e => e.message) || ['Invalid password'];
    const strengthInfo = getPasswordStrength(password);
    return { isValid: false, error: errors[0], errors, strength: strengthInfo.strength };
  }
};

export const validateName = (name, fieldName = 'Name') => {
  try {
    const schema = nameSchema.refine(() => true, {
      message: `${fieldName} is required`
    });
    schema.parse(name);
    return { isValid: true, error: null };
  } catch (err) {
    let error = err.errors?.[0]?.message || `${fieldName} is invalid`;
    error = error.replace('Name', fieldName);
    return { isValid: false, error };
  }
};

export const validatePhone = (phone) => {
  try {
    phoneSchema.parse(phone);
    const digits = phone.replace(/\D/g, '');
    const formatted = phone.startsWith('+') ? '+' + digits : digits;
    return { isValid: true, error: null, formatted, digits: digits.length };
  } catch (err) {
    return { isValid: false, error: err.errors?.[0]?.message || 'Invalid phone number' };
  }
};

export const validateCardNumber = (cardNumber) => {
  try {
    const cleaned = cardNumberSchema.parse(cardNumber);
    const cardType = detectCardType(cleaned);
    return { isValid: true, error: null, cardType, formatted: formatCardNumber(cleaned) };
  } catch (err) {
    return { isValid: false, error: err.errors?.[0]?.message || 'Invalid card number', cardType: null };
  }
};

export const validateExpiryDate = (expiry) => {
  try {
    expirySchema.parse(expiry);
    const cleaned = expiry.replace(/\D/g, '');
    const month = cleaned.length === 3 ? cleaned.substring(0, 1) : cleaned.substring(0, 2);
    const year = cleaned.length === 3 ? cleaned.substring(1) : cleaned.substring(2);
    return { isValid: true, error: null, formatted: `${month.padStart(2, '0')}/${year.padStart(2, '0')}` };
  } catch (err) {
    return { isValid: false, error: err.errors?.[0]?.message || 'Invalid expiry date' };
  }
};

export const validateCVV = (cvv, cardType = 'unknown') => {
  try {
    const cleaned = cvvSchema.parse(cvv);
    const expectedLength = cardType === 'amex' ? 4 : 3;
    if (cardType !== 'unknown' && cleaned.length !== expectedLength) {
      return { isValid: false, error: `CVV should be ${expectedLength} digits for this card` };
    }
    return { isValid: true, error: null };
  } catch (err) {
    return { isValid: false, error: err.errors?.[0]?.message || 'Invalid CVV' };
  }
};

export const validateCardHolderName = (name) => {
  try {
    cardHolderSchema.parse(name);
    return { isValid: true, error: null };
  } catch (err) {
    return { isValid: false, error: err.errors?.[0]?.message || 'Invalid card holder name' };
  }
};

export const validateTravelerForm = (formData) => {
  const errors = {};
  
  const nameResult = validateName(formData.name, 'First name');
  if (!nameResult.isValid) errors.name = nameResult.error;
  
  const surnameResult = validateName(formData.surname, 'Last name');
  if (!surnameResult.isValid) errors.surname = surnameResult.error;
  
  const phoneResult = validatePhone(formData.phone);
  if (!phoneResult.isValid) errors.phone = phoneResult.error;
  
  const emailResult = validateEmail(formData.email);
  if (!emailResult.isValid) errors.email = emailResult.error;
  
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  const cardResult = validateCardNumber(formData.cardNumber);
  if (!cardResult.isValid) errors.cardNumber = cardResult.error;
  
  const holderResult = validateCardHolderName(formData.cardHolder);
  if (!holderResult.isValid) errors.cardHolder = holderResult.error;
  
  const expiryResult = validateExpiryDate(formData.expiryDate);
  if (!expiryResult.isValid) errors.expiryDate = expiryResult.error;
  
  const cvvResult = validateCVV(formData.cvv, cardResult.cardType);
  if (!cvvResult.isValid) errors.cvv = cvvResult.error;
  
  return { isValid: Object.keys(errors).length === 0, errors, cardType: cardResult.cardType };
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) errors.email = emailResult.error;
  
  if (!password || password.length === 0) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateRegisterForm = (name, email, password) => {
  const errors = {};
  
  const nameResult = validateName(name, 'Name');
  if (!nameResult.isValid) errors.name = nameResult.error;
  
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) errors.email = emailResult.error;
  
  const passwordResult = validatePassword(password);
  if (!passwordResult.isValid) errors.password = passwordResult.error;
  
  return { isValid: Object.keys(errors).length === 0, errors, passwordStrength: passwordResult.strength };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export { getPasswordStrength, detectCardType, formatCardNumber };

export default {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateCardHolderName,
  validateTravelerForm,
  validatePaymentForm,
  validateLoginForm,
  validateRegisterForm,
  sanitizeInput,
  getPasswordStrength,
  detectCardType,
  formatCardNumber,
};
