// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Local
import { addSheet, updateSheet } from "../../actions/adminActions"
import Sheet from "../layout/modules/Sheet"
import FormLayout from "../layout/modules/FormLayout"

// Components
import { Form, Button, Row, Col } from "react-bootstrap"
import { BlobProvider } from '@react-pdf/renderer';

class SheetForm extends Component {

  constructor(props) {
    super(props);
    if (this.props.location.state) {
      const { sheetId } = this.props.location.state
      const sheet = this.props.sheets.sheets.find(({ _id }) => _id === sheetId)
      if (sheet) {
        this.state = {
          sheet: sheet,
          new: false
        }
      }
    } else {
      this.state = {
        sheet: {
          name: "",
          definition: "",
          synonyms: {},
          description: "",
          modules: [],
        },
        new: true
      };
    }
  }


  renderPdf = () => {
    const doc = (
      <Sheet sheet={this.state.sheet} />
    );
    return (
      <BlobProvider document={doc}>
        {({ blob, url, loading, error }) => {
          // Do whatever you need with blob here
          return <embed src={url} type="application/pdf" height={550} width={400} />
        }}
      </BlobProvider>
    )
  }

  onChange = e => {
    e.persist()
    this.setState(prevState => ({
      sheet: {
        ...prevState.sheet,
        [e.target.id]: e.target.value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { sheet } = this.state;
    if (this.state.new) {
      this.props.addSheet(sheet, this.props.history);
    } else {
      this.props.updateSheet(sheet, this.props.history);
    }
  };

  render() {
    const { errors } = this.props;

    return (
      <FormLayout back="/admin/sheets">
        <Row>
          <Col>
            <Form noValidate onSubmit={this.onSubmit} class="row align-items-center">
              <Form.Label> <h2>{this.state.new ? "Ajouter une nouvelle fiche" : "Modifier la fiche"}</h2> </Form.Label>
              <Form.Group>
                <Form.Label> Nom de la fiche </Form.Label>
                <Form.Control
                  required
                  onChange={this.onChange}
                  value={this.state.sheet.name}
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
                <Form.Label>Définition</Form.Label>
                <Form.Control
                  required
                  onChange={this.onChange}
                  value={this.state.sheet.definition}
                  error={errors.definition}
                  id="definition"
                  as="textarea"
                  rows={3}
                  isInvalid={errors.definition}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.definition}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  onChange={this.onChange}
                  value={this.state.sheet.description}
                  error={errors.description}
                  id="description"
                  type="text"
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Button className="float-right" type="submit">
                  {this.state.new ? "Ajouter" : "Modifier"}
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            {this.renderPdf()}
          </Col>
        </Row>
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