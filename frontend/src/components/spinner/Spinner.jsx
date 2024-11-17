import Spinner from 'react-bootstrap/Spinner';
import { Container, Row } from 'react-bootstrap';


function SpinnerComponent() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Spinner animation="border" variant="dark" />
      </Row>
    </Container>
  );
}

export default SpinnerComponent;