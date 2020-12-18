// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { getUsers } from "../../../actions/adminActions";
// Components
import MaterialTable from 'material-table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from "react-bootstrap/Navbar";

class UserTab extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getUsers();
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
                    <Button className="btn-lg navbar-btn text-center" style={{ 'border-radius': '50%' }} href='/admin/addsheet'><h4>+</h4></Button>
                </Navbar>
            </Container>
        )
    }
}

UserTab.propTypes = {
    getUsers: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        admin: state.admin
    }
}

export default connect(
    mapStateToProps,
    { getUsers }
)(UserTab);
