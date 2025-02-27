import { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
  scrollToAbout: () => void;
  scrollToProjects: () => void;
  scrollToGames: () => void;
  scrollToContact: () => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({
  scrollToAbout,
  scrollToProjects,
  scrollToGames,
  scrollToContact,
  activeSection
}) => {
  const [isNavbarTransparent, setIsNavbarTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarTransparent(false);
      } else {
        setIsNavbarTransparent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isNavbarTransparent ? 'navbar-transparent' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo">Dami</a>
        
        <button className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        
        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <span 
            className={`navbar-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={scrollToAbout}
          >
            About
          </span>
          <span 
            className={`navbar-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={scrollToProjects}
          >
            Projects
          </span>
          <span 
            className={`navbar-link ${activeSection === 'games' ? 'active' : ''}`}
            onClick={scrollToGames}
          >
            Games
          </span>
          <span 
            className={`navbar-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={scrollToContact}
          >
            Contact
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 