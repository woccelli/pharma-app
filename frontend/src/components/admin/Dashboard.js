import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button'
import CardGrid from "../modules/CardGrid"
import UsersTab from "./users/UsersTab"
import SheetsTab from "./sheets/SheetsTab";
class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <Container>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab">
                    <Tab eventKey="home" title="Accueil">
                        <CardGrid />
                    </Tab>
                    <Tab eventKey="users" title="Utilisateurs">
                        <UsersTab />
                    </Tab>
                    <Tab eventKey="sheets" title="Fiches">
                       <SheetsTab />
                    </Tab>
                </Tabs>
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