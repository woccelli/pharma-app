// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { deleteUser } from "../../actions/userActions";
import FormLayout from "../layout/modules/FormLayout"
// Components
import { Form, Button, Row, Col } from "react-bootstrap"
import { Delete } from "@material-ui/icons"


class DeleteForm extends Component {

    onSubmit = e => {
        e.preventDefault();
        this.props.deleteUser()
    };

    render() {
        const { errors } = this.props;

        return (
            <FormLayout back="/account">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group as={Row}>
                        <Col sm="5">
                            <Form.Label column style={{color: "red"}}>
                                Suppression du compte
                        </Form.Label>
                        </Col>
                        <Col >
                            <p>
                            Toute suppression est définitive. Aucune donnée personnelle n'est gardée après la suppression (art.17 règlement européen de protection des donnéees).
                            </p>
                        </Col>
                    </Form.Group>
                    <Button className="float-right" type="submit" variant="danger"><Delete/> Supprimer mon compte</Button>
                </Form>
            </FormLayout>
        )
    }
}

DeleteForm.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, { deleteUser })(withRouter(DeleteForm))