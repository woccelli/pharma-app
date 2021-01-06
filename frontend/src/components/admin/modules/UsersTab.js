// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { getUsers } from "../../../actions/adminActions";
import { clearSuccess } from "../../../actions/utilActions"
import AddUser from "../AddUser"
// Components
import MaterialTable from 'material-table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

class UserTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddUser: false
        }
    }

    componentDidMount = () => {
        this.props.getUsers();
    }

    showAddUser = () => {
        this.props.clearSuccess()
        this.setState({
            showAddUser: true,
        })
    }

    hideAddUser =() => {
        this.setState({
            showAddUser: false
        })
    }

    render() {
        const { users } = this.props.admin
        const columns = [
            {
                title: 'Nom',
                field: 'name',
            },
            {
                title: 'E-mail',
                field: 'email',
            },
            {
                title: 'Role',
                field: 'role',
            },
            {
                title: 'Abonné',
                field: 'subscriber',
                render: row => row.subscriber ? 'Oui' : 'Non'
            },
            {
                title: 'Date de création',
                field: 'date'
            },
        ];

        return (
            <Container>
                <Modal show={this.state.showAddUser && !this.props.success.addedUser} onHide={this.hideAddUser}>
                    <Modal.Body>
                        <AddUser />
                    </Modal.Body>
                </Modal>
                <Alert show={this.props.success.addedUser || false } variant="success">
                    L'utilisateur a bien été créé, un email a été envoyé à l'adresse indiquée pour l'informer.
                </Alert>
                <MaterialTable
                    columns={columns}
                    data={users}
                    title="Utilisateurs"
                    options={{
                        sorting: true,
                        filtering: true
                    }}
                    detailPanel={rowData => {
                        return (
                            <div>{rowData._id}</div>
                        )
                    }}
                />
                <Navbar className="float-right">
                    <Button
                        className="btn-lg navbar-btn text-center"
                        style={{ 'border-radius': '50%' }}
                        onClick={this.showAddUser}
                    ><h4>+</h4></Button>
                </Navbar>
            </Container>
        )
    }
}

UserTab.propTypes = {
    getUsers: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        admin: state.admin,
        success: state.success
    }
}

export default connect(
    mapStateToProps,
    { getUsers, clearSuccess }
)(UserTab);