import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpinnerCircle from '../components/Spinner/Spinner';
import { loadImage } from '../api';

const CatPage = () => {
  const [breed, setBreed] = useState([]);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadImage(id).then(res => {
      setImage(res);
      setBreed(res.breeds[0]);
      setLoading(false);
    });
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          {loading ? (
            <SpinnerCircle />
          ) : (
            <Card>
              <Card.Header>
                <Button className="btn btn-success" onClick={history.goBack}>
                  Back
                </Button>
              </Card.Header>
              <Card.Img src={image.url} />
              <Card.Title>{breed.name}</Card.Title>
              <Card.Subtitle>Origin: {breed.origin}</Card.Subtitle>
              <Card.Text>{breed.temperament}</Card.Text>
              <Card.Text>{breed.description}</Card.Text>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CatPage;
