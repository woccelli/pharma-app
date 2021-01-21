// General
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Local
import Section from "./Section"
// Components
import MaterialTable from 'material-table'
import { Container, Form } from "react-bootstrap"
import { Done, Delete, Edit } from '@material-ui/icons'
import { IconButton } from '@material-ui/core';


class Sections extends PureComponent {

    onDeleteSection = section => {
        console.log(section)
    }

    onSectionChange = (newSection, oldSection) => {
        let newSections = [...this.props.sections]
        const index = newSections.findIndex(e => e.title === oldSection.title)
        if(oldSection) {
            newSections[index] = newSection
        } else {
            newSections = [...newSections, newSection]
        }
        this.props.onChange(newSection, oldSection)
    }

    render() {
        const columns = [
            {
                title: 'Nom',
                field: 'title',
            },
            {
                title: '',
                render: section =>
                    <div className="float-right">
                        <IconButton onClick={() => this.onDeleteSection(section)}>
                            <Delete />
                        </IconButton>
                    </div>
            }
        ];
        const { sections } = this.props.state.sheet
        const { state, setState } = this.props

        return (
     
                <MaterialTable
                    columns={columns}
                    data={sections}
                    title="Sections"
                    options={{
                        sorting: true,
                        filtering: true,
                        search: false,
                        defaultExpanded: true
                    }}
                    detailPanel={rowData => <Section key={rowData._id} state={state} setState={setState} section={rowData}/>}
                    
                />
     
        )
    }
}

Sections.propTypes = {
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {})(Sections)