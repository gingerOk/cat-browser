import React from 'react';
import './CardList.scss';

const CardList = ({ breeds }) => {
  const handleNavigate = breed => {};
  return (
    <div className="cards-list-wrapper">
      {breeds?.map((item, index) => (
        <div style={{ background: "url('/images/bg-2.png')" }} className="list-card" key={index}>
          <h2>{item?.name}</h2>
          <div className="list-card-image-block">
            <img src={item?.image?.url} className="list-card-image" />
          </div>
          <div className="list-card-button" onClick={() => handleNavigate(item.id)}>
            <span>Show more</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
