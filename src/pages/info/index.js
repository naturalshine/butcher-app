import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/Nav';

const Info = () => {
    return (
      <Container className="pageBody">
        <NavBar></NavBar>
          <Row>
              <Col></Col>
              <Col>
                  <h1>BUTCHER</h1>
              </Col>
              <Col></Col>
          </Row>
          <Row>
              <Col></Col>
              <Col>
                  <p>Yes queen</p>
              </Col>
              <Col></Col>
          </Row>
      </Container>
      );

}

export default Info;