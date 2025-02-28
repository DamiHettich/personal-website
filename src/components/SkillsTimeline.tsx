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
      title: 'Started Programming',
      description: 'Began my journey in software development with Python and web basics.',
      technologies: ['Python', 'HTML', 'CSS'],
      position: 'bottom'
    },
    {
      year: '2019',
      title: 'Web Development',
      description: 'Expanded my skills to include JavaScript and modern frontend frameworks.',
      technologies: ['JavaScript', 'React', 'Node.js'],
      position: 'top'
    },
    {
      year: '2020',
      title: 'Full Stack Development',
      description: 'Mastered full stack development with various backend technologies.',
      technologies: ['Express', 'MongoDB', 'PostgreSQL'],
      position: 'bottom'
    },
    {
      year: '2021',
      title: 'Mobile Development',
      description: 'Learned mobile app development for iOS and Android platforms.',
      technologies: ['React Native', 'Swift', 'Kotlin'],
      position: 'top'
    },
    {
      year: '2022',
      title: 'Cloud & DevOps',
      description: 'Gained expertise in cloud services and DevOps practices.',
      technologies: ['AWS', 'Docker', 'CI/CD'],
      position: 'bottom'
    },
    {
      year: '2023',
      title: 'AI & Machine Learning',
      description: 'Explored artificial intelligence and machine learning concepts.',
      technologies: ['TensorFlow', 'PyTorch', 'NLP'],
      position: 'top'
    }
  ];

  return (
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
  );
};

export default SkillsTimeline; 