import React from 'react';
import '../styles/Header.css'
import urcdletters from '../logos/urcdletters.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="hm-header">
      <div className="container">
        <div className="header-menu">
          <div className="hm-logo">
            <a href="#">
            <img src={urcdletters} alt="URCD Logo" style={{ width: '100px' }} />
            </a>
          </div>
          <nav className="hm-menu">
            <ul>
              <li><a href="http://">Productos</a></li>
              <li> <Link to="./pages/Cards.js">Nosotros</Link> </li>        
              <li><a href="https://www.instagram.com/urcd24?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">Contacto</a></li>
            </ul>
            <div className="icon-menu">
              <button type="button"><i className="fas fa-bars"></i></button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;