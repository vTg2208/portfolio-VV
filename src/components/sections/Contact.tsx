import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ThemeStyles, ContactFormData } from '../../types';
import { CONTACT_INFO } from '../../constants';
import { validateForm } from '../../utils';
import { EMAILJS_CONFIG } from '../../config/emailjs';

interface ContactProps {
  themeStyles: ThemeStyles;
}

interface SubmissionStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export const Contact: React.FC<ContactProps> = ({ themeStyles }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    type: null,
    message: ''
  });

//   // EmailJS configuration
//   const EMAILJS_CONFIG = {
//     SERVICE_ID: 'your_service_id', 
//     TEMPLATE_ID: 'your_template_id', 
//     PUBLIC_KEY: 'your_public_key'
//   };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submission status when user starts typing
    if (submissionStatus.type) {
      setSubmissionStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });
    
    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Vishnu Vardhan',
        reply_to: formData.email,
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmissionStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
        });
        
        // Reset form after successful submission
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmissionStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-20 ${themeStyles.sectionBackground} pt-32 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Contact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className={`${themeStyles.secondaryText} mb-6`}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              Feel free to reach out through the form or contact me directly.
            </p>
            <div className="space-y-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className={`flex items-center space-x-3 p-3 rounded-lg ${themeStyles.cardBackground} ${themeStyles.secondaryText} ${themeStyles.linkHover} transition-colors`}
              >
                <Mail size={20} className="text-blue-500" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className={`flex items-center space-x-3 p-3 rounded-lg ${themeStyles.cardBackground} ${themeStyles.secondaryText} ${themeStyles.linkHover} transition-colors`}
              >
                <Phone size={20} className="text-blue-500" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>
          
          <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md`}>
            <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
            
            {/* Success/Error Message */}
            {submissionStatus.type && (
              <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${
                submissionStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {submissionStatus.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span className="text-sm">{submissionStatus.message}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${themeStyles.inputBackground} border ${
                    errors.name ? 'border-red-500' : themeStyles.inputBorder
                  } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300`}
                  aria-label="Your name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${themeStyles.inputBackground} border ${
                    errors.email ? 'border-red-500' : themeStyles.inputBorder
                  } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300`}
                  aria-label="Your email"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, idea, or just say hello..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${themeStyles.inputBackground} border ${
                    errors.message ? 'border-red-500' : themeStyles.inputBorder
                  } rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300 resize-vertical`}
                  aria-label="Your message"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
            
            <p className={`text-xs ${themeStyles.secondaryText} mt-4 text-center`}>
              * Required fields. I typically respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
