// Validation utilities for form inputs

// Validate article text
export const validateArticleText = (text) => {
  if (!text || text.trim() === '') {
    return 'Article text is required';
  }
  
  if (text.length < 100) {
    return 'Article text should be at least 100 characters';
  }
  
  if (text.length > 10000) {
    return 'Article text should not exceed 10,000 characters';
  }
  
  return null; // No errors
};

// Validate comment text
export const validateComment = (text) => {
  if (!text || text.trim() === '') {
    return 'Comment text is required';
  }
  
  if (text.length < 3) {
    return 'Comment should be at least 3 characters';
  }
  
  if (text.length > 500) {
    return 'Comment should not exceed 500 characters';
  }
  
  return null; // No errors
};

// Count remaining characters
export const getRemainingChars = (text, maxLength) => {
  return maxLength - (text ? text.length : 0);
};

// Function to truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};