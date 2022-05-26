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
import { Add, Build } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { IconButton } from '@material-ui/core';

class Users extends Component {

    componentDidMount = () => {
        this.props.getUsers();
    }

    componentWillUnmount = () => {
        this.props.clearSuccess()
        this.props.clearUserLogs()
    }

    renderUserDetails = user => {
        console.log(user)
        const userLogs = this.props.admin.userLogs.find(log => log.userId === user._id)
        if (userLogs) {
            const logs = userLogs.userlogs
            const data = logs.map((log, _id) => {
                const x = new Date(log._id.year, log._id.month, log._id.day)
                const y = log.sheetCount.reduce((accumulator, curr) => accumulator + curr.count, 0)
                return { x, y }
            })
            const labels = data.map(val => val.x)
            const datasets = [{
                label: "Nombre d'envois",
                data: data,
                fill: true,
                backgroundColor: "rgb(192,217,255)",
                borderColor: "rgb(0,98,251)",
            }]
            const chartData = {
                labels: labels,
                datasets: datasets,
            }
            const options = {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                },
            }
            return (
                <Bar data={chartData} options={options} />
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
                title: 'Numéro de commande',
                field: 'commandNumber',
            },
            {
                title: 'Abonné',
                field: 'subscriber',
                render: row => (new Date(row.subuntil)) > Date.now() ? 'Oui' : 'Non'
            },
            {
                title: "Date de fin d'abonnement",
                field: 'subuntil',
                render: row => (new Date(row.subuntil)).toLocaleDateString()
            },
            {
                title: 'Date de création',
                field: 'date',
                render: row => (new Date(row.date)).toLocaleDateString()
            },
            {
                title: '',
                render: user => 
                <Link to={{
                    pathname: '/admin/users/user-subscription',
                    state: {
                        userId: user._id
                    }
                }}>
                    <IconButton>
                        <Build />
                    </IconButton>
                </Link>
            }
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
