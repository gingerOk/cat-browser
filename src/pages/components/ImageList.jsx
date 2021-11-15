import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ImagesList = ({ images = [] }) => {
  return (
    <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images &&
        images.map(i => (
          <Col md={3} key={i.id}>
            <Card style={{ width: '100%' }} className="my-3 p-3">
              <Card.Img variant="top" src={i.url} style={{ width: '100%' }} />
              <Card.Body>
                <Link to={`/${i.id}`} className="btn btn-primary btn-block">
                  View details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default ImagesList;
