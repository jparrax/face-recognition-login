import React, { Component } from 'react';
import './loginForm.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

class LoginForm extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center main-row align-items-center">
          <Col className="d-flex justify-content-center" md={3}>
            <Container>
              <Row className="mb-1">
                <Col id="videoContainer">
                  <video autoplay="true" id="videoElement"></video>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button size="lg" id="loginButton">Login</Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  }
}

export default LoginForm;