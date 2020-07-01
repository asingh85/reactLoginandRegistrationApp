import React, { Component } from 'react';
import Axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { BASE_URL } from '../../config';
import countryList from '../country-list/country-list.json';
export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      gender: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
      isPasswordMatchError: false,
      signupSuccess: false,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (userName, firstName, lastName, gender, country, email, password) => {
    try {
      console.log(this.state);
      this.setState({
        loader: true,
      });
      const resp = await Axios.post(`${BASE_URL}/users`, {
        userName,
        firstName,
        lastName,
        gender,
        country,
        email,
        password,
      });

      if (resp && resp.data) {
        this.setState({
          user: resp.data.users,
          loader: false,
          signupSuccess: true,
        });
      }
    } catch (error) {
      this.setState({
        loader: false,
        signupSuccess: false,
      });
    }
  };
  setSelectedData = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.isPasswordMatch()) {
      this.setState({ isPasswordMatchError: true });
      return;
    }

    const { userName, firstName, lastName, gender, country, email, password, confirmPassword } = this.state;
    if (!userName || !firstName || !lastName || !gender || !country || !email || !password || !confirmPassword) {
      return;
    } else {
      this.handleFormSubmit(userName, firstName, lastName, gender, country, email, password);
    }
  };

  isPasswordMatch = () => {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  };

  showAlert = () => {
    const { isPasswordMatchError } = this.state;
    if (isPasswordMatchError) {
      return (
        <Alert
          variant="danger"
          onClose={() => this.setState({ isPasswordMatchError: false })}
          dismissible
        >
          <Alert.Heading>Opps!</Alert.Heading>
          <p>Password Mismatch</p>
        </Alert>
      );
    }
  };
  selectCountry = () => {
    const { countries } = countryList;
    if (!countries) {
      return null;
    }
    let optionList = countries.map((item) => {
      return <option key={item.country.country_id}>{item.country.country_name}
      </option>
    })


    return (
      <select className="browser-default custom-select" value={this.state.statusOrPensionScheme} name="country" size={1} onChange={this.setSelectedData}>
        <option value="All">Please Select</option>
        {optionList}
      </select>
    );
  };
  onChangeValue = (event)=> {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const {
      userName,
      firstName,
      lastName,
      gender,
      country,
      email,
      password,
      confirmPassword,
      signupSuccess,
    } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {this.showAlert()}
            {signupSuccess ? (
              <h2>
                You have register successfully. Please{' '}
                <a href="/sign-in">click here</a> to Login
              </h2>
            ) : (
                <Form className="signup-form" onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>User Name: </Form.Label>
                    <Form.Control
                      type="text"
                      name="userName"
                      placeholder=" Please enter User Name"
                      onChange={this.handleChange}
                      value={userName}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Full Name: </Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control
                          type="text"
                          name="firstName"
                          onChange={this.handleChange}
                          value={firstName}
                          required
                          placeholder="First name" />
                      </Col>
                      <Col>
                        <Form.Control type="text"
                          name="lastName"
                          onChange={this.handleChange}
                          value={lastName}
                          required
                          placeholder="Last name" />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group>
                    <div onChange={this.onChangeValue}>
                      <input type="radio" value="Male" name="gender" /> Male
                      <input type="radio" value="Female" name="gender" /> Female
                    </div>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Select Country</Form.Label>
                    {this.selectCountry()}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Please Enter Email"
                      onChange={this.handleChange}
                      value={email}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Please Enter Password"
                      onChange={this.handleChange}
                      value={password}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Please Enter Confirm Password"
                      onChange={this.handleChange}
                      value={confirmPassword}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Sign UP
                </Button>
                </Form>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}
