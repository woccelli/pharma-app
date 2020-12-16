import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { addAddress } from "../../../actions/authActions";

class AddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dest: "",
            addr_comp: "",
            addr_1: "",
            addr_2: "",
            postcode: "",
            city: "",
            country: "",
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
        const newAddress = {
                dest: this.state.dest,
                addr_comp: this.state.addr_comp,
                addr_1: this.state.addr_1,
                addr_2: this.state.addr_2,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
        };
        this.props.addAddress({address: newAddress});
    };

    render() {
        const { errors } = this.state;

        return (
            <Container>
                <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Destinataire
                                </Form.Label>
                        <Form.Control
                            id="dest"
                            value={this.state.dest}
                            onChange={this.onChange}
                            error={errors.dest}
                            isInvalid={errors.dest}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dest}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Complément d'adresse (bâtiment, zone industrielle...)
                                </Form.Label>
                        <Form.Control
                            id="addr_comp"
                            value={this.state.addr_comp}
                            onChange={this.onChange}
                            error={errors.addr_comp}
                            isInvalid={errors.addr_comp}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.addr_comp}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Numéro et libellé de voie
                                </Form.Label>
                        <Form.Control
                            id="addr_1"
                            value={this.state.addr_1}
                            onChange={this.onChange}
                            error={errors.addr_1}
                            isInvalid={errors.addr_1}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.addr_1}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Lieu dit ou mention spéciale de distribution
                        </Form.Label>
                        <Form.Control
                            id="addr_2"
                            value={this.state.addr_2}
                            onChange={this.onChange}
                            error={errors.addr_2}
                            isInvalid={errors.addr_2}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.addr_2}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Code postal
                        </Form.Label>
                        <Form.Control
                            id="postcode"
                            value={this.state.postcode}
                            onChange={this.onChange}
                            error={errors.postcode}
                            isInvalid={errors.postcode}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.postcode}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Ville
                        </Form.Label>
                        <Form.Control
                            id="city"
                            value={this.state.city}
                            onChange={this.onChange}
                            error={errors.city}
                            isInvalid={errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Pays
                        </Form.Label>
                        <Form.Control
                            id="country"
                            value={this.state.country}
                            onChange={this.onChange}
                            error={errors.country}
                            isInvalid={errors.country}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit">Ajouter la nouvelle adresse</Button>
                </Form>
            </Container>
        )
    }
}

AddressForm.propTypes = {
    addAddress: PropTypes.func.isRequired,
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
    { addAddress }
)(AddressForm);



