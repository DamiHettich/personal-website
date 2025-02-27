import { useRef, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'

// Component imports
import Navbar from './components/Navbar'
import Greeting from './components/Greeting'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'
import Games from './components/Games'
import Contact from './components/Contact'

// Game component imports
import SnakeGame from './components/games/SnakeGame'
import MinesweeperGame from './components/games/MinesweeperGame'
import TetrisGame from './components/games/TetrisGame'
import MemoryMatchGame from './components/games/MemoryMatchGame'

function App(): React.ReactElement {
  // Create refs for scrolling
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const gamesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  
  // Track active section
  const [activeSection, setActiveSection] = useState<string>('home')

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>): void => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // Set up intersection observers for each section
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '-20% 0px -20% 0px', // Add a margin around the viewport
      threshold: 0.3 // Trigger when 30% of the target is visible
    }
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setActiveSection(id)
        }
      })
    }, observerOptions)
    
    // Home section is the first one without a ref
    const homeSection = document.querySelector('.greeting-section')
    if (homeSection) {
      homeSection.id = 'home'
      sectionObserver.observe(homeSection)
    }
    
    // Observe other sections
    if (aboutRef.current) {
      aboutRef.current.id = 'about'
      sectionObserver.observe(aboutRef.current)
    }
    
    if (projectsRef.current) {
      projectsRef.current.id = 'projects'
      sectionObserver.observe(projectsRef.current)
    }
    
    if (gamesRef.current) {
      gamesRef.current.id = 'games'
      sectionObserver.observe(gamesRef.current)
    }
    
    if (contactRef.current) {
      contactRef.current.id = 'contact'
      sectionObserver.observe(contactRef.current)
    }
    
    return () => {
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <Routes>
      {/* Main Route */}
      <Route
        path="/"
        element={
          <div className="app-container">
            <Navbar
              scrollToAbout={() => scrollToSection(aboutRef)}
              scrollToProjects={() => scrollToSection(projectsRef)}
              scrollToGames={() => scrollToSection(gamesRef)}
              scrollToContact={() => scrollToSection(contactRef)}
              activeSection={activeSection}
            />
            
            <main>
              <section className="section greeting-section">
                <Greeting scrollToAbout={() => scrollToSection(aboutRef)} />
              </section>

              <section className="section about-section" ref={aboutRef}>
                <AboutMe />
              </section>

              <section className="section projects-section" ref={projectsRef}>
                <Projects />
              </section>
              
              <section className="section games-section" ref={gamesRef}>
                <Games />
              </section>

              <section className="section contact-section" ref={contactRef}>
                <Contact />
              </section>
            </main>
            
            <footer className="footer">
              <div className="container">
                <p>&copy; {new Date().getFullYear()} Dami. All rights reserved.</p>
              </div>
            </footer>
          </div>
        }
      />

      {/* Game Routes */}
      <Route path="/games/snake" element={<SnakeGame />} />
      <Route path="/games/minesweeper" element={<MinesweeperGame />} />
      <Route path="/games/tetris" element={<TetrisGame />} />
      <Route path="/games/memory-match" element={<MemoryMatchGame />} />
    </Routes>
  )
}

export default App
