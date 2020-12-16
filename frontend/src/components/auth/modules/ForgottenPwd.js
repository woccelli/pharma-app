import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { forgottenPwd } from "../../../actions/authActions";

class ForgottenPwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errors: {}
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
        this.props.forgottenPwd(this.state.email);
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
    { forgottenPwd }
)(ForgottenPwd);

