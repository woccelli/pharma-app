// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { logoutUser } from "../../actions/authActions";
// Components
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


class Subscribe extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <h4>Re-bonjour {user.name}</h4>
        <br/>
        C'est ici pour s'abonner !
        <br/>
        <Button  onClick={this.onLogoutClick}> Se déconnecter</Button>
      </Container>
    );
  }
}

Subscribe.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Subscribe);