// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { getSheets } from "../../actions/sheetsActions";
import { getSheetLogs, clearSheetLogs } from "../../actions/adminActions"
import { clearSuccess } from "../../actions/utilActions"
// Components
import MaterialTable from 'material-table'
import { Container, Button, Navbar, Alert } from 'react-bootstrap'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

class Sheets extends Component {

    componentDidMount = () => {
        this.props.getSheets();
    }

    componentWillUnmount = () => {
        this.props.clearSuccess()
        this.props.clearSheetLogs()
    }

    renderSheetDetails = sheet => {
        const sheetLogs = this.props.admin.sheetLogs.find(log => log.sheetId === sheet._id)
        if (sheetLogs) {
            const logs = sheetLogs.sheetlogs
            const data = logs.map((log, _id) => {
                const x = new Date(log._id.year, log._id.month, log._id.day)
                const y = log.count
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
                <Line data={chartData} options={options} />
            )
        } else {
            this.callSheetDetails(sheet)
        }
    }

    callSheetDetails = sheet => {
        this.props.getSheetLogs(sheet)
    }

    render() {
        const { sheets } = this.props.sheets

        const columns = [
            {
                title: 'Nom',
                field: 'name',
            },
            {
                title: 'Date',
                field: 'date',
            },
        ];

        return (
            <Container>
                <Alert show={this.props.success.addedSheet || false} variant="success">
                    La fiche a bien été créée.
                </Alert>
                <MaterialTable
                    columns={columns}
                    data={sheets}
                    title="Fiches"
                    options={{
                        sorting: true,
                        filtering: true
                    }}
                    onRowClick={(event, rowData, togglePanel) => {
                        this.callSheetDetails(rowData)
                        togglePanel()
                    }}
                    detailPanel={rowData => this.renderSheetDetails(rowData)}
                />
                <Navbar className="float-right">
                    <Button as={Link} to="/admin/sheets/add-sheet" ><Add />Ajouter</Button>
                </Navbar>
            </Container>
        )
    }
}

Sheets.propTypes = {
    getSheets: PropTypes.func.isRequired,
    getSheetLogs: PropTypes.func.isRequired,
    clearSheetLogs: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    sheets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        sheets: state.sheets,
        admin: state.admin,
        success: state.success
    }
}

export default connect(
    mapStateToProps,
    { getSheets, getSheetLogs, clearSheetLogs, clearSuccess }
)(Sheets);
