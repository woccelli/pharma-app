// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { forgottenPwd } from "../../../actions/authActions";
// Components
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


class ForgottenPwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors };
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const lostUser = {
            email: this.state.email
        }
        this.props.forgottenPwd(lostUser);
    };

    render() {
        const { errors } = this.state;

        return (
            <Container>
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Addresse mail associée à votre compte :
                                </Form.Label>
                        <Form.Control
                            id="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            isInvalid={errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                        <Alert show={this.props.success.pwdEmailSent || false} variant="success">
                            Un email a été envoyé à l'adresse email indiquée
                      </Alert>
                    </Form.Group>
                    <Button className="float-right" type="submit">Envoyer</Button>
                </Form>
            </Container>
        )
    }
}

ForgottenPwd.propTypes = {
    forgottenPwd: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        success: state.success
    }
}

export default connect(
    mapStateToProps,
    { forgottenPwd }
)(ForgottenPwd);

