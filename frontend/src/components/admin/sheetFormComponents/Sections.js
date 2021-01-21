// General
import React, { PureComponent } from "react";
//Local
import Section from "./Section"
// Components
import MaterialTable from 'material-table'
import { Delete, Add } from '@material-ui/icons'
import { IconButton } from '@material-ui/core';


class Sections extends PureComponent {

    onDeleteSection = sectionToDelete => {
        const { setState, state } = this.props
        let newSections = state.sheet.sections
        const index = newSections.findIndex(sec => sec._id === sectionToDelete._id)
        newSections.splice(index, 1)
        setState(prevState => ({
            ...prevState,
            sheet: {
                ...prevState.sheet,
                sections: newSections
            }
        }))
        console.log(newSections)
    }

    addSection = () => {
        const { setState, state } = this.props
        const num = state.sheet.sections.length + 1
        let newSection = {
            _id: `newsection#${Date.now()}`,
            title: `Section ${num}`,
            text: ""
        }
        setState(prevState => ({
            ...prevState,
            sheet: {
                ...prevState.sheet,
                sections: [
                    ...prevState.sheet.sections,
                    newSection
                ]
            }
        }))
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
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                    detailPanel={rowData => <Section key={rowData._id} state={state} setState={setState} section={rowData} />}

                />
                <IconButton style={{ marginLeft: "auto" }} onClick={this.addSection}><Add /></IconButton>
            </div>

        )
    }
}

export default Sections