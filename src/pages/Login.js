import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.handleSettingsButtons = this.handleSettingsButtons.bind(this);
  }

  async handleSubmitButton() {
    try {
      const response = await fetch(
        'https://opentdb.com/api_token.php?command=request',
      );
      const json = await response.json();
      if (!json.response_code) {
        localStorage.setItem('token', json.token);
        return;
      }
      this.handleSubmitButton();
    } catch (e) {
      console.log(e);
    }
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.inputValidation,
    );
  }

  inputValidation() {
    const { name, email } = this.state;
    this.setState({
      isDisabled: !(name && email),
    });
  }

  handleSettingsButtons() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <div>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsButtons }
          >
            Settings
          </button>
        </div>
        <form>
          <label htmlFor="input-name">
            Nome
            <input
              type="text"
              name="name"
              data-testid="input-player-name"
              id="input-name"
              onChange={ this.handleInputChange }
              value={ name }
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              id="input-email"
              onChange={ this.handleInputChange }
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleSubmitButton }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
