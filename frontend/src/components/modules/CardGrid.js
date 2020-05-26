import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import img from '../../card-image.png'

import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

class CardGrid extends Component {
  

  render() {

    return (
      <CardColumns>
        <NavLink to="/sheet" class="text-dark">
        <Card tag="a"  style={{ cursor: "pointer" }}>
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
        <NavLink to="/sheet" class="text-dark">
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
    );
  }
}
export default CardGrid;
