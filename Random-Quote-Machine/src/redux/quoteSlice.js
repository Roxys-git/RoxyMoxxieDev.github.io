import { createSlice } from '@reduxjs/toolkit';

// Array containing random quotes and authors
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
];

// Helper function to get a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Redux slice for quotes
const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    currentQuote: getRandomQuote(),
  },
  reducers: {
    setRandomQuote: (state) => {
      state.currentQuote = getRandomQuote();
    },
  },
});

export const { setRandomQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
