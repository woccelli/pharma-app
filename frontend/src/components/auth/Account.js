import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updateUser } from "../../actions/authActions";

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            modify: false,
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
        if (nextProps.auth.user) {
            this.setState({
              name: nextProps.auth.user.name
            });
          }
      }

    handleModify = () => {
        this.setState(prevState => ({
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            modify: !prevState.modify
        }));
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit =  e => {
        e.preventDefault();
        const updatedUser = {
            name: this.state.name
          };
          this.props.updateUser(updatedUser);
          this.handleModify();
      };

    render() {
        const { errors } = this.state;

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
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="formName">
                                <Form.Label column sm="2">
                                    Nom
                                </Form.Label>
                                <Col sm="10">
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
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly value={this.state.email} />
                                </Col>
                            </Form.Group>
                            <Button hidden={this.state.modify} onClick={this.handleModify}>Modifier</Button>
                            <Button hidden={!this.state.modify} type="submit">Valider la modification</Button>
                            <Button hidden={!this.state.modify} onClick={this.handleModify} variant='secondary'>Annuler</Button>
                        </Form>
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