import './App.css'

function App() {
  return (
    <div>
      <div id="drum-machine">
        
        <header>
          <h1>Drum Machine</h1>
        </header>

        <main>
          <section>

            <div id="display"></div>
            
            <div id="drum-pads">
              <div className="row-one">
                <button className="drum-pad" id="heater-1">Q</button>
                <button className="drum-pad" id="heater-2">W</button>
                <button className="drum-pad" id="heater-3">E</button>
                <button className="drum-pad" id="heater-4">A</button>
                <button className="drum-pad" id="clap">S</button>
              </div>
              <div className="row-two">
                <button className="drum-pad" id="open-hi-hat">D</button>
                <button className="drum-pad" id="kick-n-hat">Z</button>
                <button className="drum-pad" id="kick">X</button>
                <button className="drum-pad" id="closed-hi-hat">C</button>
              </div>
              
              

            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
