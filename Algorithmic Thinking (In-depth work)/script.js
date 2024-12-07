const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

/* Initializes various DOM elements with `querySelector` and `getElementById`. 
   These constant variables store references to specific HTML elements for later access. */

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

/* Declares and initializes variables for game status. 
   `diceValuesArr` stores the dice rolls, `isModalShowing` indicates if the rules modal is shown, 
   and `score`, `round`, and `rolls` track the score, round, and number of rolls. */

const rollDice = () => {
  diceValuesArr = []; // Resets the dice result array

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    diceValuesArr.push(randomDice); // Adds the rolled value to the array
  }

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index]; // Displays the dice value in the DOM
  });
};

/* The `rollDice` function generates random values for five dice and displays them on the page. 
   `Math.floor(Math.random() * 6) + 1` generates a number between 1 and 6, representing the dice roll. */

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

/* The `updateStats` function updates the roll and round count in the HTML document. */

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false; // Enables the option
  scoreInputs[index].value = score; // Sets the value of the option
  scoreSpans[index].textContent = `, score = ${score}`; // Displays the score in the HTML document
};

/* The `updateRadioOption` function enables and adjusts a radio button (selection option) 
   and displays the score accordingly. */

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue); // Updates the total score
  totalScoreElement.textContent = score; // Displays the score in the DOM

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`; // Adds an entry to the score history
};

/* The `updateScore` function updates the total score and adds a description of the achieved score to the history. */

const getHighestDuplicates = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1; // Counts the occurrence of each dice value
  }

  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0); // Sum of all dice values

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice); // Four of a kind
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice); // Three of a kind
  }

  updateRadioOption(5, 0);
};

/* The `getHighestDuplicates` function checks for duplicates and counts the same dice values 
   to potentially assign a score. It uses `updateRadioOption` to adjust the selection options. */

const detectFullHouse = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1; // Counts the occurrences of each value
  }

  const hasThreeOfAKind = Object.values(counts).includes(3); // Checks for three of a kind
  const hasPair = Object.values(counts).includes(2); // Checks for a pair

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25); // Full House
  }

  updateRadioOption(5, 0);
};

/* The `detectFullHouse` function checks for a Full House (three of a kind and a pair) 
   and assigns the score accordingly. */

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true; // Disables all options
    input.checked = false; // Unchecks all options
  });

  scoreSpans.forEach((span) => {
    span.textContent = ""; // Clears the score text
  });
};

/* The `resetRadioOptions` function resets all score options and their displays. */

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

/* The `resetGame` function resets all game states and the DOM representation to the initial state. */

const checkForStraights = (arr) => {
  const sortedArr = [...new Set(arr.sort((a, b) => a - b))];
  
  const largeStraight1 = [1, 2, 3, 4, 5];
  const largeStraight2 = [2, 3, 4, 5, 6];
  
  if (
    sortedArr.length === 5 && 
    (sortedArr.every((val, idx) => val === largeStraight1[idx]) || 
     sortedArr.every((val, idx) => val === largeStraight2[idx]))
  ) {
    updateRadioOption(4, 40); // Large Straight
    updateRadioOption(3, 30); // Small Straight
  }
  else if (
    sortedArr.includes(1) && sortedArr.includes(2) && 
    sortedArr.includes(3) && sortedArr.includes(4) ||
    sortedArr.includes(2) && sortedArr.includes(3) && 
    sortedArr.includes(4) && sortedArr.includes(5) ||
    sortedArr.includes(3) && sortedArr.includes(4) && 
    sortedArr.includes(5) && sortedArr.includes(6)
  ) {
    updateRadioOption(3, 30); // Small Straight
  } else {
    updateRadioOption(5, 0);
  }
};

/* The `checkForStraights` function checks for a straight (a sequence of consecutive numbers) 
   and assigns the score accordingly. */

// Event: Roll Dice
rollDiceBtn.addEventListener("click", () => {
  if (rolls < 3) {
    rolls++; // Increase the roll count
    rollDice(); // Roll the dice
    updateStats(); // Update the stats
    resetRadioOptions(); // Reset options

    // Detect patterns (update scoring options)
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);

    // Additional checks (Small/Large Straight etc.) can be added here
  } else {
    alert("You have reached the maximum rolls for this round!");
  }
});

// Event: Keep Score
keepScoreBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="score-options"]:checked');
  if (selectedOption) {
    const selectedValue = selectedOption.value;
    const achieved = selectedOption.id.replace(/-/g, " "); // Formatted name of the achieved score
    updateScore(selectedValue, achieved); // Update the score

    // Start a new round
    if (round < 6) {
      round++;
      rolls = 0;
      updateStats();
      resetRadioOptions();
      diceValuesArr = [0, 0, 0, 0, 0]; // Reset dice
      listOfAllDice.forEach((dice, index) => {
        dice.textContent = diceValuesArr[index];
      });
    } else {
      alert("Game over! You have completed all rounds.");
      resetGame(); // Reset the game
    }
  } else {
    alert("Please select a score option.");
  }
});

// Event: Toggle Rules Display
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  rulesContainer.style.display = isModalShowing ? "block" : "none";
});
