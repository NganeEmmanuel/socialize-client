import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">SOCIALIZE</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">Team</Link>
        </li>
        <li className="nav-item">
          <Link to="/usermanual">User Manual</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;