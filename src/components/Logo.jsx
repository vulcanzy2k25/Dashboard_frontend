import React from "react";
import "./logo.css";
import logoImage from "./../assets/vulcanzy_logo.png";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logo" />
    </div>
  );
};

export default Logo;
