// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { updatePwd } from "../../actions/userActions";
import { clearErrors } from "../../actions/utilActions"
// Components
import { Jumbotron, Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowBackIos }  from '@material-ui/icons'


class PwdForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            newPassword1: "",
            newPassword2: ""
        }
    }

    onComponentDidMount = () => {
        this.props.clearErrors()
    }

    onSubmit = e => {
        e.preventDefault();
        const passwords = {
            password: this.state.password,
            newPassword1: this.state.newPassword1,
            newPassword2: this.state.newPassword2
        };
        this.props.updatePwd(passwords, this.props.history)
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        const { errors } = this.props;

        return (
            <Container>
                 <ListGroup variant="flush">
                    <ListGroup.Item action as={Link} to="/account" >
                        <Row >
                            <Col xs="5"><ArrowBackIos/></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>    
                <Jumbotron>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group as={Row}>
                            <Col sm="5">
                                <Form.Label column>
                                    Mot de passe actuel
                        </Form.Label>
                            </Col>
                            <Col >
                                <Form.Control
                                    id="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                    isInvalid={errors.password}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="5">
                                <Form.Label column>
                                    Nouveau mot de passe
                        </Form.Label>
                            </Col>
                            <Col >
                                <Form.Control
                                    id="newPassword1"
                                    type="password"
                                    value={this.state.newPassword1}
                                    onChange={this.onChange}
                                    error={errors.newPassword1}
                                    isInvalid={errors.newPassword1}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.newPassword1}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="5">
                                <Form.Label column>
                                    Confirmez le nouveau mot de passe
                        </Form.Label>
                            </Col>
                            <Col >
                                <Form.Control
                                    id="newPassword2"
                                    type="password"
                                    value={this.state.newPassword2}
                                    onChange={this.onChange}
                                    error={errors.newPassword2}
                                    isInvalid={errors.newPassword2}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.newPassword2}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>


                        <Button className="float-right" type="submit">Valider la modification</Button>
                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

PwdForm.propTypes = {
    updatePwd: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { updatePwd, clearErrors })(withRouter(PwdForm))