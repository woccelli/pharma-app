import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { addSheet } from "../../actions/sheetsActions"

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      shortdescription: "",
      synonyms: {},
      description: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newSheet = {
      name: this.state.name,
      shortdescription: this.state.shortdescription,
      description: this.state.description
    };

    this.props.addSheet(newSheet, this.props.history);

  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    return (
      <Container>
          <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
          <Form.Label> <h2>Ajouter une nouvelle fiche</h2> </Form.Label>
          <Form.Group controlId="formGroupName">
            <Form.Label> Nom de la fiche </Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
              isInvalid={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGroupShortDesc">
            <Form.Label>Description courte</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.shortdescription}
              error={errors.shortdescription}
              id="shortdescription"
              type="text"
              isInvalid={errors.shortdescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.shortdescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.description}
              error={errors.description}
              id="description"
              type="text"
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button type="submit">
              Ajouter
                </Button>
          </Form.Group>
        </Form>
        <Button onClick={this.onLogoutClick}> Se déconnecter</Button>
      </Container>
    );
  }
}

AdminPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  addSheet,
  logoutUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);