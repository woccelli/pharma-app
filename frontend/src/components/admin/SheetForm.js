// General
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Local
import { addSheet, updateSheet } from "../../actions/adminActions"
import Sheet from "../layout/modules/Sheet"
import FormLayout from "../layout/modules/FormLayout"
import Sections from "./sheetFormComponents/Sections";
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
          description: "",
          advices: [],
          sections: [{
            _id: "1",
            title: 'Causes',
            text: 'Duis ex et aute amet ad id veniam. Dolore sit duis et quis anim enim dolor duis officia exercitation exercitation. Non exercitation labore dolor elit officia proident et dolore. Nisi in excepteur esse ea cupidatat duis non sunt culpa minim anim occaecat incididunt non. Irure anim consequat ullamco minim est fugiat id.Eu anim ex eu ipsum sunt ipsum excepteur id magna ad. Sunt ad nisi adipisicing Lorem aliquip et ullamco est consectetur non voluptate eu. Aute occaecat fugiat cupidatat commodo esse quis nostrud proident.'
          },
          {
            _id: "2",
            title: 'Conseils traitement',
            text: 'Veniam consequat voluptate ea veniam aliquip aliquip nisi. Dolore tempor elit sint eiusmod dolore incididunt irure voluptate cupidatat non in. Nisi elit tempor laborum mollit dolore ullamco consequat culpa consectetur exercitation duis nisi velit. Occaecat labore aliquip eu laborum duis proident enim veniam Lorem.Fugiat pariatur laborum occaecat excepteur exercitation sit in dolor esse mollit sunt ea ipsum minim. Do elit nisi eu pariatur enim id cillum commodo consequat. Exercitation nostrud consectetur excepteur aliquip non laborum occaecat ullamco dolor quis minim enim.'
          },
          {
            _id:"3",
            title: 'Compléments alimentaires',
            text: 'Incididunt eu id reprehenderit id pariatur. Irure ullamco proident fugiat laboris sint minim exercitation nostrud laborum. Esse sunt pariatur ullamco cillum laboris ullamco sint occaecat voluptate occaecat qui consectetur est. Qui sunt quis deserunt in laboris. Cupidatat adipisicing est consequat est ex. Consectetur labore ullamco magna pariatur laboris amet consequat occaecat in sunt labore enim irure consectetur. Labore tempor sunt aute pariatur sint.Laboris in commodo cillum reprehenderit in exercitation proident ullamco voluptate cupidatat anim magna. Ex cillum laborum pariatur adipisicing culpa exercitation in aliqua dolor pariatur. Est aliqua dolore nulla ad veniam cupidatat fugiat. Reprehenderit aliquip et est veniam commodo voluptate ut aliqua excepteur eiusmod commodo excepteur. Non proident ad anim proident sint consectetur in commodo pariatur esse eiusmod sint. Elit tempor et magna ipsum consectetur sit aliquip.'
          },
          {
            _id: "4",
            title: 'Plantes',
            text: 'Id enim incididunt qui mollit sit aliquip reprehenderit. Magna aliquip consequat aute consectetur. Consequat id incididunt fugiat cillum excepteur magna dolore sint ea non dolor. Quis pariatur occaecat ea mollit pariatur.'
          },
          {
            _id: "5",
            title: 'Plantes',
            text: 'Id enim incididunt qui mollit sit aliquip reprehenderit. Magna aliquip consequat aute consectetur. Consequat id incididunt fugiat cillum excepteur magna dolore sint ea non dolor. Quis pariatur occaecat ea mollit pariatur.'
          },
          {
            _id: "6",
            title: 'Plantes',
            text: 'Id enim incididunt qui mollit sit aliquip reprehenderit. Magna aliquip consequat aute consectetur. Consequat id incididunt fugiat cillum excepteur magna dolore sint ea non dolor. Quis pariatur occaecat ea mollit pariatur.'
          }]
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

  onSectionsChange = (newSections) => {
    this.setState(prevState => ({
      sheet: {
        ...prevState.sheet,
        sections: newSections
      }
    }))
  }

  onSubmit = e => {
    e.preventDefault();
    const { sheet } = this.state;
    console.log(this.state)
    /*
    if (this.state.new) {
      this.props.addSheet(sheet, this.props.history);
    } else {
      this.props.updateSheet(sheet, this.props.history);
    }
    */
  };

  handleSetState = getNewState => {
    const  state = getNewState(this.state)
    console.log(state)
    this.setState(state)
    console.log("state", this.state)
  }

  render() {
    const { errors } = this.props;
    return (
      <FormLayout back="/admin/sheets">
        <Row>
          <Col>
          <Form>
            <Sections state={this.state} setState={this.handleSetState}/>
            <Button type="submit">Valider</Button>
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