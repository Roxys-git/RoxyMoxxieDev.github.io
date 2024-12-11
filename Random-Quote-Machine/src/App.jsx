import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRandomQuote } from './redux/quoteSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentQuote = useSelector((state) => state.quote.currentQuote);

  const handleNewQuote = () => {
    dispatch(setRandomQuote());
  };

  return (
    <div>
      <header>
        <h1>Random Quote Machine</h1>
      </header>
      <main>
        <section id="quote-box">
          <div id="text">"{currentQuote.text}"</div>
          <div id="author">- {currentQuote.author}</div>
          <div className="clicker">
            <button id="new-quote" onClick={handleNewQuote}>
              New Quote
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
