import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props: any) => {
  return (
    <Container fluid={true}>
      <div className='page-title'>
        <Row>
          <Col xs='6'>
            <h3>{props.title}</h3>
          </Col>
          <Col xs='6'>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={`dashboard/`}>
                  <Home />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{props.parent}</BreadcrumbItem>
              <BreadcrumbItem active>{props.title}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Breadcrumbs;
