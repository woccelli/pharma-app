// General
import React, { PureComponent } from "react";
//Local
import Advice from "./Advice"
// Components
import MaterialTable from 'material-table'
import {  Delete, Add } from '@material-ui/icons'
import { IconButton } from '@material-ui/core';


class Advices extends PureComponent {

    onDeleteAdvice = adviceToDelete => {
        const { setState, state } = this.props
        let newAdvices = state.sheet.advices
        const index = newAdvices.findIndex(sec => sec._id === adviceToDelete._id)
        newAdvices.splice(index, 1)
        setState(prevState => ({
            ...prevState,
            sheet: {
                ...prevState.sheet,
                advices: newAdvices 
            }
        }))
        console.log(newAdvices)
    }

    addAdvice = () => {
        const { setState, state } = this.props
        const num = state.sheet.advices.length+1
        let newAdvice = {
            _id: `newAdvice#${Date.now()}`,
            text: `Conseil ${num}`,
        }
        setState(prevState => ({
            ...prevState,
            sheet: {
                ...prevState.sheet,
                advices: [
                    ...prevState.sheet.advices,
                    newAdvice
                ]
            }
        }))
    }

    render() {
        const columns = [
            {
                title: 'Conseil',
                field: 'text',
            },
            {
                title: '',
                render: advice =>
                    <div className="float-right">
                        <IconButton onClick={() => this.onDeleteAdvice(Advice)}>
                            <Delete />
                        </IconButton>
                    </div>
            }
        ];
        const { advices } = this.props.state.sheet
        const { state, setState } = this.props

        return (
                <div style={{ display: "flex", flexDirection: "column"}}>
                <MaterialTable
                    columns={columns}
                    data={advices}
                    title="Conseils"
                    options={{
                        sorting: true,
                        filtering: true,
                        search: false,
                        defaultExpanded: true
                    }}
                    detailPanel={rowData => <Advice key={rowData._id} state={state} setState={setState} advice={rowData}/>}
                    
                />
                <IconButton style={{ marginLeft: "auto" }} onClick={this.addAdvice}><Add/></IconButton>
                </div>
     
        )
    }
}

export default Advices