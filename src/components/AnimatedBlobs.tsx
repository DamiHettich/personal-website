import React, { useEffect, useRef, useState } from 'react';
import './AnimatedBlobs.css';

const AnimatedBlobs: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const blobsContainerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate pupil position for tracking the cursor
  const calculatePupilPosition = (blobIndex: number) => {
    if (!blobsContainerRef.current) return { left: '15%', top: '30%' };
    
    const blobElement = blobsContainerRef.current.children[blobIndex] as HTMLElement;
    if (!blobElement) return { left: '15%', top: '30%' };
    
    const blobRect = blobElement.getBoundingClientRect();
    const blobCenterX = blobRect.left + blobRect.width / 2;
    const blobCenterY = blobRect.top + blobRect.height / 2;
    
    // Calculate direction to mouse from blob center
    const dx = mousePosition.x - blobCenterX;
    const dy = mousePosition.y - blobCenterY;
    
    // Normalize to percentage (with limits)
    const maxMove = 40; // Max percentage the pupil can move
    const leftPos = 50 + Math.min(maxMove, Math.max(-maxMove, dx / 10));
    const topPos = 50 + Math.min(maxMove, Math.max(-maxMove, dy / 10));
    
    return { left: `${leftPos}%`, top: `${topPos}%` };
  };
  
  return (
    <div className="animated-blobs-container" ref={blobsContainerRef}>
      {/* White Poodle/Maltese Dog Blob */}
      <div className="blob blob-1 white-dog">
        <div className="blob-body">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#ffffff" 
              d="M48.8,-56.1C61.9,-47.4,70.5,-30.5,73.4,-12.7C76.4,5.1,73.6,24,64.1,39.6C54.5,55.3,38.2,67.7,20.8,71.3C3.5,74.9,-14.9,69.6,-31.5,61C-48.1,52.3,-62.8,40.1,-70.5,23.7C-78.1,7.3,-78.8,-13.3,-70.3,-28.9C-61.8,-44.4,-44.2,-54.8,-27.7,-62.6C-11.2,-70.5,4.2,-75.7,19.3,-73.3C34.4,-70.8,49.2,-60.7,48.8,-56.1Z" 
              transform="translate(100 100)" 
            />
          </svg>
          <div className="blob-face">
            <div className="blob-eyes">
              <div className="blob-eye">
                <div className="blob-pupil" style={calculatePupilPosition(0)}></div>
              </div>
              <div className="blob-eye">
                <div className="blob-pupil" style={calculatePupilPosition(0)}></div>
              </div>
            </div>
            <div className="blob-nose"></div>
            <div className="blob-mouth"></div>
            <div className="dog-bone red-bone"></div>
            <div className="dog-ears">
              <div className="dog-ear dog-ear-left white-ear"></div>
              <div className="dog-ear dog-ear-right white-ear"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Yellow Poodle/Maltese Dog Blob */}
      <div className="blob blob-2 yellow-dog">
        <div className="blob-body">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#fff8e1" 
              d="M45.3,-55.9C58.6,-47.3,69.5,-33.4,75.2,-16.5C80.9,0.4,81.3,20.4,73.6,36.2C65.9,52,50.1,63.8,33.1,69.1C16.1,74.4,-2.1,73.3,-18.8,67.9C-35.5,62.5,-50.8,52.8,-60.9,38.7C-71,24.6,-76,6.1,-73.3,-11.3C-70.6,-28.7,-60.2,-45,-46.3,-54C-32.4,-63,-16.2,-64.7,-0.2,-64.4C15.8,-64.1,31.9,-61.9,45.3,-55.9Z" 
              transform="translate(100 100)" 
            />
          </svg>
          <div className="blob-face">
            <div className="blob-eyes">
              <div className="blob-eye">
                <div className="blob-pupil" style={calculatePupilPosition(1)}></div>
              </div>
              <div className="blob-eye">
                <div className="blob-pupil" style={calculatePupilPosition(1)}></div>
              </div>
            </div>
            <div className="blob-nose"></div>
            <div className="blob-mouth"></div>
            <div className="dog-bone blue-bone"></div>
            <div className="dog-ears">
              <div className="dog-ear dog-ear-left yellow-ear"></div>
              <div className="dog-ear dog-ear-right yellow-ear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBlobs; 