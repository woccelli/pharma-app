// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Local
import CardGrid from "../modules/CardGrid"
import UsersTab from "./users/UsersTab"
import SheetsTab from "./sheets/SheetsTab";
// Components
import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'

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