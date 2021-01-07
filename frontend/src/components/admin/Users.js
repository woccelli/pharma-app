// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { getUsers, getUserLogs, clearUserLogs } from "../../actions/adminActions";
import { clearSuccess } from "../../actions/utilActions"
// Components
import MaterialTable from 'material-table'
import { Container, Button, Navbar, Alert } from 'react-bootstrap'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddUser: false
        }
    }

    componentDidMount = () => {
        this.props.getUsers();
    }

    componentWillUnmount = () => {
        this.props.clearSuccess()
        this.props.clearUserLogs()
    }

    renderUserDetails = user => {
        const userLogs = this.props.admin.logs.find(log => log.userId === user._id)
        console.log(this.props.admin.logs)
        if (userLogs) {
            const logs = userLogs.userlogs
            return (
                logs.map((log, _id) => {
                    return (
                        <div key={_id}>{log._id}{log._sheet.name}{log._sheet._id}</div>
                    )
                })
            )
        } else {
            this.callUserDetails(user)
        }
    }

    callUserDetails = user => {
        this.props.getUserLogs(user)
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
                <Alert show={this.props.success.addedUser || false} variant="success">
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
                    onRowClick={(event, rowData, togglePanel) => {
                        this.callUserDetails(rowData)
                        togglePanel()
                    }}
                    detailPanel={rowData => this.renderUserDetails(rowData)}

                />
                <Navbar className="float-right">
                    <Button as={Link} to="/admin/users/add-user" ><Add />Ajouter</Button>
                </Navbar>
            </Container>
        )
    }
}

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUserLogs: PropTypes.func.isRequired,
    clearUserLogs: PropTypes.func.isRequired,
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
    { getUsers, getUserLogs, clearSuccess, clearUserLogs }
)(Users);
