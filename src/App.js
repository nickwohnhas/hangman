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
  const [errorLetters, setErrorLetters] = useState([])
  const [letters, setLetters] = useState(randomWords().split(''))
  const [letterStatus, setLetterStatus] = useState(
    letters.map((letter) => false)
  )
  const [alertText, setAlertText] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [alertColor, setAlertColor] = useState('')

  const [image, setImage] = useState(ImageZero)

  const handleClick = () => {
    const newWord = randomWords()
    setLetters(newWord.split(''))
    setErrorLetters([])
    setLetterStatus(newWord.split('').map((letter) => false))
    setImage(ImageZero)
    setShowAlert(false)
    setGameOver(false)
    setAlertColor('')
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
      if (gameOver || notValidLetter(event)) {
        // game is already over, or code is not a-z
        return
      } else if (errorLetters.find((eLetter) => eLetter === key)) {
        setAlertText('You have already chosen that letter')
        setAlertColor('warning')
        setShowAlert(true)
      } else if (letters.find((letter) => letter === key)) {
        // there was a match!
        setShowAlert(false)
        let newLetterStatus = [...letterStatus]
        letters.forEach((_letter, i) => {
          if (_letter === key) {
            newLetterStatus[i] = true
          }
        })
        setLetterStatus(newLetterStatus)
        // did you win?
        if (newLetterStatus.filter((letter) => letter === false).length === 0) {
          setAlertText('You have won!')
          setShowAlert(true)
          setGameOver(true)
          setAlertColor('success')
        }
      } else if (errorLetters.length === 5) {
        // you've used up all of your guesses
        setGameOver(true)
        setShowAlert(true)
        setAlertText('Game Over')
        setAlertColor('game-over')
        setImage(images[errorLetters.length + 1])
        setLetterStatus(letters.map((letter) => true))
        setErrorLetters([...errorLetters, key])
      } else {
        // no match found, add to errors
        setShowAlert(false)
        setImage(images[errorLetters.length + 1])
        setErrorLetters([...errorLetters, key])
      }
    },
    [errorLetters, gameOver, letters, letterStatus]
  )

  const notValidLetter = (event) => {
    return event.keyCode < 65 || event.keyCode > 90
  }

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return (
    <div className="container">
      <h1>Hangman</h1>

      {showAlert && (
        <div className={`alert-box ${alertColor}`}>{alertText}</div>
      )}

      <section className="content">
        <div className="game">
          <div className="letter-container">
            {letters.map((letter, i) => (
              <Letter letter={letter} key={i} showLetter={letterStatus[i]} />
            ))}
          </div>

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
