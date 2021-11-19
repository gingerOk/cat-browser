import React from 'react';
import { useHistory } from 'react-router';
import { ROUTE_HOME } from '../../constants/constants';
import './Header.scss';

const Header = () => {
  const history = useHistory();
  const navigateToHome = () => history.push(ROUTE_HOME);
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <h1 onClick={navigateToHome}>Dogs & Cats</h1>
      </div>
    </div>
  );
};

export default Header;
