// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { addAddress, updateAddress } from "../../actions/userActions";
// Components
import { Container, Jumbotron, ListGroup, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowBackIos } from '@material-ui/icons'



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
            new: true
        }
    }

    componentDidMount = () => {
        if (this.props.location.state) {
            const { address } = this.props.location.state
            if (address) {
                this.setState({
                    _id: address._id,
                    dest: address.dest,
                    addr_comp: address.addr_comp,
                    addr_1: address.addr_1,
                    addr_2: address.addr_2,
                    postcode: address.postcode,
                    city: address.city,
                    country: address.country,
                    new: false
                })
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
       
        if (this.state.new) {
            const newAddress = {
                dest: this.state.dest,
                addr_comp: this.state.addr_comp,
                addr_1: this.state.addr_1,
                addr_2: this.state.addr_2,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
            };
            this.props.addAddress({ address: newAddress }, this.props.history);
        } else {
            const updatedAddress = {
                _id: this.state._id,
                dest: this.state.dest,
                addr_comp: this.state.addr_comp,
                addr_1: this.state.addr_1,
                addr_2: this.state.addr_2,
                postcode: this.state.postcode,
                city: this.state.city,
                country: this.state.country
            }
            this.props.updateAddress({ address: updatedAddress}, this.props.history)
        }

    };

    render() {
        const { errors } = this.props;

        return (
            <Container>
                <ListGroup variant="flush">
                    <ListGroup.Item action as={Link} to="/account" >
                        <Row >
                            <Col xs="5"><ArrowBackIos /></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <Jumbotron>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Label> {this.state.new ? <h4>Ajouter une adresse</h4> : <h4>Modifier l'adresse</h4>} </Form.Label>
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.country}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className="float-right" type="submit">{this.state.new ? "Ajouter la nouvelle adresse" : "Modifier"}</Button>
                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

AddressForm.propTypes = {
    addAddress: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired,
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
    { addAddress, updateAddress }
)(withRouter(AddressForm));



