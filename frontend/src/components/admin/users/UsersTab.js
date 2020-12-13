import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../../actions/adminActions";
import MaterialTable from 'material-table'

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
                render: row => row.subscriber?'Oui':'Non'
            },
            {
                title: 'Date de création',
                field: 'date'
            },
        ];

        return (

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
