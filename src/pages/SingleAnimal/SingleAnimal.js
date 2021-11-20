import React, { useEffect } from 'react';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { CATS, DOGS } from '../../constants/constants';
import { clearSingleAnimalState, fetchAnimalData } from '../../store/singleAnimal';

const SingleAnimal = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { singleAnimal } = useSelector(state => state.singleAnimal);
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();
  const getType = () => (pathname.includes(CATS) ? CATS : pathname.includes(DOGS) ? DOGS : '');

  useEffect(() => {
    const type = getType();
    fetchAnimalData(type, id, dispatch);
    return () => dispatch(clearSingleAnimalState());
  }, []);

  return (
    <article>
      {loading && <SpinnerCircle />}
      <h1>{singleAnimal?.breed?.name}</h1>
      <section>
        <img src={singleAnimal?.images?.[0]} />
      </section>
      <section></section>
    </article>
  );
};

export default SingleAnimal;
