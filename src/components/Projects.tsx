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
      title: 'Club Zada App',
      description: 'A fully responsive sports management app for managing trainings, players, and payments for a volleyball club in Chile. It also allows for centralized management of training schedules, player information and make payments through the app. It serves as a communication tool between the club and its players.',
      imageUrl: '/images/image.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
      liveUrl: 'https://example.com/project1',
      githubUrl: 'https://github.com/yourusername/project1'
    },
    {
      title: 'MARIA: Irrigation Control',
      description: 'A web application that allows for the management of irrigation systems in Chile. It allows for the monitoring of irrigation systems, forecasting future needs and planning irrigation schedules. It also has near-real-time data syncing with other platforms like Wiseconn and Agroclima, allowing for a whole-farm approach to irrigation management.',
      imageUrl: '/images/image.png',
      technologies: ['Django', 'AJAX', 'PostgreSQL', 'Bootstrap', 'AWS'],
      liveUrl: 'https://example.com/project2',
      githubUrl: 'https://github.com/yourusername/project2'
    },
    {
      title: 'Real-estate post-sales platform',
      description: 'Inherited a badly coded platform and refactored it to work. The platform allows for users to manage their real-estate portfolio and track the status of their properties, allowing them to communicate with their executives and make post-sales guarantee claims. It also functions as a project management tool for the executives to track the status of the projects.',
      imageUrl: '/images/image.png',
      technologies: ['React', 'Express', 'Material UI'],
      liveUrl: 'https://example.com/project3',
      githubUrl: 'https://github.com/yourusername/project3'
    },
    {
      title: 'RAG based web chatbot',
      description: 'Created a full-stack web chatbot using Node.js, Express, MongoDB and Gemini API. The chatbot uses a Langgraph workflow to manage RAG and LLM chain calls so as to answer questions about specific business documents. It relies on a vector database to store the embeddings of the documents and a graph database to store the relationships between the entities in the documents.',
      imageUrl: '/images/image.png',
      technologies: ['React', 'TailwindCSS', 'Express', 'MongoDB', 'Langgraph'],
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