import React, { Component } from "react";
import { connect } from "react-redux";

import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import img from '../../card-image.png'
import Sheet from './Sheet'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import PropTypes from "prop-types";
import { getSheets } from '../../actions/sheetsActions';

class CardGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedSheet: {}
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
  handleShow =  sheet  => {
    console.log(sheet)
    this.setState({
      selectedSheet:sheet
    });
    this.setShow(true)
  }
  render() {
    const { loadedsheets } = this.props.sheets;
    console.log(loadedsheets)
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedSheet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Sheet
              sheet={this.state.selectedSheet}
            />
          </Modal.Body>
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
          {loadedsheets.map((sheet, _id) => (
            <Card key={_id} tag="a" style={{ cursor: "pointer" }} onClick={() => this.handleShow(sheet)}>
              <Card.Img variant="top" src={img} />
              <Card.Body >
                <Card.Title>{sheet.name}</Card.Title>
                <Card.Text>
                  {sheet.definition}
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
