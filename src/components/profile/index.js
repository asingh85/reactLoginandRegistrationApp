import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Loader from '../loader';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      searchText: '',
    };
  }
  //user: "{"userId":1,"userName":"asingh85","firstName":"Amandeep","lastName":"Singh","gender":"Male","country":"CANADA","email":"amandeepsingh1@gmail.com"}"

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ searchText: value });
  };
  render() {
    const { user } = this.props; 
     console.log(this.props)
    return (
      <Fragment>
        {user && (<Container>
          <Row>
            <Col md={{ span: 4, offset: 8 }}>
              <Form inline >
                <Search className="search-text" />
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 search-header"
                  value={this.state.searchText}
                  onChange={this.handleChange}
                />
              </Form>
            </Col>
          </Row>
          <div style={{ textAlign: 'center' }}>Welcome to User Dashboard</div>
          <div>Hi!! My name is {user.firstName}&nbsp;{user.lastName}. How May I help you.</div>
        </Container>
        )}
      </Fragment>
    );
  }
}
