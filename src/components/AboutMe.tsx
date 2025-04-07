import React, { useState, forwardRef, useMemo } from 'react';
import './AboutMe.css';
import SkillsTimeline from './SkillsTimeline';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

const AboutMe = forwardRef<HTMLDivElement>((_props, ref) => {
  const [visibleAdditionalCount, setVisibleAdditionalCount] = useState(0);
  const batchSize = 3;
  
  const mainCertifications: Certification[] = [
    {
      title: "Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "/certifications/awscp.png"
    },
    {
      title: "Professional Cloud Engineer",
      issuer: "Google Cloud Platform",
      date: "Pending ",
      image: "/certifications/gcp-ace.png"
    },
    {
      title: "Machine Learning on Google Cloud",
      issuer: "Google Cloud Platform",
      date: "2024",
      image: "/certifications/mlgcp.png"
    }
  ];
  
  const additionalCertifications: Certification[] = [
    {
      title: "Introduction to ReactJS 17",
      issuer: "Platzi",
      date: "2023",
      image: "/certifications/reactintro.png"
    },
    {
      title: "CSS Grid Course",
      issuer: "Platzi",
      date: "2023",
      image: "/certifications/cssgrid.png"
    },
    {
      title: "AWS Compute Course",
      issuer: "Platzi",
      date: "2023",
      image: "/certifications/awscompute.png"
    },
    {
      title: "AWS Fundamentals Course",
      issuer: "Platzi",
      date: "2023",
      image: "/certifications/awsfundamentals.png"
    },
    {
      title: "Practical Course: Create your JS Videogame",
      issuer: "Platzi",
      date: "2023",
      image: "/certifications/jsvideogame.png"
    },
    {
      title: "History of the web: how it works",
      issuer: "Platzi",
      date: "2023",
      image: "/certifications/webhistory.png"
    },
    {
      title: "Introduction to the Terminal and CLI",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/cliintro.png"
    },
    {
      title: "Intermediate Python Course",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/pythonintermediate.png"
    },
    {
      title: "Basic Python Course",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/pythonbasic.png"
    },
    {
      title: "Business and Data Science Course",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/datascience.png"
    },
    {
      title: "Jupyter Notebooks and Anaconda Course",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/jupyter.png"
    },
    {
      title: "Computer Science Fundamentals",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/computerfundamentals.png"
    },
    {
      title: "Mathematics fundamentals",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/mathfundamentals.png"
    },
    {
      title: "Basic Excel Course",
      issuer: "Platzi",
      date: "2022",
      image: "/certifications/excelbasic.png"
    }
  ];
  
  const displayedCertifications = useMemo(() => {
    const visibleAdditional = additionalCertifications.slice(0, visibleAdditionalCount);
    return [...mainCertifications, ...visibleAdditional];
  }, [mainCertifications, additionalCertifications, visibleAdditionalCount]);
  
  const allAdditionalShown = visibleAdditionalCount >= additionalCertifications.length;
  
  const handleViewMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (allAdditionalShown) {
      setVisibleAdditionalCount(0);
    } else {
      setVisibleAdditionalCount(prevCount => Math.min(prevCount + batchSize, additionalCertifications.length));
    }
  };

  return (
    <div ref={ref} className="container about-me-container fade-in">
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
                  <li>AWS/GCP</li>
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
            <img src="/profilepic.png" alt="Profile" className="profile-image" />
          </div>
        </div>
        
        <div className="certifications-section">
          <h3>My Certifications and Courses</h3>
          <div className="certifications-grid">
            {displayedCertifications.map((cert, index) => {
              const isPending = cert.date === 'Pending ';

              return (
                <div
                  className={`certification-card ${isPending ? 'pending' : ''}`}
                  key={index}
                >
                  <div className="certification-image">
                    {isPending ? (
                      <div className="wip-indicator">
                        <i className="fas fa-person-digging fa-3x"></i>
                        <span>Work in Progress</span>
                      </div>
                    ) : (
                      <img src={cert.image} alt={`${cert.title} Certification Screenshot`} />
                    )}
                  </div>
                  <div className="certification-details">
                    <h4>{cert.title}</h4>
                    <p>
                      {cert.issuer} • {cert.date}
                      {isPending && (
                        <i className="fas fa-clock pending-icon"></i>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {additionalCertifications.length > 0 && (
            <div className="view-more-container">
              <button
                className="view-more-button"
                onClick={handleViewMoreClick}
              >
                {allAdditionalShown ? 'Show Less' : 'View More Diplomas'}
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
});

AboutMe.displayName = 'AboutMe';

export default AboutMe; 