import React, { useState, useEffect } from 'react'
import './Greeting.css'
import AnimatedBlobs from './AnimatedBlobs'

interface GreetingProps {
  scrollToAbout: () => void
}

const Greeting: React.FC<GreetingProps> = ({ scrollToAbout }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const titles = [
    'Software Engineer',
    'Data Engineer',
    'MLOps Specialist',
    'Software Enthusiast',
    'Team Leader',
    'Consultant'
  ];
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentTitle = titles[loopNum % titles.length];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentTitle.substring(0, currentIndex + 1));
        setCurrentIndex(prevIndex => prevIndex + 1);
        
        // If we've typed the full word
        if (currentIndex >= currentTitle.length - 1) {
          // Wait a bit before starting to delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        setDisplayText(currentTitle.substring(0, currentIndex - 1));
        setCurrentIndex(prevIndex => prevIndex - 1);
        
        // If we've deleted the full word
        if (currentIndex <= 1) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setCurrentIndex(0);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, titles]);
  
  return (
    <div className="greeting-container">
      <AnimatedBlobs />
      <div className="greeting-content">
        <h1 className="greeting-title">
          <span className="greeting-hi">Hi,</span>
          <br />
          I'm <span className="greeting-name">Dami</span>
        </h1>
        <h2 className="greeting-subtitle">
          A self taught <span className="typing-text">{displayText}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="greeting-description">
          I'd like to show you some of my work... 
          <br/>Care to take a look?
        </p>
        <div className="greeting-buttons">
          <button className="secondary-button" onClick={scrollToAbout}>
            Tell me more
          </button>
        </div>
      </div>
    </div>
  )
}

export default Greeting 