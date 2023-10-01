import React from "react";
import logo from "/home/brighton/Pizza-Restaurants/pizza-app/public/logo.png"


function Header() {
  return (
    <header>
      <img src={logo} alt="Logo"/>
      <h1>
       Funky Anchovy 
      </h1>
    </header>
  );
}

export default Header;
