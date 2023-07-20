import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container fluid={true}>
        <Row>
          <Col
            md='12'
            className='footer-copyright text-center'
          >
            <p className='mb-0'>{'Copyright 2023 © PAGO.'}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
