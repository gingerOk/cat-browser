import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.scss';
import { ROUTE_CATS_PAGE, ROUTE_DOGS_PAGE } from '../../constants/constants';
const Home = () => {
  const history = useHistory();
  const goToDogsPage = () => history.push(ROUTE_DOGS_PAGE);
  const goToCatsPage = () => history.push(ROUTE_CATS_PAGE);
  return (
    <div className="wrapper-home">
      <div>
        <h1></h1>
        <div className="wrapper-home-cards">
          <div
            className="card-image"
            onClick={goToDogsPage}
            style={{ background: "url('/images/bg-2.png')" }}
          >
            <img src="images/main-dog.jpeg" alt="Dog" />
          </div>
          <div
            className="card-image"
            onClick={goToCatsPage}
            style={{ background: "url('/images/bg-2.png')" }}
          >
            <img src="images/main-cat.jpg" alt="Cat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
