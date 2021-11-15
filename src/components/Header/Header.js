import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <h1>Cat Browser</h1>
        <div className="header-animation">
          {new Array(6).fill('img').map((item, index) => (
            <img src="/images/paw-print.svg" width="20" height="20" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
