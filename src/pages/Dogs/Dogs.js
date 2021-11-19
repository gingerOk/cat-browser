import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadDogsBreeds, changeDogsPage } from '../../store/dogs';
import CardList from '../../components/CardsList/CardsList';
import { useInfiniteScroll, useLazyLoading } from '../../hooks';

const Dogs = () => {
  const { dogsBreeds, page } = useSelector(state => state.dogs);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();
  let bottomBoundaryDogsRef = useRef(null);

  useEffect(() => {
    dispatch(loadDogsBreeds(page));
  }, [dispatch, page]);

  useLazyLoading('.list-card-image', dogsBreeds);
  useInfiniteScroll(bottomBoundaryDogsRef, changeDogsPage);

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      {dogsBreeds?.length ? <CardList breeds={dogsBreeds} /> : <p>No breeds are available</p>}
      <div
        id="page-bottom-boundary"
        style={{ border: '1px solid grey' }}
        ref={bottomBoundaryDogsRef}
      />
    </div>
  );
};

export default Dogs;
