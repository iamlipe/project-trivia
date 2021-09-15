import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { ActionEmail, FecthAPI } from '../actions';

import world from '../assets/image/world_1.png';
import warning from '../assets/image/warning.svg';
import trivia from '../assets/image/trivia.png';
import config from '../assets/image/config.svg';

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
    this.handleHash = this.handleHash.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
  }

  async requestToken() {
    const { getAPI, sendFormLogin } = this.props;
    const { email, name } = this.state;
    sendFormLogin(email, name);
    const state = {
      player: {
        name: document.getElementById('name').value,
        assertions: 0,
        score: 0,
        gravatarEmail: document.getElementById('email').value,
      },
      ranking: localStorage.getItem('state') !== null
        ? JSON.parse(localStorage.getItem('state')).ranking
        : [],
    };
    localStorage.setItem('state', JSON.stringify(state));
    this.handleHash();
    const returnedPromise = await
    fetch('https://opentdb.com/api_token.php?command=request');
    const returnedJson = await returnedPromise.json();
    localStorage.setItem('token', returnedJson.token);
    document.querySelector('audio').play();
    getAPI();
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
    const isValidName = name.length >= REGEX_NAME;
    if (isValidEmail === true && isValidName === true) {
      this.setState({
        valid: true,
      });
    }
  }

  handleHash() {
    const { email } = this.state;
    const encryptado = md5(email).toString();
    localStorage.setItem('hash', encryptado);
  }

  buttonDisabled() {
    return (
      <input
        className="disabled"
        type="Button"
        value="jogar"
        data-testid="btn-play"
        disabled
      />
    );
  }

  render() {
    const { valid, name } = this.state;
    return (
      <div className="container-login">
        <img className="world-login" src={ world } alt="world" />
        <img className="warning-login" src={ warning } alt="warning" />
        <img className="trivia-login" src={ trivia } alt="trivia" />
        <div className="form-login">
          <input
            placeholder="email"
            id="email"
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleForm }
          />
          <input
            placeholder="name"
            id="name"
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleForm }
          />
          <Link to={ { pathname: '/game', state: { name } } }>
            {valid ? <input
              className="enabled"
              type="Button"
              onClick={ this.requestToken }
              value="jogar"
              data-testid="btn-play"
            />
              : this.buttonDisabled() }
          </Link>
        </div>
        <Link className="config-login" to="/settings">
          <img src={ config } alt="config" />
          <input type="Button" defaultValue="Configuracão" data-testid="btn-settings" />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(FecthAPI()),
  sendFormLogin: (email, name) => dispatch(ActionEmail(email, name)),
});

Login.propTypes = {
  getAPI: PropTypes.func.isRequired,
  sendFormLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
