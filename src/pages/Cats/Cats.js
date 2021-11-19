import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadCatsBreeds, changeCatsPage } from '../../store/cats';
import { useInfiniteScroll, useLazyLoading } from '../../hooks';
import CardList from '../../components/CardsList/CardsList';

const Cats = () => {
  const { catsBreeds, page } = useSelector(state => state.cats);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();
  let bottomBoundaryCatsRef = useRef(null);

  useEffect(() => {
    dispatch(loadCatsBreeds(page));
  }, [dispatch, page]);

  useLazyLoading('.list-card-image', catsBreeds);
  useInfiniteScroll(bottomBoundaryCatsRef, changeCatsPage);

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      {catsBreeds?.length ? <CardList breeds={catsBreeds} /> : <p>No breeds are available</p>}
      <div
        id="page-bottom-boundary"
        style={{ border: '1px solid grey' }}
        ref={bottomBoundaryCatsRef}
      />
    </div>
  );
};

export default Cats;
