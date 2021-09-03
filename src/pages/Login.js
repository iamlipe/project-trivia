import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      valid: false,
    };
    this.validLogin = this.validLogin.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.requestToken = this.requestToken.bind(this);
  }

  async requestToken() {
    const returnedPromise = await
    fetch('https://opentdb.com/api_token.php?command=request');
    const returnedJson = await returnedPromise.json();
    localStorage.setItem('token', returnedJson.token);
    console.log(returnedJson);
  }

  handleForm({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validLogin();
  }

  validLogin() {
    const { email, name } = this.state;
    const REGEX_EMAIL = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const REGEX_NAME = 1;
    const isValidEmail = email.match(REGEX_EMAIL) !== null;
    const isValidPassword = name.length >= REGEX_NAME;
    if (isValidEmail === true && isValidPassword === true) {
      this.setState({
        valid: true,
      });
    }
  }

  render() {
    const { valid } = this.state;
    return (
      <div className="login-panel">
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleForm }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="name"
            type="password"
            data-testid="input-player-name"
            onChange={ this.handleForm }
          />
        </label>
        <Link to="/game">
          {valid ? <input
            type="Button"
            onClick={ this.requestToken }
            value="Jogar"
            data-testid="btn-play"
          />
            : <input type="Button" value="Jogar" data-testid="btn-play" disabled />}
        </Link>
        <Link to="/settings">
          <input type="Button" value="Configuracao" data-testid="btn-settings" />
        </Link>
      </div>
    );
  }
}

export default connect(null, null)(Login);
