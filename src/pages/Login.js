import React, { Component } from 'react';

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

  render() {
    const { name, email, isDisabled } = this.state;
    return (
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
        <button type="button" data-testid="btn-play" disabled={ isDisabled }>
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
