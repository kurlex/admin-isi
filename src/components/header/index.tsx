import React from "react";
import "./styles.css";
import { SignOut } from "../../utils/Auth";
const Header = () => {
  return (
    <div className="navbar">
      <div className="left">
        <img className="logo-isi" src="isi.png" alt="logo-isi" />
      </div>
      <div className="right">
        <button className="logout-btn" onClick={SignOut}>
          <img src="logoutIcon.png" alt="logout-icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
