// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Local
import { updateUser, deleteAddress } from "../../actions/userActions";
import { clearErrors, clearSuccess } from "../../actions/utilActions"
// Components
import { Container, CardColumns, Card, ListGroup, Row, Col, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"
import MaterialIcon from 'react-google-material-icons'
import { Icon, IconButton } from '@material-ui/core';
import { Delete, Edit, ArrowForwardIos, Add } from '@material-ui/icons'


class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.user.name,
            initialname: this.props.auth.user.name,
            email: this.props.auth.user.email,
            updateUser: false
        }
    }

    componentWillUnmount = () => {
        this.props.clearSuccess()
    }

    onDeleteAddress = address => {
        this.props.deleteAddress(address)
    }

    render() {
        const { addresses } = this.props.auth.user

        return (
            <Container fluid>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col><h4>Informations du compte</h4></Col>
                            <Col>{this.props.success.updatedUser && <Alert variant="success" className="float-right">Modification effectuée</Alert>}</Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item action as={Link} to="/account/name" >
                                <Row >
                                    <Col>Dénomination sociale</Col>
                                    <Col>{this.props.auth.user.name}</Col>
                                    <Col className="d-flex justify-content-end" xs="2"><ArrowForwardIos /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item action as={Link} to="/account/email">
                                <Row>
                                    <Col>Email</Col>
                                    <Col>{this.props.auth.user.email}</Col>
                                    <Col className="d-flex justify-content-end" xs="2"><ArrowForwardIos /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row >
                                    <Col>Adresses</Col>
                                    <Col className="d-flex justify-content-end"  xs="2"><Link to="/account/address" ><IconButton ><Add /></IconButton></Link></Col>
                                </Row>
                                <ListGroup variant="light">
                                    {addresses.map((address, _id) => {
                                        return (
                                            <ListGroup.Item key={_id} tag="a">
                                                <Row>
                                                    <Col>
                                                        <Row><b>{address.dest}</b></Row>
                                                        <Row>{address.addr_comp} {address.addr_2}</Row>
                                                        <Row>{address.addr_1}, {address.postcode} {address.city}, {address.country}</Row></Col>
                                                    <Col className="d-flex justify-content-end">
                                                        <IconButton>
                                                            <Edit />
                                                        </IconButton>

                                                        <IconButton onClick={() => this.onDeleteAddress(address)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    )}
                                </ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container >
        )
    }
}

Account.propTypes = {
    updateUser: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    success: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
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
    { updateUser, deleteAddress, clearErrors, clearSuccess }
)(Account);