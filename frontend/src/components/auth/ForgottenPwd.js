// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { forgottenPwd } from "../../actions/authActions";
import { clearErrors } from "../../actions/utilActions"
// Components
import { Jumbotron, Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowBackIos }  from '@material-ui/icons'

class ForgottenPwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }

    componentDidMount = () => {
        this.props.clearErrors()
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const lostUser = {
            email: this.state.email
        }
        this.props.forgottenPwd(lostUser, this.props.history);
    };

    render() {
        const { errors } = this.props;

        return (
            <Container>
                <ListGroup variant="flush">
                    <ListGroup.Item action as={Link} to="/login" >
                        <Row >
                            <Col xs="5"><ArrowBackIos /></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <Jumbotron>
                    <Form noValidate onSubmit={this.onSubmit}>
                      <Form.Label>
                          <h4>Mot de passe oublié ?</h4>
                      </Form.Label>
                        <Form.Group>
                            <Form.Label>
                                Adresse mail associée à votre compte :
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
                </Jumbotron>
            </Container>
        )
    }
}

ForgottenPwd.propTypes = {
    forgottenPwd: PropTypes.func.isRequired,
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

export default connect(
    mapStateToProps,
    { forgottenPwd, clearErrors }
)(withRouter(ForgottenPwd));

