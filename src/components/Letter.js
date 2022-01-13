import React from 'react'
import '../App.scss'

const Letter = ({ letter, showLetter }) => {
  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${showLetter && 'rotate-inner'}`}>
        <div className="flip-card-front">
          <div style={{ width: '16px;', height: '16px;' }}></div>
        </div>
        <div className="flip-card-back">{letter}</div>
      </div>
    </div>
  )
}

export default Letter
