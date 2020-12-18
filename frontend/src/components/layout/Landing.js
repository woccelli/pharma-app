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


class Landing extends Component {

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <Container>
        <CardGrid />
        <Navbar fixed="bottom" >
          <div className="w-50">
            <Button type="button" href="/register" className="btn btn-secondary btn-lg btn-block">S'inscrire</Button>
          </div>
          <div className="w-50">
          <Button type="button" href="/login" className="btn btn-primary btn-lg btn-block">Se connecter</Button>
          </div>
        </Navbar>
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