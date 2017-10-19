import React, { Component } from 'react';
import logo from './logo.svg';
import {Route,BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './home/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React canvas drawing</h1>
        </header>
          <div>
              <BrowserRouter>
                <Route path="/" component={Home}/>
              </BrowserRouter>
          </div>
      </div>

    );
  }
}

export default App;
