import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import CardGrid from "../modules/CardGrid"
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container> 
        <h4>Bonjour {user.name}</h4>
        <CardGrid/>
        <Button  href="/subscribe"> S'abonner</Button>
        <Button  onClick={this.onLogoutClick}> Se déconnecter</Button>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);