import React from 'react'
import './GamePlaceholder.css'

const TetrisGame: React.FC = () => {
  return (
    <div className="game-placeholder">
      <h2>Tetris Game</h2>
      <div className="placeholder-content">
        <p>This is a placeholder for the Tetris Game.</p>
        <p>The actual game will be implemented here soon!</p>
        <div className="placeholder-image">🧩</div>
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        Back to Games
      </button>
    </div>
  )
}

export default TetrisGame 