import React, { useEffect, useState } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiData, setApiData] = useState()

  useEffect(() => {
    axios.get('/testapi')
      .then((response) => {
        console.log(response.data)
        setApiData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {apiData}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
