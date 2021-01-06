// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { updateEmail } from "../../actions/userActions";
import { clearErrors } from "../../actions/utilActions"
// Components
import { Jumbotron, Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowBackIos }  from '@material-ui/icons'


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
            <Container>
                 <ListGroup variant="flush">
                    <ListGroup.Item action as={Link} to="/account" >
                        <Row >
                            <Col xs="5"><ArrowBackIos/></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>    
                <Jumbotron>
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
                </Jumbotron>
            </Container>
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