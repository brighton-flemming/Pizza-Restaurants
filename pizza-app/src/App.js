import Header from './components/Header';
import React from 'react';
import RestaurantPage from './components/RestaurantPage';



function App() {
    return (
      <div className="App">
        <div className="header">
          <Header />
          </div>
          <div>
          <RestaurantPage />
          </div>
      </div>
    );
  }


export default App;
