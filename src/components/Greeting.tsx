import React from 'react'
import './Greeting.css'
import AnimatedBlobs from './AnimatedBlobs'

interface GreetingProps {
  scrollToAbout: () => void
}

const Greeting: React.FC<GreetingProps> = ({ scrollToAbout }) => {
  return (
    <div className="greeting-container">
      <AnimatedBlobs />
      <div className="greeting-content">
        <h1 className="greeting-title">
          <span className="greeting-hi">Hi,</span>
          <br />
          I'm <span className="greeting-name">Dami</span>
        </h1>
        <h2 className="greeting-subtitle">A self taught Software Engineer, always learning and building all sorts of software</h2>
        <p className="greeting-description">
          Would you like to know more about me?
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