// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { updateEmail } from "../../actions/userActions";
import { clearErrors } from "../../actions/utilActions"
import FormLayout from "../layout/modules/FormLayout"
// Components
import { Form, Button, Row, Col } from "react-bootstrap"



class EmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.auth.user.email
        }
    }

    onComponentDidMount = () => {
        this.props.clearErrors()
    }

    onSubmit = e => {
        e.preventDefault();
        const updatedUser = {
            email: this.state.email
        };
        this.props.updateEmail(updatedUser, this.props.history)
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        const { errors } = this.props;

        return (
            <FormLayout back="/account">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group as={Row}>
                            <Col sm="5">
                                <Form.Label column>
                                    Adresse email
                        </Form.Label>
                            </Col>
                            <Col >
                                <Form.Control
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    isInvalid={errors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>


                        <Button className="float-right" type="submit">Valider la modification</Button>


                    </Form>
                </FormLayout>
        )
    }
}

EmailForm.propTypes = {
    updateEmail: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { updateEmail, clearErrors })(withRouter(EmailForm))