import { Container, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { setUrlSearchParams, getByParamsSearch } from '../utils';
import ImageList from './components/ImageList';
import AlertBanner from '../components/AlertBanner';
import SpinnerCircle from '../components/Spinner/Spinner';
import { loadBreeds, loadImages, setBreedId, clearState } from '../store/reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const { breeds, images, loading, breedId } = useSelector(state => state);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (breeds?.length < 1) {
      dispatch(loadBreeds());
    }
    if (location.search && breeds?.length) {
      const { breed } = getByParamsSearch(location.search);
      dispatch(loadImages(breed));
      dispatch(setBreedId(breed));
    }
  }, [breeds, dispatch]);

  const handleLoadMoreBtn = () => {
    setCount(count + 1);
    dispatch(loadImages(breedId, count + 1));
  };

  const cleanState = () => {
    history.push('/');
    dispatch(clearState());
  };

  const handleChange = e => {
    const id = e.target.value;
    if (id !== -1) {
      history.push('/' + setUrlSearchParams({ breed: id }));
      dispatch(loadImages(id, count));
      dispatch(setBreedId(id));
      setCount(1);
    } else {
      cleanState();
    }
  };

  return (
    <div className="wrapper-home">
      {loading && <SpinnerCircle />}
      <Form>
        <Form.Group>
          <Form.Label>Breed</Form.Label>
          <Form.Control as="select" onChange={handleChange} value={breedId}>
            <option value="-1">Select Breed</option>
            {breeds?.map(breed => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {error ? <AlertBanner /> : <ImageList images={images} />}
      {images?.length > 1 ? (
        <Button variant="success" onClick={handleLoadMoreBtn} className="mx-auto">
          Load more
        </Button>
      ) : (
        <p>No cats are available</p>
      )}
    </div>
  );
};

export default Homepage;
