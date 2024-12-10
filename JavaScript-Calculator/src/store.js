import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state of the calculator
const initialState = {
  currentInput: '0',
  previousInput: '',
  currentOperator: null,
  resetOnNextInput: false,
};

// Slice for calculator logic
const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    updateDisplay(state, action) {
      state.currentInput = action.payload;
    },
    setOperator(state, action) {
      if (state.currentOperator && !state.resetOnNextInput) {
        // Perform calculation before setting new operator
        state.previousInput = calculateResult(
          state.previousInput,
          state.currentInput,
          state.currentOperator
        );
      } else {
        state.previousInput = state.currentInput;
      }
      state.currentOperator = action.payload;
      state.resetOnNextInput = true;
    },
    appendNumber(state, action) {
      if (state.resetOnNextInput) {
        state.currentInput = action.payload;
        state.resetOnNextInput = false;
      } else {
        state.currentInput =
          state.currentInput === '0' ? action.payload : state.currentInput + action.payload;
      }
    },
    addDecimal(state) {
      if (state.resetOnNextInput) {
        state.currentInput = '0.';
        state.resetOnNextInput = false;
      } else if (!state.currentInput.includes('.')) {
        state.currentInput += '.';
      }
    },
    calculate(state) {
      if (state.currentOperator) {
        state.currentInput = calculateResult(
          state.previousInput,
          state.currentInput,
          state.currentOperator
        );
        state.previousInput = '';
        state.currentOperator = null;
        state.resetOnNextInput = true;
      }
    },
    resetCalculator(state) {
      Object.assign(state, initialState);
    },
  },
});

// Helper function to calculate the result
function calculateResult(num1, num2, operator) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (isNaN(n1) || isNaN(n2)) return 'Error';

  switch (operator) {
    case '+':
      return (n1 + n2).toString();
    case '−':
      return (n1 - n2).toString();
    case '×':
      return (n1 * n2).toString();
    case '÷':
      return n2 !== 0 ? (n1 / n2).toString() : 'Error';
    default:
      return num2;
  }
}

// Export actions and reducer
export const {
  updateDisplay,
  setOperator,
  appendNumber,
  addDecimal,
  calculate,
  resetCalculator,
} = calculatorSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
});
