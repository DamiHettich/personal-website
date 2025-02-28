import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Games.css'

interface GameCardProps {
  title: string
  description: string
  imageUrl: string
  gameUrl: string
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  imageUrl,
  gameUrl
}) => {
  return (
    <div className="card game-card fade-in">
      <div className="game-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="game-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="game-links">
          <Link to={gameUrl} className="button button-primary play-button">
            Play Game
          </Link>
        </div>
      </div>
    </div>
  )
}

const Games: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const games = [
    {
      title: 'Minesweeper',
      description: 'The classic Minesweeper game where you need to find all hidden mines. Be careful with them!',
      imageUrl: '/images/minesweeper.jpg',
      gameUrl: '/games/minesweeper'
    },
    {
      title: 'Jumping Dino',
      description: 'Just your usual jumping game. The difference is that now you do have a stable internet connection.',
      imageUrl: '/images/tetris.jpg',
      gameUrl: '/games/tetris'
    },
    {
      title: 'Skiing Game',
      description: 'A game I used to play back in the day. Escape the monster as long as you can avoid the trees.',
      imageUrl: '/images/skiing.jpg',
      gameUrl: '/games/the-skiing-game'
    },
    // {
    //   title: 'Snake',
    //   description: 'Remembering old nokias, you are a snake that grows as long as possible without harming yourself.',
    //   imageUrl: '/images/snake-game.jpg',
    //   gameUrl: '/games/snake'
    // },
    // {
    //   title: 'Tetris',
    //   description: 'A recreation of the popular Tetris game where you arrange falling blocks to create complete lines.',
    //   imageUrl: '/images/tetris.jpg',
    //   gameUrl: '/games/tetris'
    // }
  ]

  return (
    <div className="container games-container">
      <h2>Games</h2>
      <p className="games-intro">
        If you got this far, you must be bored. You can have fun with these games I built!
      </p>
      
      <div className="games-carousel-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="games-carousel" ref={scrollContainerRef}>
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
        
        <button className="scroll-button right" onClick={scrollRight}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Games 