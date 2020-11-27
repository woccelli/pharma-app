import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export class Sheet extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const styles = StyleSheet.create({
           
        });

        const mySheet = () => (
            <Document>
                <Page>
                    // My document data
            </Page>
            </Document>
        );


        return (
            <mySheet />
        )
    }
}

Sheet.propTypes = {
    sheet: PropTypes.object.isRequired
}

export default Sheet;
