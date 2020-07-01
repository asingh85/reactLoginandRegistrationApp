import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Footer from './components/footer';
import Main from './components/main';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const apiUrl = 'http://localhost:5003';
axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const App = () => {
  let history = useHistory();
  return (
    <div className="app">
      <Main history={history} />
      <Footer />

    </div>
  );
};

export default App;
