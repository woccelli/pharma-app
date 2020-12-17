// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import CardGrid from "../modules/CardGrid"
// Components
import Container from 'react-bootstrap/Container'


class Dashboard extends Component {

  componentDidMount() {
    if (this.props.auth.user.role === 'ADMIN') {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { user } = this.props.auth;

    return (
      <Container> 
        <h4>Bonjour {user.name}</h4>
        <CardGrid/>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);