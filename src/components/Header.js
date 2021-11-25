import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
// import logo from '../trivia.png';

class Header extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { name, email, score } = this.props;
    const hash = MD5(email.toLowerCase().trim()).toString();
    const url = 'https://www.gravatar.com/avatar/';
    return (
      <header className="App-header">
        {/* <div>
          <img src={ logo } className="App-logo" alt="logo" />
        </div> */}
        <div>
          <img
            data-testid="header-profile-picture"
            alt="profile"
            src={ `${url}${hash}` }
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h4 data-testid="header-score">{ score }</h4>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
