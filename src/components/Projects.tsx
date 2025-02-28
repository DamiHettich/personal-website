import React, { useState, useEffect, useCallback } from 'react';
import './Projects.css';

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const projects: ProjectProps[] = [
    {
      title: 'E-commerce Platform',
      description: 'A fully responsive e-commerce platform with product catalog, shopping cart, and secure checkout. This project demonstrates my ability to create complex, interactive web applications with modern technologies. The platform includes user authentication, product filtering, and payment processing integration.',
      imageUrl: '/images/image.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express'],
      liveUrl: 'https://example.com/project1',
      githubUrl: 'https://github.com/yourusername/project1'
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing tasks with drag-and-drop functionality and team collaboration features. This application helps teams organize their workflow with customizable boards, task assignments, and progress tracking. It includes real-time updates and notifications to keep everyone in sync.',
      imageUrl: '/images/project-2.jpg',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material UI', 'React DnD'],
      liveUrl: 'https://example.com/project2',
      githubUrl: 'https://github.com/yourusername/project2'
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather application that provides real-time forecasts and historical weather data for any location. This dashboard visualizes weather patterns with interactive charts and maps. Users can save favorite locations and receive alerts for severe weather conditions in their area.',
      imageUrl: '/images/project-3.jpg',
      technologies: ['JavaScript', 'API Integration', 'Chart.js', 'CSS Grid', 'Geolocation API'],
      liveUrl: 'https://example.com/project3',
      githubUrl: 'https://github.com/yourusername/project3'
    }
  ];

  const nextProject = useCallback(() => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToProject = (index: number) => {
    setActiveProject(index);
  };

  // Auto-advance carousel every 5 seconds if not hovering
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    
    if (!isHovering) {
      interval = setInterval(() => {
        nextProject();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, nextProject]);

  return (
    <div className="projects-section">
      <div className="container projects-container fade-in">
        <h2>Projects</h2>
        
        <div 
          className="project-showcase"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button className={`carousel-arrow prev ${isHovering ? 'visible' : ''}`} onClick={prevProject}>
            <i className="fas fa-chevron-left"></i>
          </button>

          
          
          <div className="project-display">
            <div className="project-image-container">
              <div className="project-image-backdrop"></div>
              <div className="project-image-wrapper">
                <img 
                  src={projects[activeProject].imageUrl} 
                  alt={projects[activeProject].title} 
                  className="project-image"
                />
              </div>
            </div>
            
            <div className="project-details">
              <h3>{projects[activeProject].title}</h3>
              <div className="project-tech-stack">
                <div className="tech-tags">
                  {projects[activeProject].technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="project-description">{projects[activeProject].description}</p>
              
              <div className="project-links">
                {projects[activeProject].liveUrl && (
                  <a 
                    href={projects[activeProject].liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button button-primary"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                {projects[activeProject].githubUrl && (
                  <a 
                    href={projects[activeProject].githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button button-secondary"
                  >
                    <i className="fab fa-github"></i> View Code
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <button className={`carousel-arrow next ${isHovering ? 'visible' : ''}`} onClick={nextProject}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button 
              key={index} 
              className={`carousel-dot ${index === activeProject ? 'active' : ''}`}
              onClick={() => goToProject(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects; 