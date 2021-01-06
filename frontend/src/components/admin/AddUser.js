// General
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
// Local
import { addUser } from '../../actions/adminActions'
// Components
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            email: this.state.email
        }
        this.props.addUser(newUser, this.props.history);
    }

    render() {

        const { errors } = this.props;

        return (
            <Container>
                <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
                    <Form.Label> <h2>Ajouter un utilisateur</h2> </Form.Label>
                    <Form.Group>
                        <Form.Label> Dénomination sociale </Form.Label>
                        <Form.Control
                            required
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            isInvalid={errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Adresse e-mail</Form.Label>
                        <Form.Control
                            required
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            isInvalid={errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Button className="float-right" type="submit">
                            Ajouter l'utilisateur
                </Button>
                    </Form.Group>

                </Form>
            </Container>
        )
    }
}

AddUser.propTypes = {
    addUser: PropTypes.func.isRequired,
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
    { addUser }
)(AddUser); 