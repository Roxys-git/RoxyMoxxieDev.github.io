import './App.css';
import Editor from './components/Editor';
import Previewer from './components/Previewer';

function App() {
  return (
    <div id="app">
      <header>
        <h1>Markdown Previewer</h1>
      </header>
      <main>
        <section>
          <Editor />
          <Previewer />
        </section>
      </main>
      <footer>
        &#169; RoxyMoxxie Dev (Roxana Zwicky) 2024<br />
        Roxana Zwicky
      </footer>
    </div>
  );
}

export default App;
