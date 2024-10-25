 // Add your validation functions here
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateRequiredField = (value) => {
    return value.trim() !== '';
  };
  
