import React, { useState, useEffect, useCallback } from 'react'
import './App.scss'
import Letter from './components/Letter'
import hangmanImage from './hangman-150.png'
import randomWords from 'random-words'

const App = () => {
  const [word, setWord] = useState(randomWords())
  const [errorLetters, setErrorLetters] = useState([])
  const [letters, setLetters] = useState(word.split(''))
  const [letterStatus, setLetterStatus] = useState(
    letters.map((letter) => false)
  )

  const handleClick = () => {
    const newWord = randomWords()
    setWord(newWord)
    setLetters(newWord.split(''))
    setErrorLetters([])
  }

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key, keyCode } = event
      const currentLetters = word.split('')

      if (currentLetters.find((_key) => _key === key)) {
        const newLetterStatus = [...letterStatus]
        currentLetters.forEach((_letter, i) => {
          if (_letter === key) {
            newLetterStatus[i] = true
          }
        })
        setLetterStatus(newLetterStatus)
      } else if (errorLetters.length === 5) {
        // game over
      } else {
        setErrorLetters([...errorLetters, key])
      }
    },
    [errorLetters, word, letterStatus]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return (
    <div className="container">
      <h1>Hangman</h1>

      <section className="content">
        <div className="game">
          {letters.map((letter, i) => (
            <Letter letter={letter} key={i} showLetter={letterStatus[i]} />
          ))}

          <p>Press a key to make your choice.</p>

          <div>
            <img src={hangmanImage} alt="hangman" />
          </div>

          <button onClick={handleClick} className="btn">
            Get me a new word
          </button>
        </div>

        <div className="letters">
          <h2>Incorrect Guesses</h2>
          {errorLetters.map((e) => {
            return <div className="letter-box">{e}</div>
          })}
        </div>
      </section>
    </div>
  )
}

export default App
