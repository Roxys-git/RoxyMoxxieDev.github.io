// Reference elements
const display = document.getElementById("display");
const numbers = document.querySelectorAll("#numbers-grid button");
const operators = document.querySelectorAll("#operators-column button");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal");

// Calculator state
let currentInput = "0";  // The current number displayed
let previousInput = "";  // The previous number before the operator
let currentOperator = null;  // The current operator
let lastOperator = null;  // Stores the last operator used
let resetOnNextInput = false;  // Flag to reset input on next entry

// Helper function: Update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Helper function: Reset the calculator
function resetCalculator() {
  currentInput = "0";  // Reset current input to "0"
  previousInput = "";  // Clear the previous input
  currentOperator = null;  // Clear the current operator
  lastOperator = null;  // Clear the last operator
  resetOnNextInput = false;  // Reset the flag
  updateDisplay(currentInput);  // Update the display
}

// Number button handler
const numberIds = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
numberIds.forEach((id, index) => {
  const button = document.getElementById(id);
  button.addEventListener("click", () => {
    // Reset input if the flag is set
    if (resetOnNextInput) {
      currentInput = "";
      resetOnNextInput = false;
    }
    
    // Append the number or replace if input is zero
    if (currentInput === "0") {
      currentInput = index.toString();
    } else {
      currentInput += index.toString();
    }
    updateDisplay(currentInput);  // Update the display with the new input
  });
});

// Decimal button handler
decimalButton.addEventListener("click", () => {
  // Reset input if the flag is set
  if (resetOnNextInput) {
    currentInput = "0";
    resetOnNextInput = false;
  }
  
  // Add decimal point if not already present
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
});

// Operator button configuration
const operatorMap = {
  'add': '+',
  'subtract': '−',
  'multiply': '×',
  'divide': '÷'
};

Object.entries(operatorMap).forEach(([id, symbol]) => {
  const button = document.getElementById(id);
  button.addEventListener("click", () => {
    // Handle negative sign input
    if (symbol === "−" && (currentInput === "0" || resetOnNextInput)) {
      currentInput = "-";  // Start negative number input
      updateDisplay(currentInput);
      resetOnNextInput = false;
      return;
    }

    // If an operator already exists, perform calculation
    if (currentOperator) {
      lastOperator = symbol;  // Store the new operator
      // Perform calculation if a new number is entered
      if (currentInput !== "-" && !resetOnNextInput) {
        calculate();  // Perform the calculation
      }
    } else {
      previousInput = currentInput;  // Store current number as the previous input
      lastOperator = symbol;  // Store the operator
    }

    currentOperator = lastOperator;  // Set the current operator
    resetOnNextInput = true;  // Flag to reset the input after the operator
  });
});

// Equals button handler
equalsButton.addEventListener("click", () => {
  if (currentOperator) {
    calculate();  // Perform the calculation if there's an operator
    currentOperator = null;  // Reset the operator
    lastOperator = null;  // Reset the last operator
    resetOnNextInput = true;  // Flag to reset input after calculation
  }
});

// Perform the calculation
function calculate() {
  const num1 = parseFloat(previousInput);  // Parse the previous input as a number
  const num2 = parseFloat(currentInput);   // Parse the current input as a number
  
  // Check if either input is invalid (NaN)
  if (isNaN(num1) || isNaN(num2)) return;
  
  let result;  // Variable to store the result
  
  // Perform the appropriate calculation based on the operator
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
      result = num2 !== 0 ? num1 / num2 : "Error";  // Prevent division by zero
      break;
    default:
      return;
  }
  
  previousInput = result.toString();  // Store the result as the previous input
  currentInput = previousInput;  // Set the result as the current input
  updateDisplay(currentInput);  // Update the display with the result
}

// Clear button handler
clearButton.addEventListener("click", resetCalculator);

// Initialization
resetCalculator();  // Call reset to initialize the calculator state
