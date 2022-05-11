import React, { Component } from 'react';
import './loginForm.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import axios from 'axios';

class LoginForm extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center main-row align-items-center">
          <Col className="d-flex justify-content-center" md={3}>
            <Container>
              <Row className="mb-3">
                <Col id="videoContainer">
                  <video autoPlay={true} id="videoElement"></video>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button size="lg" id="loginButton" onClick={this.postDataURLImage}>Login</Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }

  postDataURLImage () {
    let videoElement = document.querySelector("#videoElement");
    html2canvas(videoElement).then(function(canvas) {
      canvas.toBlob( blob => {
        let formData = new FormData();
        formData.append('face', blob, 'face.png');
        axios.post('http://dnzauc5014.nead.danet:3001/authenticate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function (response) {
          if (response.status === 200) {
            if (response.data.data === 'True') {
              window.alert('Login Successful');
            } else {
              window.alert('Login Failed');
            }
          }
        })
        .catch(error => {
            window.alert('Somehting went wrong, try to use a bigger monitor.');
        })
      })
    });
  }

  componentDidMount () {
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