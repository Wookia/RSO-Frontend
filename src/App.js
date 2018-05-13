import React, { Component } from 'react';
import './App.css';
import { TestButtons } from './testButtons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar">
          <h1>RSO</h1>
        </nav>
        <TestButtons />
      </div>
    );
  }
}

export default App;
