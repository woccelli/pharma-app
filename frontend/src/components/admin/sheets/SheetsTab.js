import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSheets } from "../../../actions/sheetsActions";
import Table from 'react-bootstrap/Table';
class SheetsTab extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getSheets();
    }


    render() {
        console.log(this.props)
        const { sheets } = this.props.sheets

        return (

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sheets.map((sheet, _id) => (
                        <tr key={_id}>
                            <td>{_id}</td>
                            <td>{sheet.name}</td>
                            <td>{sheet.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
