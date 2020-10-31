import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

class AdminPage extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
          <h2>Je suis un { user.role }</h2>
          <Button onClick={this.onLogoutClick}> Se déconnecter</Button>
      </Container>
    );
  }
}

AdminPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminPage);