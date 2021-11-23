import React from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ROUTE_CATS_PAGE, ROUTE_DOGS_PAGE, ROUTE_HOME } from '../../constants/constants';
import './Header.scss';

const Header = () => {
  const history = useHistory();
  const navigateToHome = () => history.push(ROUTE_HOME);
  const renderMenu = () => {
    return (
      <>
        <h1 onClick={navigateToHome}>Pets</h1>
        <div>
          <NavLink exact to={ROUTE_DOGS_PAGE}>
            Dogs
          </NavLink>
          <NavLink exact to={ROUTE_CATS_PAGE}>
            Cats
          </NavLink>
          <NavLink to={ROUTE_HOME}>Blog</NavLink>
        </div>
      </>
    );
  };
  return (
    <div className="header-wrapper">
      <div className="header-container">{renderMenu()}</div>
    </div>
  );
};

export default Header;
