import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { name, email } = this.props;
    const hash = MD5(email.toLowerCase().trim()).toString();
    const url = 'https://www.gravatar.com/avatar/';
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={ `${url}${hash}` }
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
