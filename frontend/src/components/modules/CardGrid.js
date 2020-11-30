import React, { Component } from "react";
import { connect } from "react-redux";

import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import img from '../../card-image.png'
import Sheet from './Sheet'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Popover from 'react-bootstrap/Popover'
import PropTypes from "prop-types";
import { getSheets, sendSheet, setEmailSent, clearErrors } from '../../actions/sheetsActions';
import { BlobProvider } from '@react-pdf/renderer';

class CardGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedSheet: {},
      sendtoemail: "",
      emailsent: false,
      errors: {}
    };
  }

  componentDidMount = () => {
    this.props.getSheets();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nzxrProps", nextProps)
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  getSelectedSheet = () => {
    return <Sheet sheet={this.state.selectedSheet}></Sheet>
  }

  handleClose = () => {
    this.setState({
      selectedSheet: {},
      sendtoemail: "",
      emailsent: false,
      errors: {},
      show: false
    });
    this.props.setEmailSent({emailsent: false})
    this.props.clearErrors();
  }

  handleShow = sheet => {
    this.setState({
      selectedSheet: sheet,
      show: true
    });
  }

  handlePopup = () => {
    this.setState(prevState => ({
      popup: !prevState.popup
    }))
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const emailData = {
      name: this.state.selectedSheet.name,
      sendtoemail: this.state.sendtoemail
    };
    this.props.sendSheet(emailData, this.props.history)
  }

  render() {
    const { loadedsheets } = this.props.sheets;
    const { errors } = this.state;

    return (
      <div>
        <Modal enforceFocus={false} show={this.state.show} onHide={this.handleClose} contentClassName="modal-content">
          <BlobProvider document={this.getSelectedSheet()}>
            {({ blob, url, loading, error }) => {
              return <embed src={url} type="application/pdf" height={500} />
            }}
          </BlobProvider>

          <OverlayTrigger
            trigger="click"
            key="top"
            placement="top"
            overlay={
              <Popover id="popover-positioned-top">
                <Popover.Content>
                  <Form noValidate onSubmit={this.onSubmit}>
                    <Form.Group>
                      <Form.Label>Envoyer à l'adresse mail :</Form.Label>
                      <Form.Control
                        required
                        placeholder="exemple@mail.com"
                        onChange={this.onChange}
                        value={this.state.sendtoemail}
                        error={errors.sendtoemail}
                        id="sendtoemail"
                        type="email"
                        isInvalid={errors.sendtoemail}
                      />
                      <Form.Text className="text-muted">
                        Cet email n'est pas conservé
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.sendtoemail}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Alert show={this.props.sheets.emailsent} key="emailsuccess" variant="success">
                      La fiche a été envoyée.
                      </Alert>
                    <Form.Group className="float-right">
                      <Button
                        type="submit"
                        variant="success"
                        disabled={!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.sendtoemail)}
                      >
                        Envoyer
                      </Button>
                    </Form.Group>
                  </Form>
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="primary">Envoi de la fiche</Button>
          </OverlayTrigger>

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
  sendSheet: PropTypes.func.isRequired,
  setEmailSent: PropTypes.func.Required,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  sheets: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    sheets: state.sheets,
    errors: state.errors,
  }
}

export default connect(
  mapStateToProps,
  { getSheets, sendSheet, setEmailSent, clearErrors }
)(CardGrid);
