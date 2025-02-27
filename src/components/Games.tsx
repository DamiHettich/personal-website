import React from 'react'
import { Link } from 'react-router-dom'
import './Games.css'

interface GameCardProps {
  title: string
  description: string
  imageUrl: string
  gameUrl: string
  technologies: string[]
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
  const games = [
    {
      title: 'Snake Game',
      description: 'A classic Snake game where you control a snake to eat food and grow longer without hitting the walls or yourself.',
      imageUrl: '/images/snake-game.jpg',
      gameUrl: '/games/snake',
      technologies: ['React', 'TypeScript', 'Canvas API']
    },
    {
      title: 'Minesweeper',
      description: 'The classic Minesweeper game where you need to clear a board containing hidden mines without detonating any of them.',
      imageUrl: '/images/minesweeper.jpg',
      gameUrl: '/games/minesweeper',
      technologies: ['React', 'TypeScript', 'CSS Grid']
    },
    {
      title: 'Tetris',
      description: 'A recreation of the popular Tetris game where you arrange falling blocks to create complete lines.',
      imageUrl: '/images/tetris.jpg',
      gameUrl: '/games/tetris',
      technologies: ['React', 'TypeScript', 'CSS Animations']
    },
    {
      title: 'Memory Match',
      description: 'A memory card game where you need to find matching pairs of cards in the fewest moves possible.',
      imageUrl: '/images/memory-match.jpg',
      gameUrl: '/games/memory-match',
      technologies: ['React', 'TypeScript', 'CSS Transitions']
    }
  ]

  return (
    <div className="container games-container">
      <h2>Games</h2>
      <p className="games-intro">
        Check out these browser games I've built! Click on any game to play it directly in your browser.
      </p>
      <div className="games-grid">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </div>
  )
}

export default Games 