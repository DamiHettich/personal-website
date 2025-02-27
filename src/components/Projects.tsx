import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  imageUrl,
  technologies,
  liveUrl,
  githubUrl
}) => {
  return (
    <div className="card project-card fade-in">
      <div className="project-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tech">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button button-primary"
            >
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button button-secondary"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A fully responsive e-commerce platform with product catalog, shopping cart, and secure checkout.',
      imageUrl: '/images/project-1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com/project1',
      githubUrl: 'https://github.com/yourusername/project1'
    },
    {
      title: 'Task Management App',
      description: 'A productivity app for managing tasks with drag-and-drop functionality and team collaboration features.',
      imageUrl: '/images/project-2.jpg',
      technologies: ['React', 'TypeScript', 'Firebase'],
      liveUrl: 'https://example.com/project2',
      githubUrl: 'https://github.com/yourusername/project2'
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather application that provides real-time forecasts and historical weather data for any location.',
      imageUrl: '/images/project-3.jpg',
      technologies: ['JavaScript', 'API Integration', 'CSS'],
      liveUrl: 'https://example.com/project3',
      githubUrl: 'https://github.com/yourusername/project3'
    }
  ];

  return (
    <div className="container projects-container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            technologies={project.technologies}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects; 