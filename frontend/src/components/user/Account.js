// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { updateUser } from "../../actions/userActions";
// Components
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.user.name,
            initialname: this.props.auth.user.name,
            email: this.props.auth.user.email,
            modify: false,
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors };
        }
        if (nextProps.auth.user.name != prevState.initialname) {
            return {
                name: nextProps.auth.user.name,
                initialname: nextProps.auth.user.name,
                nameSuccess: "Le nom a bien été modifié !",
                modify: false
            };
        }
        else return null; // Triggers no change in the state
    }

    handleModify = () => {
        this.setState(prevState => ({
            errors: {},
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            nameSuccess: "",
            modify: !prevState.modify
        }));
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    clearErrors = () => {
        this.setState({ errors: {} });
    }

    onSubmit = e => {
        e.preventDefault();
        const updatedUser = {
            name: this.state.name
        };
        this.props.updateUser(updatedUser);
    };

    render() {
        const { errors } = this.state;
        const { addresses } = this.props.auth.user
        console.log(this.props.auth.user)
        console.log(addresses)
        return (
            <Container fluid>
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
                    <Col xs="auto">
                        <Row>
                            <h4>Mes informations</h4>
                        </Row>
                        <Row>
                            <Form noValidate onSubmit={this.onSubmit}>
                                <Form.Group as={Row}>
                                    <Col sm="5">
                                        <Form.Label column>
                                            Dénomination sociale
                                        </Form.Label>
                                    </Col>
                                    <Col >
                                        <Form.Control
                                            id="name"
                                            plaintext={!this.state.modify}
                                            readOnly={!this.state.modify}
                                            value={this.state.name}
                                            onChange={this.onChange}
                                            error={errors.name}
                                            isInvalid={errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-success">
                                            {this.state.nameSuccess}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm="5">
                                        <Form.Label column>
                                            Email
                                    </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control plaintext readOnly value={this.state.email} />
                                    </Col>
                                </Form.Group>
                                <Button hidden={this.state.modify} onClick={this.handleModify}>Modifier</Button>
                                <Button hidden={!this.state.modify} disabled={!this.state.modify} type="submit">Valider la modification</Button>
                                <Button hidden={!this.state.modify} onClick={this.handleModify} variant='secondary'>Annuler</Button>
                            </Form>
                        </Row>
                        <Row>
                            <h4>Mes adresses</h4>
                        </Row>
                        <Row>
                            {
                                addresses.map((address, _id) => { return (console.log(address.dest)) }
                                )}

                            <CardDeck>
                                {addresses.map((address, _id) => {
                                    return (
                                        <Card key={_id} tag="a">
                                            <Card.Body >
                                                <Card.Text>
                                                    <Container fluid>
                                                    <Row>{address.dest}</Row>
                                                    <Row>{address.addr_comp}</Row>
                                                    <Row>{address.addr_1}</Row>
                                                    <Row>{address.addr_2}</Row>
                                                    <Row>{address.postcode} {address.city}</Row>
                                                    <Row>{address.country}</Row>
                                                    </Container>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )
                                }
                                )}
                            </CardDeck>

                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Account.propTypes = {
    updateUser: PropTypes.func.isRequired,
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
    { updateUser }
)(Account);