import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";

export class Sheet extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div >
                <div className="page" id="name">Name: {this.props.sheet.name}</div>
                <div id="definition">Definition : {this.props.sheet.definition}</div>
                <div id="causes">
                    Causes :
                    <ul>
                        <li>Cause 1</li>
                        <li>Cause 2</li>
                        <li>Cause 3</li>
                    </ul>
                </div>
                <div id="conseils">
                    Conseils:
                    <ul>
                        <li>
                            <div id="conseil-1">
                                <div>Picto</div>
                                <div>title</div>
                                <div>content</div>
                            </div>
                        </li>
                        <li>
                            <div id="conseil-2">
                                <div>Picto</div>
                                <div>title</div>
                                <div>content</div>
                            </div>
                        </li>
                        <li>
                            <div id="conseil-3">
                                <div>Picto</div>
                                <div>title</div>
                                <div>content</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="modules">
                    Modules:
                    <ul>
                        <li>
                            <div id="module-1">
                                <div>Title</div>
                                <div>Content</div>
                            </div>
                        </li>
                        <li>
                            <div id="module-2">
                                <div>Title</div>
                                <div>Content</div>
                            </div>
                        </li>
                        <li>
                            <div id="module-3">
                                <div>Title</div>
                                <div>Content</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

Sheet.propTypes = {
    sheet: PropTypes.object.isRequired
}


export default connect(
    null
)(Sheet);