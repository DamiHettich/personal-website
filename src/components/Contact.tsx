import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="container contact-container fade-in">
      <h2>Let's talk</h2>
      
      <div className="contact-content-simplified">
        <div className="contact-info">
          <p className="contact-welcome-message">
            I'm always open to interesting conversations and opportunities.
            Feel free to reach out or connect with me on social media.
          </p>
          <div className="contact-links">
            <a
              href="https://www.linkedin.com/in/damianhettich/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Connect on LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/DamiHettich"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="View GitHub Profile"
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/eldami8/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Follow on Instagram"
            >
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 