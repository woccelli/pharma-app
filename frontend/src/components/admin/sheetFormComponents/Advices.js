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
    }

    addAdvice = () => {
        const num = this.props.state.sheet.advices.length+1
        let newAdvice = {
            _id: `${Date.now().toString(12)}`,
            title: `Conseil ${num}`,
            text: "",
            icon: require('@mdi/js')["mdiCigarOff"]
        }
        this.props.setState(prevState => ({
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
                field: 'title',
            },
            {
                title: '',
                render: advice =>
                    <div className="float-right">
                        <IconButton onClick={() => this.onDeleteAdvice(advice)}>
                            <Delete />
                        </IconButton>
                    </div>
            }
        ];
        return (
                <div style={{ display: "flex", flexDirection: "column"}}>
                <MaterialTable
                    columns={columns}
                    data={this.props.state.sheet.advices}
                    title="Conseils"
                    options={{
                        sorting: true,
                        filtering: true,
                        search: false,
                        defaultExpanded: true
                    }}
                    detailPanel={rowData => <Advice key={rowData._id} state={this.props.state} setState={this.props.setState} advice={rowData}/>}
                    
                />
                <IconButton style={{ marginLeft: "auto" }} onClick={this.addAdvice}><Add/></IconButton>
                </div>
     
        )
    }
}

export default Advices