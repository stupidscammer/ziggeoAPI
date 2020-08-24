import React, { Component } from 'react';
import Header from './components/Header';
import Footer from "./components/Footer";
import MainComponent from './components/MainContent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainComponent />
        <Footer/>
      </div>
    );
  }
}

export default App;
