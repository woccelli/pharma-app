import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };


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
      <div class="container h-100"> 
        <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
          <Form.Label> <h2>Connexion</h2> </Form.Label>
          <Form.Group controlId="formGroupEmail">
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
          <Form.Group controlId="formGroupPassword">
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
        </Form>
      </div>
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