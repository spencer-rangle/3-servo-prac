import './App.css';
import Something from './components/Something';
// import Another from './components/Another';


function App() {
  const theNumb = 89;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Something someNumb={theNumb} />
      </header>
    </div>
  );
}

export default App;
