// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { updateCommandNumber } from "../../actions/userActions";
import { clearErrors } from "../../actions/utilActions"
import FormLayout from "../layout/modules/FormLayout"
// Components
import { Form, Button, Row, Col } from "react-bootstrap"
import {Typography} from "@material-ui/core";


class CommandNumberForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commandNumber: this.props.auth.user.commandNumber
        }
    }

    onComponentDidMount = () => {
        this.props.clearErrors()
    }

    onSubmit = e => {
        e.preventDefault();
        const updatedUser = {
            commandNumber: this.state.commandNumber
        };
        this.props.updateCommandNumber(updatedUser, this.props.history)
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
                                Numéro de commande
                            </Form.Label>
                        </Col>
                        <Col >
                            <Form.Control
                                id="commandNumber"
                                value={this.state.commandNumber}
                                onChange={this.onChange}
                                error={errors.commandNumber}
                                isInvalid={errors.commandNumber}
                            />
                            <Typography variant={"caption"}>
                                Veuillez indiquer le numéro de commande que vous avez obtenu lors de de votre abonnement sur: &nbsp;
                                <a href={"https://www.toposante.fr/application/"} target="_blank">https://www.toposante.fr/application</a>
                            </Typography>
                            <Form.Control.Feedback type="invalid">
                                {errors.commandNumber}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button className="float-right" type="submit">Valider la modification</Button>
                </Form>
            </FormLayout>
        )
    }
}

CommandNumberForm.propTypes = {
    updateCommandNumber: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { updateCommandNumber, clearErrors })(withRouter(CommandNumberForm))