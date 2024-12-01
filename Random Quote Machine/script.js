// script.js

// Array mit zufälligen Zitaten und Autoren
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
];

// Funktion, um ein zufälliges Zitat zu erhalten
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Funktion, um das Zitat und den Autor im DOM anzuzeigen
function displayQuote() {
  const quote = getRandomQuote();
  document.getElementById("text").innerText = quote.text;
  document.getElementById("author").innerText = `- ${quote.author}`;

  // Aktualisiere den Twitter-Link
  const tweetLink = document.getElementById("tweet-quote");
  const tweetText = `${quote.text} ${quote.author}`;
  tweetLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
}

// Event-Listener für den "New Quote"-Button
document.getElementById("new-quote").addEventListener("click", displayQuote);

// Beim Laden der Seite ein Zitat anzeigen
window.onload = displayQuote;
