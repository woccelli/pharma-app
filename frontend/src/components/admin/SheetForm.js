// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Local
import { addSheet, updateSheet } from "../../actions/adminActions"
import { SheetPdf } from "../sheet/SheetPdf";
import FormLayout from "../layout/modules/FormLayout"
import General from './sheetFormComponents/General'
import Sections from "./sheetFormComponents/Sections"
import Advices from "./sheetFormComponents/Advices"
import Help from "./sheetFormComponents/Help"
// Components
import { Form, Button, Row, Col, Modal } from "react-bootstrap"
import { Fab } from "@material-ui/core"
import { Refresh, HelpOutline } from "@material-ui/icons"


class SheetForm extends Component {

  constructor(props) {
    super(props);
    if (this.props.location.state) {
      const { sheetId } = this.props.location.state
      const sheet = this.props.sheets.sheets.find(({ _id }) => _id === sheetId)
      if (sheet) {
        this.state = {
          sheet: sheet,
          renderedSheet: sheet,
          source: {
            dest: 'Parmacie du Moulot',
            addr_1: '13 rue de la Corvée',
            addr_2: '',
            postcode: '69100',
            city: 'Villeurbanne',
            country: 'France'
          },
          new: false,
          showHelp: false,
        }
      } else {
        this.props.history.push("/dashboard")
      }
    } else {
      const mockSheet = {
        name: "",
        definition: "",
        advices: [],
        sections: []
      }
      this.state = {
        sheet: mockSheet,
        renderedSheet: mockSheet,
        source: {
          dest: 'Parmacie du Moulot',
          addr_1: '13 rue de la Corvée',
          addr_2: '',
          postcode: '69100',
          city: 'Villeurbanne',
          country: 'France'
        },
        new: true,
        showHelp: false,
      };
    }
  }

  refreshPdfRender = () => {
    this.setState(prevState => ({
      renderedSheet: prevState.sheet
    }))
  }

  handleCloseHelp = () => {
    this.setState({
      showHelp: false
    })
  }

  handleShowHelp = () => {
    this.setState({
      showHelp: true
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const { sheet } = this.state;
    if (this.state.new) {
      this.props.addSheet(sheet, this.props.history)
    } else {
      this.props.updateSheet(sheet, this.props.history)
    }
  };

  handleSetState = getNewState => {
    const state = getNewState(this.state)
    this.setState({sheet: state.sheet})
  }

  render() {
    const { errors } = this.props;
    return (
      <FormLayout back="/admin/sheets">
        <Modal show={this.state.showHelp} onHide={this.handleCloseHelp}>
          <Modal.Header closeButton>
            <Modal.Title>Aide</Modal.Title>
          </Modal.Header>
          <Modal.Body><Help></Help></Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseHelp}>
              Fermer
          </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <Fab style={{
                left: "90%",
              }} size="small" variant="extended" onClick={this.handleShowHelp}>
                <HelpOutline />
                 
              </Fab>
              <General state={this.state} setState={this.handleSetState} />
              <Advices state={this.state} setState={this.handleSetState} />
              <Sections state={this.state} setState={this.handleSetState} />
              <Button type="submit" className="float-right">{this.state.new ? "Créer" : "Modifier"}</Button>
            </Form>

          </Col>
          <Col>
            <SheetPdf sheet={this.state.renderedSheet} source={this.state.source}></SheetPdf>
          </Col>
        </Row>

        <Fab style={{
          margin: 0,
          top: 'auto',
          right: "5%",
          bottom: 30,
          left: 'auto',
          position: 'fixed',
        }} size="small" variant="extended" onClick={this.refreshPdfRender}>
          <Refresh />
                 Rafraîchir le visuel
              </Fab>
      </FormLayout>
    );
  }
}

SheetForm.propTypes = {
  addSheet: PropTypes.func.isRequired,
  updateSheet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  sheets: state.sheets
});


export default connect(
  mapStateToProps,
  { addSheet, updateSheet }
)(withRouter(SheetForm));