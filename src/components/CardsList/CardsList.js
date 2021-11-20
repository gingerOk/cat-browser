import React from 'react';
import './CardList.scss';

const CardList = ({ breeds }) => {
  const handleNavigate = breed => {};
  return (
    <div className="cards-list-wrapper">
      {breeds?.map((item, index) => (
        <div className="list-card" key={index}>
          <h2>{item?.name}</h2>
          <div className="list-card-image-block">
            <img src={item?.image?.url} className="list-card-image" alt={item?.name} />
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
