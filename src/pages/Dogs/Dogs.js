import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { loadDogsBreeds } from '../../store/dogs';
import CardList from '../../components/CardsList/CardsList';

const Dogs = () => {
  const { dogsBreeds } = useSelector(state => state.dogs);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDogsBreeds());
  }, [dispatch]);

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      {dogsBreeds?.length ? <CardList breeds={dogsBreeds} /> : <p>No breeds are available</p>}
    </div>
  );
};

export default Dogs;
