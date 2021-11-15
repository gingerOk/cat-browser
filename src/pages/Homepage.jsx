import { Container, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import _findIndex from 'lodash/findIndex';
import _unionBy from 'lodash/unionBy';
import { getBreeds, getImages } from '../api';
import { setUrlSearchParams, getByParamsSearch } from '../utils';
import ImageList from './components/ImageList';
import AlertBanner from '../components/AlertBanner';
import SpinnerCircle from '../components/Spinner';

const Homepage = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (breeds.length < 1) {
      getBreeds().then(res => {
        setBreeds(res);
        setLoading(false);
      });
    }
    if (location.search && breeds.length > 1) {
      const { breed_ids } = getByParamsSearch(location.search);
      const i = _findIndex(breeds, function (o) {
        return o.id === breed_ids;
      });
      getImages(breed_ids).then(res => (res ? setImages(res) : setError(true)));
      setSelectedBreed(breeds[i]);
    }
  }, [breeds, location.search]);

  const handleLoadMoreBtn = () => {
    setCount(count + 1);
    getImages(selectedBreed.id, count + 1).then(res => {
      setImages(_unionBy([...images], [...res], 'id'));
    });
  };

  const cleanState = () => {
    history.push('/');
    setSelectedBreed([]);
    setImages([]);
  };

  const handleChange = e => {
    setError(false);
    const i = _findIndex(breeds, function (o) {
      return o.id === e.target.value;
    });
    if (i !== -1) {
      history.push('/' + setUrlSearchParams({ breed_ids: breeds[i].id }));
      getImages(breeds[i].id, count).then(res => (res ? setImages(res) : setError(true)));
      setSelectedBreed(breeds[i]);
      setCount(1);
    } else {
      cleanState();
    }
  };

  return (
    <Container>
      <h1 className="my-3">Cat Browser</h1>
      {loading ? (
        <SpinnerCircle />
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" onChange={handleChange} value={selectedBreed.id}>
              <option value="-1">Select Breed</option>
              {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      )}
      {error ? <AlertBanner /> : <ImageList images={images} />}
      {images.length > 1 ? (
        <Button variant="success" onClick={handleLoadMoreBtn} className="mx-auto">
          Load more
        </Button>
      ) : (
        <p>No cats are available</p>
      )}
    </Container>
  );
};

export default Homepage;
