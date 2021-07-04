import './App.scss';
import hangmanImage from './hangman-150.png';

const App = () => {
  return (
    <div className='container'>
      <h1>Hangman</h1>

      <section className='content'>
        <div className='game'>
          <span className='letter'></span>
          <span className='letter'></span>
          <span className='letter'></span>
          <span className='letter'></span>
          <span className='letter'></span>

          <p>Press a key to make your choice.</p>

          <div>
            <img src={hangmanImage} alt='hangman' />
          </div>

          <button className='btn'>Get me a new word</button>
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
