import React from 'react';
import './AboutMe.css';

const AboutMe: React.FC = () => {
  return (
    <div className="container about-me-container fade-in">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm a passionate software engineer with expertise in building modern web applications
            and creating engaging user experiences.
          </p>
          
          <p>
            I specialize in front-end development with React and TypeScript, but I'm also comfortable
            working with back-end technologies to create full-stack solutions.
          </p>
          
          <h3>My Skills</h3>
          
          <div className="skills-container">
            <div className="skill-category">
              <h4>Frontend</h4>
              <ul>
                <li>React</li>
                <li>TypeScript</li>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h4>Backend</h4>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h4>Tools</h4>
              <ul>
                <li>Git</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>CI/CD</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="about-image">
          <img src="/profile-image.jpg" alt="Profile" className="profile-image" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 