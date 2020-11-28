import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export class Sheet extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Document>
                <Page>
                    <Text>
                        {this.props.sheet.name}
                    </Text>
                </Page>
            </Document>
        )
    }
}

Sheet.propTypes = {
    sheet: PropTypes.object.isRequired
}

export default Sheet;
