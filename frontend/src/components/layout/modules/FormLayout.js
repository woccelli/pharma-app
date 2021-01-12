import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Container, Jumbotron, ListGroup, Row, Col } from "react-bootstrap"
import {Link} from "react-router-dom"
import { ArrowBackIos } from '@material-ui/icons'

class FormLayout extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        const { children, back } = this.props

        return (
            <Container>
                <ListGroup variant="flush">
                    <ListGroup.Item action as={Link} to={back} >
                        <Row >
                            <Col xs="5"><ArrowBackIos /></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <Jumbotron>
                    {children}
                </Jumbotron>
            </Container>
        )
    }
}

export default withRouter(FormLayout)