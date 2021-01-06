// General
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Local
import { updateUser } from "../../actions/userActions";
import { clearErrors } from "../../actions/utilActions"
// Components
import { Jumbotron, Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowBackIos }  from '@material-ui/icons'


class NameForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.user.name
        }
    }

    onComponentDidMount = () => {
        this.props.clearErrors()
    }

    onSubmit = e => {
        e.preventDefault();
        const updatedUser = {
            name: this.state.name
        };
        this.props.updateUser(updatedUser, this.props.history)
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
                                    Dénomination sociale
                        </Form.Label>
                            </Col>
                            <Col >
                                <Form.Control
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                    isInvalid={errors.name}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
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

NameForm.propTypes = {
    updateUser: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { updateUser, clearErrors })(withRouter(NameForm))