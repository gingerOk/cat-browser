import React from 'react';
import { useHistory } from 'react-router';
import { formatStringToUrl } from '../../utils';
import { Img } from 'react-image';
import './CardList.scss';

const CardList = ({ breeds, route }) => {
  const history = useHistory();
  const handleNavigate = breed => history.push(route + '/' + breed);
  return (
    <div className="cards-list-wrapper">
      {breeds?.map((item, index) => (
        <div className="list-card" key={index}>
          <h2>{item?.name}</h2>
          <div className="list-card-image-block">
            <Img
              src={[item?.image?.url, '/images/image.png']}
              className="list-card-image"
              alt={item?.name}
            />
          </div>
          <div className="list-card-button" onClick={() => handleNavigate(item?.id)}>
            <span>Show more</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
