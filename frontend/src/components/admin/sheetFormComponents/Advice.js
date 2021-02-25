// General
import React, { PureComponent } from "react";
//Local
import iconNames from '../../../utils/iconNames'
// Components
import { Container, Form } from "react-bootstrap"
import Icon from '@mdi/react'
import { MenuItem, Select, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

class Advice extends PureComponent {

    onSelect = event => {
        const reqIcon = event.target.textContent
        const path = require('@mdi/js')[reqIcon]
        if (path) {
            let advices = [...this.props.state.sheet.advices]
            let item = {
                ...advices.find(adv => adv._id === this.props.advice._id),
                icon: path
            }
            const index = advices.findIndex(adv => adv._id === this.props.advice._id)
            advices[index] = item
            this.props.setState(prevState => ({
                ...prevState,
                sheet: {
                    ...prevState.sheet,
                    advices: advices
                }

            }))
        }
    }

    render() {

        const { text, title, icon } = this.props.state.sheet.advices.find(adv => adv._id === this.props.advice._id)
        const icons = iconNames()
        return (
            <Container>
                <Form.Group>
                    <Form.Control
                        onChange={(event) => {
                            let advices = [...this.props.state.sheet.advices]
                            let item = {
                                ...advices.find(adv => adv._id === this.props.advice._id),
                                [event.target.id]: event.target.value
                            }
                            const index = advices.findIndex(adv => adv._id === this.props.advice._id)
                            advices[index] = item
                            this.props.setState(prevState => ({
                                ...prevState,
                                sheet: {
                                    ...prevState.sheet,
                                    advices: advices
                                }

                            }))
                        }}
                        defaultValue={title}
                        id="title"
                        type="text"
                    />
                    <Form.Control
                        onChange={(event) => {
                            let advices = [...this.props.state.sheet.advices]
                            let item = {
                                ...advices.find(adv => adv._id === this.props.advice._id),
                                [event.target.id]: event.target.value
                            }
                            const index = advices.findIndex(adv => adv._id === this.props.advice._id)
                            advices[index] = item
                            this.props.setState(prevState => ({
                                ...prevState,
                                sheet: {
                                    ...prevState.sheet,
                                    advices: advices
                                }

                            }))
                        }}
                        defaultValue={text}
                        id="text"
                        as="textarea"
                    />
                    <div>
                        <Autocomplete
                            onChange={this.onSelect}
                            id="combo-box-demo"
                            options={icons}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Icône" variant="outlined"/>}
                        />
                        <Icon path={icon}
                            size={2}
                            color="#000085"
                        />
                    </div>
                </Form.Group>
            </Container>
        )
    }
}

export default Advice