export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function validateUsername(username: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(username);
  
  if (!sanitized || sanitized.length === 0) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Username must be at least 2 characters' };
  }
  
  if (sanitized.length > 20) {
    return { isValid: false, error: 'Username must be less than 20 characters' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }
  
  return { isValid: true };
}

export function validatePassword(password: string): { isValid: boolean; strength?: number; feedback?: string[] } {
  const feedback: string[] = [];
  let strength = 0;
  
  if (password.length >= 8) strength += 25;
  else feedback.push('At least 8 characters');
  
  if (/[a-z]/.test(password)) strength += 25;
  else feedback.push('Lowercase letter');
  
  if (/[A-Z]/.test(password)) strength += 25;
  else feedback.push('Uppercase letter');
  
  if (/[0-9]/.test(password)) strength += 25;
  else feedback.push('Number');
  
  if (/[^a-zA-Z0-9]/.test(password)) strength += 25;
  else feedback.push('Special character');
  
  return { isValid: strength >= 50, strength, feedback };
}

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
