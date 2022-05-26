// General
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Local
import {getSheets} from '../../../actions/sheetsActions';
import {clearErrors, clearSuccess} from '../../../actions/utilActions'
// Components
import {Alert, Card, CardColumns, Container, Form, Row} from 'react-bootstrap'
import {Link} from "react-router-dom"

class CardGrid extends Component {


    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    componentDidMount = () => {
        this.props.getSheets();
    }

    render() {
        const {sheets} = this.props.sheets;

        return (
            <div>
                <Container>
                    <Row className="flex-row-reverse" style={{padding: "10px"}}>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    id="search"
                                    type="text"
                                    placeholder="Rechercher..."
                                    onChange={this.onChange}
                                    value={this.state.search}/>
                            </Form.Group>
                        </Form>
                        <Alert style={{marginRight: 'auto'}} show={this.props.success.sheetEmailSent || false}
                               variant="success">
                            La fiche a bien été envoyée.
                        </Alert>
                    </Row>
                </Container>
                <CardColumns>
                    {sheets.map((sheet, _id) => {
                            if (sheet.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return (
                                    <Link key={_id} to={{
                                        pathname: '/send-sheet',
                                        state: {
                                            sheetId: sheet._id
                                        }
                                    }} style={{textDecoration: 'none', color: 'inherit'}}>
                                            <Card tag="a" style={{cursor: "pointer"}} className="sheetcard-wrapper">
                                                <Card.Body className={"sheetcard"}>
                                                    <Card.Title><h3>{sheet.name}</h3></Card.Title>
                                                    <Card.Text>
                                                        {sheet.definition}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                    </Link>
                                )
                            }
                        }
                    )}
                </CardColumns>
            </div>
        );
    }
}

CardGrid.propTypes = {
    getSheets: PropTypes.func.isRequired,
    clearSuccess: PropTypes.func.isRequired,
    sheets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        sheets: state.sheets,
        errors: state.errors,
        success: state.success
    }
}

export default connect(
    mapStateToProps,
    {getSheets, clearErrors, clearSuccess}
)(CardGrid);
