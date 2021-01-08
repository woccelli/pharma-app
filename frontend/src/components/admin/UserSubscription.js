// General
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
// Local
import { editUserSubscription } from '../../actions/adminActions'
// Components
import { Jumbotron, Form, Button, Row, Col, Container, ListGroup, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowBackIos } from '@material-ui/icons'

class UserSubscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subuntil: Date.now(),
            user: {}
        };
    }

    componentDidMount = () => {
        if (!this.props.location.state) {
            this.props.history.push("/admin/users")
        } else {
            const { user } = this.props.location.state
            if (user) {
                this.setState({
                    user: user,
                    subuntil: {}
                })
            }
        }


    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault()
        const subData = {
            subuntil: this.state.subuntil,
            userId: this.state.user._id
        }
        this.props.editUserSubscription(subData, this.props.history);
    }

    render() {

        const { errors } = this.props;

        return (
            <Container>
                <ListGroup variant="flush">
                    <ListGroup.Item action as={Link} to="/admin/users" >
                        <Row >
                            <Col xs="5"><ArrowBackIos /></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <Jumbotron>
                    <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
                        <Form.Label> <h2>Abonnement de l'utilisateur</h2> </Form.Label>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Abonné</th>
                                    <th>Date de fin d'abonnement</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.user.name}</td>
                                    <td>{this.state.user.email}</td>
                                    <td>{ (new Date(this.state.user.subuntil)) > Date.now() ? 'Oui' : 'Non'}</td>
                                    <td>{(new Date(this.state.user.subuntil)).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Form.Group>
                            <Form.Label> Nouvelle date de fin d'abonnement </Form.Label>
                            <Form.Control
                                required
                                onChange={this.onChange}
                                error={errors.subuntil}
                                id="subuntil"
                                type="date"
                                isInvalid={errors.subuntil}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.subuntil}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Button className="float-right" type="submit">
                                Modifier la date de fin d'abonnement
                </Button>
                        </Form.Group>

                    </Form>
                </Jumbotron>
            </Container>
        )
    }
}

UserSubscription.propTypes = {
    editUserSubscription: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    admin: state.admin
});

export default connect(
    mapStateToProps,
    { editUserSubscription }
)(withRouter(UserSubscription)); 