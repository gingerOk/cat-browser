import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadCatsBreeds, changeCatsPage, filterCatsBreeds } from '../../store/cats';
import { useInfiniteScroll, useLazyLoading } from '../../hooks';
import CardList from '../../components/CardsList/CardsList';
import SearchForm from '../../components/SearchForm/SearchForm';

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
      <SearchForm value={catsValue} changeValue={handleChangeCatsValue} />
      {catsBreeds?.length ? <CardList breeds={catsBreeds} /> : <p>No breeds are available</p>}
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
