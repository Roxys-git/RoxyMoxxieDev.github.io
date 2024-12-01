// Elemente referenzieren
const display = document.getElementById("display");
const numbers = document.querySelectorAll("#numbers-grid button");
const operators = document.querySelectorAll("#operators-column button");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal");

// Zustand des Rechners
let currentInput = "0";
let previousInput = "";
let currentOperator = null;
let lastOperator = null;  // Speichert den letzten Operator
let resetOnNextInput = false;

// Hilfsfunktion: Display aktualisieren
function updateDisplay(value) {
  display.textContent = value;
}

// Hilfsfunktion: Eingabe zurücksetzen
function resetCalculator() {
  currentInput = "0";
  previousInput = "";
  currentOperator = null;
  lastOperator = null;
  resetOnNextInput = false;
  updateDisplay(currentInput);
}

// Zahlen-Button-Handler
const numberIds = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
numberIds.forEach((id, index) => {
  const button = document.getElementById(id);
  button.addEventListener("click", () => {
    if (resetOnNextInput) {
      currentInput = "";
      resetOnNextInput = false;
    }
    
    if (currentInput === "0") {
      currentInput = index.toString();
    } else {
      currentInput += index.toString();
    }
    updateDisplay(currentInput);
  });
});

// Dezimal-Button-Handler
decimalButton.addEventListener("click", () => {
  if (resetOnNextInput) {
    currentInput = "0";
    resetOnNextInput = false;
  }
  
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
});

// Operator-Buttons konfigurieren
const operatorMap = {
  'add': '+',
  'subtract': '−',
  'multiply': '×',
  'divide': '÷'
};

Object.entries(operatorMap).forEach(([id, symbol]) => {
  const button = document.getElementById(id);
  button.addEventListener("click", () => {
    // Behandlung des negativen Vorzeichens
    if (symbol === "−" && (currentInput === "0" || resetOnNextInput)) {
      currentInput = "-";
      updateDisplay(currentInput);
      resetOnNextInput = false;
      return;
    }

    // Wenn bereits ein Operator existiert
    if (currentOperator) {
      // Speichere den neuen Operator
      lastOperator = symbol;
      
      // Wenn eine neue Zahl eingegeben wurde, führe die Berechnung mit dem vorherigen Operator durch
      if (currentInput !== "-" && !resetOnNextInput) {
        calculate();
      }
    } else {
      // Erster Operator in der Sequenz
      previousInput = currentInput;
      lastOperator = symbol;
    }

    currentOperator = lastOperator;
    resetOnNextInput = true;
  });
});

// Gleichheits-Button-Handler
equalsButton.addEventListener("click", () => {
  if (currentOperator) {
    calculate();
    currentOperator = null;
    lastOperator = null;
    resetOnNextInput = true;
  }
});

// Berechnung durchführen
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  
  if (isNaN(num1) || isNaN(num2)) return;
  
  let result;
  switch (currentOperator) {
    case "+":
      result = num1 + num2;
      break;
    case "−":
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
    case "÷":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
    default:
      return;
  }
  
  previousInput = result.toString();
  currentInput = previousInput;
  updateDisplay(currentInput);
}

// Clear-Button-Handler
clearButton.addEventListener("click", resetCalculator);

// Initialisierung
resetCalculator();