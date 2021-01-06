// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { logoutUser } from "../../../actions/authActions";
// Components
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

class Header extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    userBoard = () => {
        if (this.props.auth.isAuthenticated) {
            return (
                <Nav>
                    <Nav.Link as={Link} to="/account">Mon compte</Nav.Link>
                    <Nav.Link onClick={this.onLogoutClick}>Se déconnecter</Nav.Link>
                </Nav>)
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <Navbar bg="dark" sticky="top" className="border-bottom border-gray bg-white">
                <Navbar.Brand as={Link} to="/">Toposanté</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <this.userBoard></this.userBoard>
            </Navbar>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Header);