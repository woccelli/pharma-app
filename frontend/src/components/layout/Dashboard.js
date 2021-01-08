// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { checkUserToken } from '../../actions/authActions'
import CardGrid from "./modules/CardGrid"
// Components
import Container from 'react-bootstrap/Container'


class Dashboard extends Component {

  componentDidMount() {
    this.props.checkUserToken()
  }

  render() {
    const { user } = this.props.auth;

    return (
      <Container> 
        <CardGrid/>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  checkUserToken: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { checkUserToken }
)(Dashboard);