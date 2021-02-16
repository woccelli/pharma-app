// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Local
import { sendSheet } from "../../actions/sheetsActions"
//import Sheet from "./modules/Sheet"
import Sheet from '@bit/toposante.sheet.sheet'
// Components
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { BlobProvider, pdf } from '@react-pdf/renderer';
import FormLayout from "./modules/FormLayout"

class SendSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sheet: {},
            sendtoemail: ""
        }
        if (this.props.location.state) {
            const { sheetId } = this.props.location.state
            const sheet = this.props.sheets.sheets.find(({ _id }) => _id === sheetId)
            if (sheet) {
                this.state = {
                    sheet: sheet,
                    sendtoemail: ""
                }
            }
        } else {
            this.props.history.push("/dashboard")
        }
    }

    componentDidMount = () => {
        if((new Date(this.props.auth.user.subuntil)) < Date.now()) {
            alert("Vous devez être abonné.e pour accéder à ce contenu")
            this.props.history.push("/dashboard")
        }
    }


    renderPdf = () => {
        const { sheet }  = this.state
        const source = this.getSource()
        const doc = (
            <Sheet name={sheet.name} address={source} advices={sheet.advices} sections={sheet.sections} />
          )
        return (
            <BlobProvider document={doc}>
                {({ blob, url, loading, error }) => {
                    // Do whatever you need with blob here
                    return <embed src={url} type="application/pdf" height={550} width={400} title={this.state.sheet.name}/>
                }}
            </BlobProvider>
        )
    }

    getSource = () => {
        const { addresses } = this.props.auth.user
        const headerAddress = addresses.find(item => item.isHeader === true)
        if(headerAddress) {
            return headerAddress
        } else {
            return {
                dest: this.props.auth.user.name,
                addr_1: "",
                addr_2: "",
                postcode: "",
                city :""
            }
        }
        
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        pdf(this.getSheetComponent()).toBlob().then(sheetblob => {
            var reader = new FileReader();
            reader.readAsDataURL(sheetblob);
            reader.onloadend = () => {
                var base64data = reader.result;
                const emailData = {
                    pdf64: base64data,
                    name: this.state.sheet.name,
                    sendtoemail: this.state.sendtoemail
                }
                this.props.sendSheet(emailData, this.props.history)
            }
        })
            .catch(
                (error) => {
                    console.log(error);
                }
            );
    };

    render() {
        const { errors } = this.props;

        return (
            <FormLayout back="/dashboard">
                    <Row>
                        <Col>
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
                                <Form.Group className="float-right">
                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.sendtoemail)}
                                    >
                                        {this.props.success.loading ? <Spinner animation="border" role="status" /> : 'Envoyer'}
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

SendSheet.propTypes = {
    sendSheet: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    sheets: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    sheets: state.sheets,
    success: state.success
});


export default connect(
    mapStateToProps,
    { sendSheet }
)(withRouter(SendSheet));