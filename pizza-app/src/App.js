import React, { Component } from 'react';
import Header from './components/Header';
import RestaurantPage from './components/RestaurantPage';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <RestaurantPage />

      </div>
    );
  }
}

export default App;
