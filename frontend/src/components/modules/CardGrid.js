import React, { Component } from "react";
import { connect } from "react-redux";

import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import img from '../../card-image.png'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import PropTypes from "prop-types";
import { getSheets } from '../../actions/sheetsActions';

class CardGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false  
    };
  }

  componentDidMount = () => {
    this.props.getSheets();
  }

  setShow(e) {
    this.setState({
      show: e
    });
  }

  handleClose = () => this.setShow(false)
  handleShow = () => this.setShow(true)

  render() {
    const { loadedsheets } = this.props.sheets;
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Fiche</Modal.Title>
          </Modal.Header>
          <Modal.Body><img src={img} alt='sheet-img' className="img-fluid" /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Imprimer
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Envoyer
            </Button>
          </Modal.Footer>
        </Modal>

        <CardColumns>
          {loadedsheets.map(({ _id, name, shortdescription }) => (
            <Card key={_id} tag="a" style={{ cursor: "pointer" }}>
              <Card.Img onClick={this.handleShow} variant="top" src={img} />
              <Card.Body >
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  {shortdescription}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
      </div>
    );
  }
}

CardGrid.propTypes = {
  getSheets: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  sheets: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    sheets: state.sheets,
    errors: state.errors
  }
}

export default connect(
  mapStateToProps,
  { getSheets }
)(CardGrid);
