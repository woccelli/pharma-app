// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { getSheets } from "../../../actions/sheetsActions";
// Components
import MaterialTable from 'material-table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from "react-bootstrap/Navbar";

class SheetsTab extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getSheets();
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
            <MaterialTable
                columns={columns}
                data={sheets}
                title="Fiches"
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
                <Button className="btn-lg navbar-btn text-center" style={{'border-radius': '50%'}} href='/admin/addsheet'><h4>+</h4></Button>
            </Navbar>
            </Container>
        )
    }
}

SheetsTab.propTypes = {
    getSheets: PropTypes.func.isRequired,
    sheets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        sheets: state.sheets
    }
}

export default connect(
    mapStateToProps,
    { getSheets }
)(SheetsTab);
