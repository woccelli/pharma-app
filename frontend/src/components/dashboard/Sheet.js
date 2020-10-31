import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

//import img from '../../card-image.png'
//import pdftest from '../../mozilla.pdf'

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

  onImageClick = e => {
    e.preventDefault();
  }

  onClickprintPdf = e => {
    e.preventDefault();
    
  }

  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <div class="text-center">
          <Button onClick={this.onClickprintPdf}> Imprimer la fiche</Button>
          <Button onClick={() => alert("Je ne fais rien pour le moment")}>Envoyer la fiche</Button>
          <Button onClick={this.onLogoutClick}> Se déconnecter</Button>
        </div>
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