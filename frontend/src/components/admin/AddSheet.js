// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { addSheet } from "../../actions/adminActions"
import Sheet from "../layout/modules/Sheet"
// Components
import { Jumbotron, Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap"
import { BlobProvider } from '@react-pdf/renderer';
import { Link } from "react-router-dom"
import { ArrowBackIos } from '@material-ui/icons'

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      sheet: {
        name: "",
        definition: "",
        synonyms: {},
        description: "",
        modules: []
      }
    };
  }

  onComponentDidMount = () => {
    this.props.clearErrors()
  }

  onChange = e => {
    e.persist()
    this.setState(prevState => ({
      sheet: {
        ...prevState.sheet,
        [e.target.id]: e.target.value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { sheet } = this.state;
    this.props.addSheet(sheet, this.props.history);
  };

  render() {
    const { errors } = this.props;
    const MyDoc = (
      <Sheet sheet={this.state.sheet} />
    );

    return (
      <Container>
            <ListGroup variant="flush">
               <ListGroup.Item action as={Link} to="/admin/sheets" >
                   <Row >
                       <Col xs="5"><ArrowBackIos/></Col>
                   </Row>
               </ListGroup.Item>
           </ListGroup>    
           <Jumbotron>
        <Row>
          <Col>
            <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
              <Form.Label> <h2>Ajouter une nouvelle fiche</h2> </Form.Label>
              <Form.Group>
                <Form.Label> Nom de la fiche </Form.Label>
                <Form.Control
                  required
                  onChange={this.onChange}
                  value={this.state.sheet.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Définition</Form.Label>
                <Form.Control
                  required
                  onChange={this.onChange}
                  value={this.state.sheet.definition}
                  error={errors.definition}
                  id="definition"
                  as="textarea"
                  rows={3}
                  isInvalid={errors.definition}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.definition}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  onChange={this.onChange}
                  value={this.state.sheet.description}
                  error={errors.description}
                  id="description"
                  type="text"
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              {this.state.sheet.modules.map((module) =>
                <li>{module.title}</li>
              )}
              <Form.Group>
                <Button className="float-right" type="submit">
                  Ajouter
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <BlobProvider document={MyDoc}>
              {({ blob, url, loading, error }) => {
                // Do whatever you need with blob here
                return <embed src={url} type="application/pdf" height={550} width={400} />
              }}
            </BlobProvider>
          </Col>
        </Row>
        </Jumbotron>
      </Container >
    );
  }
}

AdminPage.propTypes = {
  addSheet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
 

export default connect(
  mapStateToProps,
  { addSheet }
)(AdminPage);