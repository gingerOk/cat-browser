import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTE_CATS_PAGE, ROUTE_DOGS_PAGE } from '../../constants/constants';
const Home = () => {
  const history = useHistory();
  const goToDogsPage = () => history.push(ROUTE_DOGS_PAGE);
  const goToCatsPage = () => history.push(ROUTE_CATS_PAGE);
  return (
    <div className="wrapper-home with-padding">
      <div>
        <h1>Dogs Vs Cats</h1>
        <div className="wrapper-home-cards">
          <div className="card-image" onClick={goToDogsPage}>
            <img src="images/main-dog.jpeg" alt="Dog" />
          </div>
          <div className="card-image" onClick={goToCatsPage}>
            <img src="images/main-cat.jpg" alt="Cat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
