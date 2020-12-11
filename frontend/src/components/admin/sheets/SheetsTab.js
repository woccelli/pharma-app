import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSheets } from "../../../actions/sheetsActions";
import MaterialTable from 'material-table'

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

        const ExpandableComponent = ({ data }) => <div>{data._id}</div>;
        return (


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
