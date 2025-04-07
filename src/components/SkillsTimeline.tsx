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
      year: '2018',
      title: 'Started programming',
      description: 'Doing a lot of Python for my classes, started getting into general programming.',
      technologies: ['Python', 'Optimization', 'Stochastic Processes'],
      position: 'bottom'
    },
    {
      year: '2021',
      title: 'My first solution',
      description: 'I developed a model to predict future irrigation needs for farms, and sold it to an agricultural consulting company.',
      technologies: ['Python','Pandas','Sklearn'],
      position: 'top'
    },
    {
      year: '2021',
      title: 'Developed maria.ag',
      description: 'Managed to wrap the irrigation model into a web application and deployed it in AWS.',
      technologies: ['Django','AJAX','AWS'],
      position: 'top'
    },
    {
      year: '2022',
      title: 'Hired as a Data Engineer',
      description: 'I got hired as a Data Engineer, and started to work with big data and DataScience teams.',
      technologies: ['Cloud','ETLs','SQL'],
      position: 'bottom'
    },
    {
      year: '2022-2025',
      title: 'Full-Stack Journey',
      description: 'Developed several web applications using modern JS stacks',
      technologies: ['Express','React','MongoDB'],
      position: 'top'
    },
    {
      year: '2023-2024',
      title: 'Cloud & MLOps',
      description: 'Gained expertise in cloud services and MLOps practices.',
      technologies: ['MLOps', 'Docker', 'CI/CD'],
      position: 'top'
    },
    {
      year: '2024-2025',
      title: 'GenerativeAI',
      description: 'Worked on several projects using GenAI, and started to get into the more complex solutions.',
      technologies: ['GenAI','LangGraph','RAG'],
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