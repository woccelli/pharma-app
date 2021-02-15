// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Local
import { addSheet, updateSheet } from "../../actions/adminActions"
//import Sheet from "../layout/modules/Sheet"
import Sheet from '@bit/toposante.sheet.sheet'
import FormLayout from "../layout/modules/FormLayout"
import General from './sheetFormComponents/General'
import Sections from "./sheetFormComponents/Sections"
import Advices from "./sheetFormComponents/Advices"
// Components
import { Form, Button, Row, Col } from "react-bootstrap"
import { BlobProvider } from '@react-pdf/renderer'
import { Fab } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"


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
          new: false
        }
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
        new: true
      };
    }
  }


  renderPdf = () => {
    const  sheet  = this.state.renderedSheet
    const { source } = this.state
    const doc = (
      <Sheet name={sheet.name} address={source} advices={sheet.advices} sections={sheet.sections} />
    );
    return (
      <BlobProvider document={doc}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          return <embed src={url} type="application/pdf" width="100%" height="100%" />
        }}
      </BlobProvider>
    )
  }

  refreshPdfRender= () => {
    this.setState(prevState => ({
      renderedSheet: prevState.sheet
    }))
  }

  onSubmit = e => {
    e.preventDefault();
    const { sheet } = this.state;
    if(this.state.new) {
      this.props.addSheet(sheet, this.props.history)
    } else {
      this.props.updateSheet(sheet, this.props.history)
    }
  };

  handleSetState = getNewState => {
    const state = getNewState(this.state)
    this.setState(state)
  }

  render() {
    const { errors } = this.props;
    return (
      <FormLayout back="/admin/sheets">
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <General state={this.state} setState={this.handleSetState} />
              <Advices state={this.state} setState={this.handleSetState} />
              <Sections state={this.state} setState={this.handleSetState} />
              <Button type="submit" className="float-right">{this.state.new ? "Créer" : "Modifier"}</Button>
            </Form>

          </Col>
          <Col>
            {this.renderPdf()}
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