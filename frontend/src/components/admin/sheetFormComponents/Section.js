// General
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Local
// Components
import { Container, Form } from "react-bootstrap"



class Section extends PureComponent {

    render() {
        const { section, state, setState } = this.props
        const { title, text } = state.sheet.sections.find(sec => sec._id === section._id)
        return (
            <Container>
                <Form.Group>
                    <Form.Control
                        onChange={(event) => {
                            let sections = [...state.sheet.sections]
                            let item = {
                                ...sections.find(sec => sec._id === section._id),
                                [event.target.id]: event.target.value
                            }
                            const index = sections.findIndex(sec => sec._id === section._id)
                            sections[index] = item
                            setState(prevState => ({
                                ...prevState,
                                sheet: {
                                    ...prevState.sheet,
                                    sections: sections
                                }

                            }))
                        }}
                        defaultValue={title}
                        id="title"
                        type="text"
                    />
                    <Form.Control
                        onChange={(event) => {
                            let sections = [...state.sheet.sections]
                            let item = {
                                ...sections.find(sec => sec._id === section._id),
                                [event.target.id]: event.target.value
                            }
                            const index = sections.findIndex(sec => sec._id === section._id)
                            sections[index] = item
                            setState(prevState => ({
                                ...prevState,
                                sheet: {
                                    ...prevState.sheet,
                                    sections: sections
                                }
                            }))
                        }}
                        defaultValue={text}
                        id="text"
                        as="textarea"
                    />
                </Form.Group>
            </Container>
        )
    }
}

export default Section