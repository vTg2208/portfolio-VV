import { SCROLL_CONFIG } from '../constants';

export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
  sectionId: string,
  callback?: () => void
) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - SCROLL_CONFIG.HEADER_HEIGHT;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    callback?.();
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (formData: { name: string; email: string; message: string }) => {
  const errors: { [key: string]: string } = {};
  
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
  if (!formData.message.trim()) errors.message = 'Message is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
