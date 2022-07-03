// General
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { registerUser } from "../../actions/authActions";
// Components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Typography} from "@material-ui/core";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      commandNumber: "",
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      commandNumber: this.state.commandNumber
    };

    this.props.registerUser(newUser, this.props.history);

  };

  render() {
    const { errors } = this.props;

    return (
      <div class="container h-100">
        <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
          <Form.Label> <h2>Inscription</h2> </Form.Label>
          <Form.Group>
            <Form.Label> Dénomination sociale </Form.Label>
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

          <Form.Group>
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Confirmez le mot de passe</Form.Label>
            <Form.Control
              required
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              isInvalid={errors.password2}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password2}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label> Numéro de commande (facultatif, excepté pour les groupements de pharmacies) </Form.Label>
            <Form.Control
                onChange={this.onChange}
                value={this.state.commandNumber}
                error={errors.commandNumber}
                id="commandNumber"
                type="text"
                isInvalid={errors.commandNumber}
            />
            <Typography variant={"caption"}>
              Veuillez indiquer le numéro de commande que vous avez obtenu lors de de votre abonnement sur: &nbsp;
              <a href={"https://www.toposante.fr/application/"} target="_blank">https://www.toposante.fr/application</a>
            </Typography>
            <Form.Control.Feedback type="invalid">
              {errors.commandNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Button type="submit">
              S'inscrire
                </Button>
          </Form.Group>
          <p>
            Déjà un compte? <Link to="/login">Se connecter</Link>
          </p>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));