// General
import React, { PureComponent } from "react";
//Local
// Components
import { Container, Form} from 'react-bootstrap'


class General extends PureComponent {

    onChange = event => {
        const { state, setState } = this.props 
        setState(prevState => ({
            ...prevState,
            sheet: {
                ...prevState.sheet,
                [event.target.id]: event.target.value
            }
        }))
    }

    render() {
        const { name, definition } = this.props.state.sheet
    
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Container>
                    <Form.Group>
                        <Form.Label>Nom de la fiche</Form.Label>
                        <Form.Control
                            onChange={this.onChange}
                            defaultValue={name}
                            id="name"
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Définition</Form.Label>
                        <Form.Control
                            onChange={this.onChange}
                            defaultValue={definition}
                            id="definition"
                            as="textarea"
                        />
                    </Form.Group>
                </Container>
            </div>

        )
    }
}

export default General