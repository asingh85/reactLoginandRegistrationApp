import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../../config';

export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ 
      [name]: value 
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      return;
    } else {
      this.props.handleSignIn(email, password);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form className="signup-form" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Email or Username: </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  className="email-class"
                  placeholder="Please Enter Email or Username"
                  onChange={this.handleChange}
                  value={email}
                  required
                  maxLength={100}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password-class"
                  placeholder="Please Enter Password"
                  onChange={this.handleChange}
                  value={password}
                  required
                />
              </Form.Group>
              <Form.Group>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign In
              </Button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
