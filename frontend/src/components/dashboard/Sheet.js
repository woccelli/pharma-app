import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class Sheet extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onSheetActionClick () {
   // if(!isSubsribed){
  //   history.pushState(/subscribe)
  // }
  }

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <Card>Ceci est une fiche</Card>
        <Button onClick={() => alert("Je ne fais rien pour le moment")}>Imprimer la fiche</Button>
          <Button onClick={() => alert("Je ne fais rien pour le moment")}>Envoyer la fiche</Button>
          <Button onClick={this.onLogoutClick}> Se déconnecter</Button>
      </Container>
    );
  }
}

Sheet.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Sheet);