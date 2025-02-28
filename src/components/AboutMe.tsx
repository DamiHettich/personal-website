import React, { useState } from 'react';
import './AboutMe.css';
import SkillsTimeline from './SkillsTimeline';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
}

const AboutMe: React.FC = () => {
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  
  const mainCertifications: Certification[] = [
    {
      title: "Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "/certifications/aws-cloud-practitioner.png",
      link: "https://www.credly.com/badges/your-badge-id"
    },
    {
      title: "Associate Cloud Engineer",
      issuer: "Google Cloud Platform",
      date: "2025",
      image: "/certifications/gcp-ace.png",
      link: "https://www.credential.net/your-credential-id"
    },
    {
      title: "Google Cloud Professional Machine Learning Engineer",
      issuer: "Google Cloud Platform",
      date: "2024",
      image: "/certifications/gcp-ml-engineer.png",
      link: "https://www.credential.net/your-credential-id"
    }
  ];
  
  const additionalCertifications: Certification[] = [
    {
      title: "Frontend with React",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/platzi-react.png",
      link: "https://platzi.com/p/your-profile/course/1234/"
    },
    {
      title: "JavaScript Fundamentals",
      issuer: "Platzi",
      date: "2021",
      image: "/certifications/platzi-javascript.png",
      link: "https://platzi.com/p/your-profile/course/5678/"
    },
    {
      title: "Python for Data Science",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/platzi-python.png",
      link: "https://platzi.com/p/your-profile/course/9012/"
    },
    // Add more Platzi certifications as needed
  ];
  
  const displayedCertifications = showAllCertifications 
    ? [...mainCertifications, ...additionalCertifications]
    : mainCertifications;
  
  return (
    <div className="container about-me-container fade-in">
      <h2>About Me</h2>
      
      <div className="about-content">
        <div className="about-main-content">
          <div className="about-text">
            <p>
              Hello! I'm an tech enthusiast Industrial Engineer who loves building innovative software solutions, with a strong foundation in data engineering, machine learning and full stack development.
            </p>
            
            <p>
              I've specialized in MLOps, creating and deploying complex models to production, including genAI models. My experience spans across data engineering pipelines, deploying cloud infrastructure and making complex web applications.
            </p>
            
            <h3>My Skills</h3>
            
            <div className="skills-container">
              <div className="skill-category">
                <h4>Machine Learning</h4>
                <ul>
                  <li>MLOps</li>
                  <li>AI Lab creation</li>
                  <li>GenAI</li>
                  <li>LangGraph</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Data Engineering</h4>
                <ul>
                  <li>Data Pipelines</li>
                  <li>Data Lakes</li>
                  <li>Airflow/Glue</li>
                  <li>SQL/NoSQL</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Cloud & DevOps</h4>
                <ul>
                  <li>AWS/GCP/Azure</li>
                  <li>Terraform/Pulumi</li>
                  <li>CI/CD DevOps</li>
                  <li>Docker/Kubernetes</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Full Stack Web Dev</h4>
                <ul>
                  <li>Django/FastAPI</li>
                  <li>ReactJS</li>
                  <li>ExpressJS</li>
                  <li>TailwindCSS</li>
                  <li>Bootstrap/MUI</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img src="/profile-image.jpg" alt="Profile" className="profile-image" />
          </div>
        </div>
        
        {/* Certifications Section */}
        <div className="certifications-section">
          <h3>My Certifications</h3>
          <div className="certifications-grid">
            {displayedCertifications.map((cert, index) => (
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="certification-card"
                key={index}
              >
                <div className="certification-image">
                  <img src={cert.image} alt={cert.title} />
                </div>
                <div className="certification-details">
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer} • {cert.date}</p>
                </div>
              </a>
            ))}
          </div>
          
          {additionalCertifications.length > 0 && (
            <div className="view-more-container">
              <button 
                className="view-more-button"
                onClick={() => setShowAllCertifications(!showAllCertifications)}
              >
                {showAllCertifications ? 'Show Less' : 'View More Diplomas'}
              </button>
            </div>
          )}
        </div>
        
        <div className="timeline-section">
          <h3>My Professional Journey</h3>
          <SkillsTimeline />
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 