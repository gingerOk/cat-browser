import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadCatsBreeds } from '../../store/cats';
import CardList from '../../components/CardsList/CardsList';

const Cats = () => {
  const { catsBreeds } = useSelector(state => state.cats);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCatsBreeds());
  }, [dispatch]);

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      {catsBreeds?.length ? <CardList breeds={catsBreeds} /> : <p>No breeds are available</p>}
    </div>
  );
};

export default Cats;
