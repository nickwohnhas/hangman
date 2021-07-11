import React, { useState, useEffect, useCallback } from 'react'
import './App.scss'
import Letter from './components/Letter'
import ImageZero from './stage.png'
import ImageOne from './stage 1.png'
import ImageTwo from './stage 2.png'
import ImageThree from './stage 3.png'
import ImageFour from './stage 4.png'
import ImageFive from './stage 5.png'
import ImageSix from './stage 6.png'
import randomWords from 'random-words'

const App = () => {
  const [word, setWord] = useState(randomWords())
  const [errorLetters, setErrorLetters] = useState([])
  const [letters, setLetters] = useState(word.split(''))
  const [letterStatus, setLetterStatus] = useState(
    letters.map((letter) => false)
  )
  const [gameOver, setGameOver] = useState(false)

  const [image, setImage] = useState(ImageZero)

  const handleClick = () => {
    const newWord = randomWords()
    setWord(newWord)
    setLetters(newWord.split(''))
    setErrorLetters([])
    setLetterStatus(newWord.split('').map((letter) => false))
    setGameOver(false)
  }

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key } = event
      const images = [
        ImageZero,
        ImageOne,
        ImageTwo,
        ImageThree,
        ImageFour,
        ImageFive,
        ImageSix,
      ]
      if (gameOver) {
        return
      } else if (letters.find((letter) => letter === key)) {
        let newLetterStatus = [...letterStatus]

        letters.forEach((_letter, i) => {
          if (_letter === key) {
            newLetterStatus[i] = true
          }
        })
        setLetterStatus(newLetterStatus)
      } else if (errorLetters.length === 5) {
        setGameOver(true)
        setImage(images[errorLetters.length + 1])
        setErrorLetters([...errorLetters, key])
      } else {
        setImage(images[errorLetters.length + 1])
        setErrorLetters([...errorLetters, key])
      }
    },
    [errorLetters, gameOver, letters, letterStatus]
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
            <img src={image} alt="hangman" />
          </div>

          <button onClick={handleClick} className="btn">
            Get me a new word
          </button>
        </div>

        <div className="letters">
          <h2>Incorrect Guesses</h2>
          {errorLetters.map((e, i) => {
            return (
              <div key={i} className="letter-box">
                {e}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default App
