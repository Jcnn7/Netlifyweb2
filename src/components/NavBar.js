import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import urcdletters from '../logos/urcdletters.png';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={urcdletters} alt="URCD Logo" style={{ width: '100px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/balance">Balance</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transactions">Movimientos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">Catálogo</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
