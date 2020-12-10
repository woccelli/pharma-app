import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../../actions/adminActions";
import Table from 'react-bootstrap/Table';
class UserTab extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getUsers();
    }


    render() {
        const { users } = this.props.admin

        return (

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>E-mail</th>
                        <th>Role</th>
                        <th>Abonné</th>
                        <th>Création</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, _id) => (
                        <tr key={_id}>
                            <td>{_id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{(user.subscriber)?'Oui':'Non'}</td>
                            <td>{user.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
