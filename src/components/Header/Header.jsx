import React from "react";
import logo from "../../assets/images/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <a href="/shop">Shop</a>
        <a href="/revew">Order Reverw</a>
        <a href="/manage">Manage Inventory</a>
      </nav>
    </div>
  );
};

export default Header;
