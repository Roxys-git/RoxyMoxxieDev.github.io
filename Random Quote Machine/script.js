// Array containing random quotes and authors
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
];

// Function to get a random quote from the quotes array
function getRandomQuote() {
  // Generates a random index to pick a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex]; // Returns the randomly selected quote
}

// Function to display the quote and author in the DOM
function displayQuote() {
  const quote = getRandomQuote(); // Get a random quote from the array
  document.getElementById("text").innerText = quote.text; // Sets the quote text in the DOM
  document.getElementById("author").innerText = `- ${quote.author}`; // Sets the author in the DOM

  // Update the Twitter sharing link
  const tweetLink = document.getElementById("tweet-quote");
  const tweetText = `${quote.text} ${quote.author}`; // Constructs the tweet text
  tweetLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`; // Updates the tweet link with the quote text
}

// Event listener for the "New Quote" button, triggering the displayQuote function
document.getElementById("new-quote").addEventListener("click", displayQuote);

// Display a quote when the page is loaded
window.onload = displayQuote;
