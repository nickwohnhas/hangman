import React, { useState } from 'react';
import './App.scss';
import hangmanImage from './hangman-150.png';
import randomWords from 'random-words';

const App = () => {
  const [word, setWord] = useState(randomWords());

  const handleClick = () => {
    setWord(randomWords());
  };

  const letterArray = word.split('');
  return (
    <div className='container'>
      <h1>Hangman</h1>

      <section className='content'>
        <div className='game'>
          {letterArray.map((letter) => (
            <span className='letter'>{letter}</span>
          ))}

          <p>Press a key to make your choice.</p>

          <div>
            <img src={hangmanImage} alt='hangman' />
          </div>

          <button onClick={handleClick} className='btn'>
            Get me a new word
          </button>
        </div>

        <div className='letters'>
          <h2>Incorrect Guesses</h2>
          <div className='letter-box'>e</div>
          <div className='letter-box'>a</div>
          <div className='letter-box'>c</div>
          <div className='letter-box'>d</div>
          <div className='letter-box'>d</div>
          <div className='letter-box'>d</div>
        </div>
      </section>
    </div>
  );
};

export default App;
