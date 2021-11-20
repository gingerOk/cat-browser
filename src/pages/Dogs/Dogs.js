import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadDogsBreeds, changeDogsPage, filterDogsBreeds } from '../../store/dogs';
import CardList from '../../components/CardsList/CardsList';
import { useInfiniteScroll, useLazyLoading } from '../../hooks';
import SearchForm from '../../components/SearchForm/SearchForm';
import { ROUTE_DOGS_PAGE } from '../../constants/constants';

const Dogs = () => {
  const { dogsBreeds, page, dogsValue, allBreeds } = useSelector(state => state.dogs);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();
  let bottomBoundaryDogsRef = useRef(null);

  useEffect(() => {
    dispatch(loadDogsBreeds(page));
  }, [dispatch, page]);

  useLazyLoading('.list-card-image', dogsBreeds);
  useInfiniteScroll(bottomBoundaryDogsRef, changeDogsPage);

  const handleChangeDogsValue = ({ target }) => dispatch(filterDogsBreeds(target.value, allBreeds));

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      <SearchForm value={dogsValue} changeValue={handleChangeDogsValue} />
      {dogsBreeds?.length ? (
        <CardList breeds={dogsBreeds} route={ROUTE_DOGS_PAGE} />
      ) : (
        <p>No breeds are available</p>
      )}
      {!dogsValue && (
        <div
          id="page-bottom-boundary"
          style={{ border: '1px solid grey' }}
          ref={bottomBoundaryDogsRef}
        />
      )}
    </div>
  );
};

export default Dogs;
