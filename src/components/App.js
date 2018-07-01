import React, { Component } from 'react';
import {Router, Link} from "@reach/router"
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import NavBar from "./NavBar/NavBar.jsx"
import Chart from "./Chart/Chart.jsx"
import './App.css';

let Home = () => <h1>Yo</h1 >

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Router>
          <Chart path="/chart" />
          <Home path="/" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </div>
    );
  }
}

export default App;
