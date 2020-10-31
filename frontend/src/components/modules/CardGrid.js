import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import img from '../../card-image.png'

import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CardGrid extends Component {

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  setShow(e) {
    this.setState({
      show: e
    });
  }

  handleClose = () => this.setShow(false)
  handleShow = () => this.setShow(true)

  render() {

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Fiche</Modal.Title>
          </Modal.Header>
          <Modal.Body><img src={img} className="img-fluid" /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Imprimer
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Envoyer
            </Button>
          </Modal.Footer>
        </Modal>
        <CardColumns>
          <Card tag="a"  style={{ cursor: "pointer" }}>
            <Card.Img onClick={this.handleShow} variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body >
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
          content.{' '}
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          <NavLink to="/sheet" className="text-dark">
          <Card>
            <Card.Img variant="top" src={img}/>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
          </NavLink>
          </CardColumns>
        </div>
    );
  }
}
export default CardGrid;
