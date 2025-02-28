import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    try {
      // In a real application, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="container contact-container fade-in">
      <h2>Contact Me</h2>
      
      <div className="contact-content">
        <div className="contact-info">
          <p>
            I'm always open to talk about just about anything. Feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/damianhettich/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/DamiHettich" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="contact-form-container card">
          {formStatus === 'success' ? (
            <div className="form-success-message">
              <i className="fas fa-check-circle"></i>
              <p>Thank you for your message! I'll get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <button 
                type="submit" 
                className="button button-primary submit-button"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus === 'error' && (
                <p className="form-error-message">
                  There was an error sending your message. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact; 