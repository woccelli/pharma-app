import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
class Account extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props.auth;

        return (
            <Container>
                <Row>
                    <Col xs="auto">
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <Nav.Link href="/home">Active</Nav.Link>
                            <Nav.Link eventKey="link-1">Link</Nav.Link>
                            <Nav.Link eventKey="link-2">Link</Nav.Link>
                            <Nav.Link eventKey="disabled" disabled>
                                Disabled
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextName">
                                <Form.Label column sm="2">
                                    Nom
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={user.name} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={user.email} />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

Account.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
    }
}

export default connect(
    mapStateToProps,
    null
)(Account);