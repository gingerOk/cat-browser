import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadCatsBreeds, changeCatsPage, filterCatsBreeds } from '../../store/cats';
import { useInfiniteScroll, useLazyLoading } from '../../hooks';
import CardList from '../../components/CardsList/CardsList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { ROUTE_CATS_PAGE } from '../../constants/constants';

const Cats = () => {
  const { catsBreeds, page, catsValue, allBreeds } = useSelector(state => state.cats);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();
  let bottomBoundaryCatsRef = useRef(null);

  useEffect(() => {
    dispatch(loadCatsBreeds(page));
  }, [dispatch, page]);

  useLazyLoading('.list-card-image', catsBreeds);
  useInfiniteScroll(bottomBoundaryCatsRef, changeCatsPage);

  const handleChangeCatsValue = ({ target }) => dispatch(filterCatsBreeds(target.value, allBreeds));

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      <SearchForm
        value={catsValue}
        changeValue={handleChangeCatsValue}
        placeholder={'Start typing a breed...'}
      />
      {catsBreeds?.length ? (
        <CardList breeds={catsBreeds} route={ROUTE_CATS_PAGE} />
      ) : (
        <p>No breeds are available</p>
      )}
      {!catsValue && (
        <div
          id="page-bottom-boundary"
          style={{ border: '1px solid grey' }}
          ref={bottomBoundaryCatsRef}
        />
      )}
    </div>
  );
};

export default Cats;
