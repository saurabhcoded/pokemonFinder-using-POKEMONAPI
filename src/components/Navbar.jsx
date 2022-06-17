import React from "react";
import logo from "../assets/pokeball.png";

const Navbar = () => {
  return (
    <nav className="navbar bg-light">
      <div className="container d-flex justify-content-start">
        <h6 className="fw-bold text-warning">
          POKEMON <br />
          FINDER
        </h6>
        <img src={logo} alt="" height="54" className="d-inline-block ms-2" />
      </div>
    </nav>
  );
};

export default Navbar;
