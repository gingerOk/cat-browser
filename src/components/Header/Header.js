import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ROUTE_CATS_PAGE, ROUTE_DOGS_PAGE, ROUTE_HOME } from '../../constants/constants';
import './Header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const navigateToHome = () => history.push(ROUTE_HOME);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const renderMenu = () => {
    const path = window.location.pathname;
    return (
      <>
        <h1 onClick={navigateToHome}>Pets</h1>
        <div>
          <NavLink
            exact
            to={ROUTE_DOGS_PAGE}
            className={`nav-item ${path.includes(ROUTE_DOGS_PAGE) ? 'is-active' : ''}`}
          >
            Dogs
          </NavLink>
          <NavLink
            exact
            to={ROUTE_CATS_PAGE}
            className={`nav-item ${path.includes(ROUTE_CATS_PAGE) ? 'is-active' : ''}`}
          >
            Cats
          </NavLink>
          <NavLink to={ROUTE_HOME} className="nav-item">
            Blog
          </NavLink>
        </div>
      </>
    );
  };
  const renderMobileHeader = () => {
    return (
      <div className={`mobile-header-wrapper ${isOpen ? 'clicked' : ''}`}>
        <div className="mobileMenu">
          <h1 onClick={navigateToHome}>Pets</h1>
        </div>
        <div className="nav-modal">
          <div className="blob" data="blob" onClick={closeMenu}>
            <div className="nav">
              <div className="nav-list">{renderMenu()}</div>
            </div>
          </div>
        </div>
        <div className="mobileMenu-burger">
          <div className="tile burger" onClick={toggleNavbar}>
            <div className="meat">
              <div className="line one"></div>
              <div className="line two"></div>
              <div className="line three"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="mobile-header">{renderMobileHeader()}</div>
      <header className="header-wrapper">
        <div className="header-container">{renderMenu()}</div>
      </header>
    </>
  );
};

export default Header;
