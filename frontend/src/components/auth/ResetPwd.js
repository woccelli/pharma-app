// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { resetPwd } from "../../actions/authActions";
import { clearErrors } from "../../actions/utilActions"
// Components
import { Jumbotron, Form, Button, Row, Col, Container } from "react-bootstrap"


class ResetPwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword1: "",
            newPassword2: ""
        }
    }

    onComponentDidMount = () => {
        this.props.clearErrors()
    }

    onSubmit = e => {
        e.preventDefault();
        const data = {
            passwords: {
                newPassword1: this.state.newPassword1,
                newPassword2: this.state.newPassword2
            },
            userId: this.props.match.params.userId,
            token: this.props.match.params.token
        };
        this.props.resetPwd(data, this.props.history)
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        const { errors } = this.props;

        return (
            <Container>
                <Jumbotron>
                    <Form onSubmit={this.onSubmit}>
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

                        <Button className="float-right" type="submit">Valider</Button>
                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

ResetPwd.propTypes = {
    resetPwd: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { resetPwd, clearErrors })(withRouter(ResetPwd))