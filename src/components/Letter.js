import React from 'react'
import '../App.scss'

const Letter = ({ letter, showLetter }) => {
  return <span className="letter">{showLetter && letter}</span>
}

export default Letter
