import React, { useEffect } from 'react';
import SpinnerCircle from '../../components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { CATS, DOGS } from '../../constants/constants';
import { clearSingleAnimalState, fetchAnimalData } from '../../store/singleAnimal';
import SingleAnimalContent from '../../components/SingleAnimalContent/SingleAnimalContent';

const SingleAnimal = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { loading } = useSelector(state => state.main);
  const dispatch = useDispatch();
  const getType = () => (pathname.includes(CATS) ? CATS : pathname.includes(DOGS) ? DOGS : '');

  useEffect(() => {
    const type = getType();
    fetchAnimalData(type, id, dispatch);
    return () => dispatch(clearSingleAnimalState());
  }, []);

  return (
    <>
      {loading && <SpinnerCircle />}
      <SingleAnimalContent />
    </>
  );
};

export default SingleAnimal;
