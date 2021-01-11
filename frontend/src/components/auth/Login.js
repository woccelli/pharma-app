// General
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { loginUser } from "../../actions/authActions";
import { clearSuccess } from "../../actions/utilActions"
// Components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    this.props.clearSuccess()
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };



  onSubmit = e => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { errors } = this.props;

    return (
      <Container fluid>
        <Alert show={this.props.success.registeredUser || false} variant="success">
          Votre compte a bien été créé, vous pouvez vous connecter en utilisant vos identifiants.
        </Alert>
        <Alert show={this.props.success.resetPwd || false} variant="success">
          Le mot de passe a bien été réinitialisé.
        </Alert>
        <Alert show={this.props.success.pwdEmailSent || false} variant="success">
          Un email a été envoyé à l'adresse mail indiquée pour réinitialiser le mot de passe.
        </Alert>
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
            <Link to="/forgot-password">Mot de passe oublié?</Link>
          </p>
        </Form>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { loginUser, clearSuccess }
)(Login);