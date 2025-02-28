import React from 'react'
import './SkillsTimeline.css'

interface Skill {
  year: string;
  title: string;
  description: string;
  technologies: string[];
  position: 'top' | 'bottom';
}

const SkillsTimeline: React.FC = () => {
  const skills: Skill[] = [
    {
      year: '2010',
      title: 'Flight Simulator Addons',
      description: 'I started by creating custom airports for FSX and FS9, and meddling with the game files.',
      technologies: ['GMAX', 'XML', 'C++'],
      position: 'bottom'
    },
    {
      year: '2014',
      title: 'Universidad de Chile',
      description: 'I began studying Engineering in the University of Chile, later switching to Industrial Engineering.',
      technologies: ['Business','Entrepreneurship','Math', 'Statistics', 'CS'],
      position: 'top'
    },
    {
      year: '2018',
      title: 'Started programming',
      description: 'Doing a lot of Python for my classes, started getting into general programming.',
      technologies: ['Python', 'Optimization', 'Stochastic Processes'],
      position: 'bottom'
    },
    {
      year: '2021',
      title: 'First production code',
      description: 'I developed a model to predict future irrigation needs for farms, and sold it to a consulting company.',
      technologies: ['Python','Pandas','Sklearn'],
      position: 'top'
    },
    {
      year: '2021',
      title: 'Sold my first web app',
      description: 'Managed to wrap the irrigation model into a web application and deployed it in AWS.',
      technologies: ['Django','AJAX','AWS'],
      position: 'top'
    },
    {
      year: '2022',
      title: 'Hired as a Data Engineer',
      description: 'I got hired as a Data Engineer in a consulting company, where I began to deepen my knowledge.',
      technologies: [],
      position: 'bottom'
    },
    {
      year: '2023-2024',
      title: 'Cloud & MLOps',
      description: 'Gained expertise in cloud services and MLOps practices.',
      technologies: ['GCP', 'Docker', 'CI/CD'],
      position: 'top'
    },
    {
      year: '2023-2025',
      title: 'Full-Stack Web Dev',
      description: 'Developed several web applications using modern JS stacks',
      technologies: ['Express','React','MongoDB'],
      position: 'top'
    },
    {
      year: '2024-2025',
      title: 'GenerativeAI',
      description: 'Worked on several projects using LLMs and RAG, and started to get into the field of GenerativeAI.',
      technologies: ['GenAI','LLMs','RAG'],
      position: 'bottom'
    }
  ];

  return (
    <div className="skills-timeline-container">
      <div className="skills-timeline-horizontal">
        <div className="timeline-track-horizontal">
          <div className="timeline-items-container">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`timeline-item-horizontal ${skill.position}`}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{skill.year}</div>
                  <h3 className="timeline-title">{skill.title}</h3>
                  <p className="timeline-description">{skill.description}</p>
                  <div className="timeline-technologies">
                    {skill.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="timeline-connector"></div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
          <div className="timeline-line"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTimeline; 