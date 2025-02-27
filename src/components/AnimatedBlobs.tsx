import React, { useEffect, useRef, useState } from 'react';
import './AnimatedBlobs.css';

const AnimatedBlobs: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWhiteDogSmiling, setIsWhiteDogSmiling] = useState(false);
  const [yellowDogPosition, setYellowDogPosition] = useState({ x: 0, y: 0 });
  const [yellowDogVelocity, setYellowDogVelocity] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const blobsContainerRef = useRef<HTMLDivElement>(null);
  const yellowDogRef = useRef<HTMLDivElement>(null);
  
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
  
  // Track mouse position and handle dog reactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check proximity to white dog to make it smile
      if (blobsContainerRef.current) {
        const whiteDogElement = blobsContainerRef.current.children[0] as HTMLElement;
        if (whiteDogElement) {
          const rect = whiteDogElement.getBoundingClientRect();
          const dogCenterX = rect.left + rect.width / 2;
          const dogCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(e.clientX - dogCenterX, 2) + 
            Math.pow(e.clientY - dogCenterY, 2)
          );
          
          setIsWhiteDogSmiling(distance < 150);
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Handle yellow dog fleeing behavior
  useEffect(() => {
    // Animation loop for dog movement
    const animateYellowDog = () => {
      if (!yellowDogRef.current || !blobsContainerRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateYellowDog);
        return;
      }
      
      const yellowDogElement = yellowDogRef.current;
      const containerRect = blobsContainerRef.current.getBoundingClientRect();
      const dogRect = yellowDogElement.getBoundingClientRect();
      
      // Get the original dog position from its CSS
      const computedStyle = window.getComputedStyle(yellowDogElement);
      const originalTop = parseInt(computedStyle.top || '0', 10);
      const originalRight = parseInt(computedStyle.right || '0', 10);
      
      // Calculate distance between cursor and yellow dog
      const dogCenterX = dogRect.left + dogRect.width / 2;
      const dogCenterY = dogRect.top + dogRect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - dogCenterX, 2) + 
        Math.pow(mousePosition.y - dogCenterY, 2)
      );
      
      // Flee if cursor is close
      if (distance < 200) {
        // Calculate direction away from cursor
        const dx = dogCenterX - mousePosition.x;
        const dy = dogCenterY - mousePosition.y;
        
        // Normalize
        const length = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = dx / length;
        const normalizedDy = dy / length;
        
        // Apply fleeing force (stronger when closer)
        const fleeForce = 4 * (1 - Math.min(1, distance / 200));
        let newVelocityX = yellowDogVelocity.x + normalizedDx * fleeForce;
        let newVelocityY = yellowDogVelocity.y + normalizedDy * fleeForce;
        
        // Apply damping (friction)
        newVelocityX *= 0.98;
        newVelocityY *= 0.98;
        
        // Calculate new position
        let newPositionX = yellowDogPosition.x + newVelocityX;
        let newPositionY = yellowDogPosition.y + newVelocityY;
        
        // Improved boundary constraints for right edge
        const viewportWidth = window.innerWidth;
        
        // Use the viewport width to ensure the dog stays visible on the right
        const maxX = Math.min(
          containerRect.width - dogRect.width - originalRight,
          viewportWidth - dogRect.width - 50 // Ensure at least 50px is visible
        );
        
        // Apply boundaries
        if (newPositionX > maxX) {
          newPositionX = maxX;
          newVelocityX *= -0.5; // Bounce effect
        }
        if (newPositionY > containerRect.height - dogRect.height - originalTop) {
          newPositionY = containerRect.height - dogRect.height - originalTop;
          newVelocityY *= -0.5; // Bounce effect
        }
        if (newPositionX < -originalRight) {
          newPositionX = -originalRight;
          newVelocityX *= -0.5; // Bounce effect
        }
        if (newPositionY < -originalTop) {
          newPositionY = -originalTop;
          newVelocityY *= -0.5; // Bounce effect
        }
        
        // After applying all boundary constraints, add this additional check:
        // Ensure the dog doesn't go off the right edge of the viewport
        const dogRightEdge = dogRect.left + dogRect.width + newPositionX - yellowDogPosition.x;
        
        if (dogRightEdge > viewportWidth - 10) { // Keep at least 10px visible
          newPositionX = viewportWidth - 10 - (dogRect.left + dogRect.width - yellowDogPosition.x);
          newVelocityX *= -0.5; // Bounce effect
        }
        
        // Update state
        setYellowDogPosition({ x: newPositionX, y: newPositionY });
        setYellowDogVelocity({ x: newVelocityX, y: newVelocityY });
      } else {
        // Just slow down and stop if the cursor is far away
        if (Math.abs(yellowDogVelocity.x) > 0.1 || Math.abs(yellowDogVelocity.y) > 0.1) {
          // Apply stronger damping to slow down gradually
          const newVelocityX = yellowDogVelocity.x * 0.8;
          const newVelocityY = yellowDogVelocity.y * 0.8;
          
          // Calculate new position
          const newPositionX = yellowDogPosition.x + newVelocityX;
          const newPositionY = yellowDogPosition.y + newVelocityY;
          
          setYellowDogPosition({ x: newPositionX, y: newPositionY });
          setYellowDogVelocity({ x: newVelocityX, y: newVelocityY });
        } else if (yellowDogVelocity.x !== 0 || yellowDogVelocity.y !== 0) {
          // Set velocity to zero when it's very small
          setYellowDogVelocity({ x: 0, y: 0 });
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animateYellowDog);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateYellowDog);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, yellowDogPosition, yellowDogVelocity]);
  
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
            <div className={`blob-mouth ${isWhiteDogSmiling ? 'blob-mouth-smile' : ''}`}></div>
            <div className="dog-bone red-bone"></div>
            <div className="dog-ears">
              <div className="dog-ear dog-ear-left white-ear"></div>
              <div className="dog-ear dog-ear-right white-ear"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Yellow Poodle/Maltese Dog Blob */}
      <div 
        ref={yellowDogRef}
        className={`blob blob-2 yellow-dog ${
          yellowDogPosition.x !== 0 || yellowDogPosition.y !== 0 ? 'is-fleeing' : ''
        }`} 
        style={{
          transform: `translate(${yellowDogPosition.x}px, ${yellowDogPosition.y}px)`,
        }}
      >
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