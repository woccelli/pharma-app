// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { getSheets } from "../../actions/sheetsActions";
// Components
import MaterialTable from 'material-table'
import { Container, Button, Navbar } from 'react-bootstrap'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'

class Sheets extends Component {

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
                    <Button as={Link} to="/admin/sheets/add-sheet" ><Add />Ajouter</Button>
                </Navbar>
            </Container>
        )
    }
}

Sheets.propTypes = {
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
)(Sheets);
