// General
import React, { PureComponent } from "react";
//Local
// Components
import { Container, Form } from "react-bootstrap"



class Advice extends PureComponent {

    render() {
        const { advice, state, setState } = this.props
        const { text } = state.sheet.advices.find(adv => adv._id === advice._id)
        return (
            <Container>
                <Form.Group>
                    <Form.Control
                        onChange={(event) => {
                            let advices = [...state.sheet.advices]
                            let item = {
                                ...advices.find(adv => adv._id === adv._id),
                                [event.target.id]: event.target.value
                            }
                            const index = advices.findIndex(adv => adv._id === adv._id)
                            advices[index] = item
                            setState(prevState => ({
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
                </Form.Group>
            </Container>
        )
    }
}

export default Advice