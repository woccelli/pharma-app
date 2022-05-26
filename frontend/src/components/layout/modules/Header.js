// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import { logoutUser } from "../../../actions/authActions";
import logo from "../../../logo.png"
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
                    <Nav.Link as={Link} to="/account" className={"header-link"}>Mon compte</Nav.Link>
                    <Nav.Link onClick={this.onLogoutClick} className={"header-link"}>Se déconnecter</Nav.Link>
                </Nav>)
        } else {
            return (<div></div>)
        }
    }

    adminBoard = () => {
        if (this.props.auth.isAuthenticated && this.props.auth.user.role === "ADMIN") {
        return (
            <Nav>
                <Nav.Link as={Link} to="/admin/users" className={"header-link"}>Utilisateurs</Nav.Link>
                <Nav.Link as={Link} to="/admin/sheets" className={"header-link"}>Fiches</Nav.Link>
            </Nav>
        )} else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <Navbar sticky="top" className="headernav">
                <Navbar.Brand as={Link} to="/" className={"d-flex align-items-center"}>
                    <img className={"header-logo"} src={logo} alt={"Toposanté logo"}/>
                    <h3 className={"mt-1"}>Toposanté</h3>
                </Navbar.Brand>
                <this.adminBoard></this.adminBoard>
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