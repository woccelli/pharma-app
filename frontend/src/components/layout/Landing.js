// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import CardGrid from "./modules/CardGrid"
// Components
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'


class Landing extends Component {

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <Container className="justify-content-center" style={{height: '100vh', display:'flex', margin: 'auto', flexDirection: "column", alignContent: 'center', alignItems: 'center'}}>
            <p>
              <b>Bienvenue sur Toposanté !</b>
            </p>
            <p>
               L’application qui vous permet d’envoyer à vos patients des fiches de conseils claires sur leur pathologie 
            </p>
            <div  style={{verticalAlign: "middle"}}>
          <Button type="button" as={Link} to="/register" className="btn btn-secondary btn-lg mr-1">S'inscrire</Button>
          <Button type="button" as={Link} to="/login" className="btn btn-primary btn-lg ml-1" >Se connecter</Button>
          </div>

      </Container>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {}
)(Landing);