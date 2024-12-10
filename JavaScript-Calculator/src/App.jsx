import { useDispatch, useSelector } from 'react-redux';
import {
  appendNumber,
  addDecimal,
  setOperator,
  calculate,
  resetCalculator,
} from './store';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentInput = useSelector((state) => state.calculator.currentInput);

  return (
    <div>
      <header>
        <h1>JavaScript Calculator</h1>
      </header>
      <main>
        <section id="calculator">
          <div id="display">{currentInput}</div>

          <div id="buttons">
            <div className="row">
              <button id="clear" onClick={() => dispatch(resetCalculator())}>
                C
              </button>
            </div>

            <div id="numbers-grid">
              {[...Array(10).keys()].map((num) => (
                <button
                  key={num}
                  id={`number-${num}`}
                  onClick={() => dispatch(appendNumber(num.toString()))}
                >
                  {num}
                </button>
              ))}
              <button id="decimal" onClick={() => dispatch(addDecimal())}>
                .
              </button>
              <button id="equals" onClick={() => dispatch(calculate())}>
                =
              </button>
            </div>

            <div id="operators-column">
              {['+', '−', '×', '÷'].map((op, index) => (
                <button
                  key={index}
                  id={`operator-${op}`}
                  onClick={() => dispatch(setOperator(op))}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
