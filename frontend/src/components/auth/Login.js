// General
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { loginUser } from "../../actions/authActions";
import ForgottenPwd from './modules/ForgottenPwd'
// Components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showForgottenPwd: false,
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
      return null; // push user to dashboard when they login and no change in the state
    }
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }
    else return null; // Triggers no change in the state
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  showForgottenPwd = () => {
    this.setState(prevState => ({
      showForgottenPwd: !prevState.showForgottenPwd
    }))
  }

  onSubmit = e => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;

    return (
      <Container fluid>

        <Modal show={this.state.showForgottenPwd} onHide={this.showForgottenPwd}>
          <Modal.Header>Mot de passe oublié</Modal.Header>
          <Modal.Body>
            <ForgottenPwd />
          </Modal.Body>

        </Modal>

        <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
          <Form.Label> <h2>Connexion</h2> </Form.Label>
          <Form.Group>
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              isInvalid={errors.email || errors.emailnotfound}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
              {errors.emailnotfound}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              isInvalid={errors.password || errors.passwordincorrect}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
              {errors.passwordincorrect}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button type="submit">
              Login
                </Button>
          </Form.Group>
          <p>
            Pas encore de compte? <Link to="/register">S'inscrire</Link>
          </p>
          <p>
            <Link onClick={this.showForgottenPwd}>Mot de passe oublié?</Link>
          </p>
        </Form>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  validated: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  validated: false
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);