import React from 'react'
import '../App.scss'

const Letter = ({ letter, showLetter }) => {
  return (
    <div className="letter">{showLetter ? letter : <span>&nbsp;</span>}</div>
  )
}

export default Letter
