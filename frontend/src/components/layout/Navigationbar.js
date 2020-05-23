import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar'

class Navigationbar extends Component {
  render() {
    return (
        <Navbar bg="dark">
            <Link to="/">
                <Navbar.Brand>Pharma-app</Navbar.Brand>
            </Link>
        </Navbar>
    );
  }
}
export default Navigationbar;